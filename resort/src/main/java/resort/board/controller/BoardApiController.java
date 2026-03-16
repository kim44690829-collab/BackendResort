package resort.board.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import resort.board.dto.BoardDTO;
import resort.board.service.BoardService;
import resort.handler.PageHandler;
import resort.member.dto.MemberDTO;

@RestController
@RequestMapping("/api")
public class BoardApiController {
	@Autowired
	BoardService boardservice;

	// 게시글 작성 
	@PostMapping("/board/write")
	public boolean boardWrite(HttpServletRequest request,
			BoardDTO bdto,
			@RequestParam(value="upload", required=false) MultipartFile upload,
			HttpSession session
			) throws IllegalStateException, IOException {
		System.out.println("BoardApiController boardWrite() 메소드호출");
		
		MemberDTO loginedMember = (MemberDTO)session.getAttribute("loginUser");
		
		System.out.println(loginedMember);
			
		//1. 파일을 저장할 실제 하드디스크 위치를 지정한다.
		//WebConfig에서 설정한 "file:///c:/upload/' 이 경로와 반드시 일치하여야 한다.
		String rootPath = System.getProperty("user.dir");
        String savePath = rootPath + File.separator + "uploads" + File.separator + "img" + File.separator + "boardImg" + File.separator;

		//2. 안전장치 : 만약 c:/upload/ 폴더가 존재하지않으면,
		//프로그램을 통해 자동으로 생성되도록 작성한다.
		File saveDir = new File(savePath);
		if(!saveDir.exists()) {
			saveDir.mkdirs(); //mkdirs() 메소드는 폴더가 없어도 한꺼번에 만들어주는 메소드이다.
		}
		//3. 첫번째 이미지 업로드 처리
		//예외처리: 이미지가 비어있으면 추가되면 안됨		
		if(upload != null && !upload.isEmpty()) { //사용자가 실제 파일을 선택해서 보냈는지 확인
			//사용자가 올린 원래 파일명(예: 20.jpg)을 가져온다.
			String originalName = upload.getOriginalFilename();
			String saveName = UUID.randomUUID().toString().subSequence(0, 6) + "_" + originalName;//파일명에 랜덤 문자 섞고 싶으면 pdf 16강 - 13페이지(random.UUID) 추가하면됨.
			
			// c:/upload/20.jpg
			File file = new File(savePath + saveName);
			
			
			System.out.println("저장경로확인 : " + file.getAbsolutePath());
			//transferTo() : 이 명령어가 실행된 순간 서버 메모리에서 존재하던 파일이 실제 하드디스크
			//               c:/upload로 복사된다.
			upload.transferTo(file); // add throw~ 클릭하여 윗부분에 추가
			
			//DB에 저장할 파일명 DTO에 세팅
			bdto.setB_upload(saveName);
		}		
		//DB저장결과
		boolean result = boardservice.insertBoard(bdto,loginedMember);
		
		return result;	 			
	}
	
	// DB에서 전체 게시글 목록 select로 검색하여 추출
	@GetMapping("/board/list")
	public Map<String,Object> boardList(
			@RequestParam(value="searchType",required=false) String searchType,
			@RequestParam(value="searchKeyword",required=false) String searchKeyword,
			//1. 페이지 번호 => 1부터 시작이므로 초기값 1로 정의한다.
			@RequestParam(value="page",defaultValue = "1") int page,
			//2. 페이지 사이즈 => 한 화면에 보여지는 게시글의 개수를 5로 초기화한다.
			@RequestParam(value="pageSize",defaultValue = "5") int pageSize,
			//나의 문의글 조회용으로 추가
			@RequestParam(value="my",required=false) Boolean my,
	        HttpSession session
			) {
		System.out.println("BoardApiController boardList() 메소드호출");
		
		MemberDTO loginedMember = (MemberDTO)session.getAttribute("loginUser");
		Integer m_code = null;

		if(Boolean.TRUE.equals(my)) {
		    if(loginedMember == null) {
		        throw new RuntimeException("로그인이 필요합니다.");
		    }
		    m_code = loginedMember.getM_code();
		}
		
		//3. 전체 게시글의 개수인 totalCnt 메소드 가져오기
		int totalCnt;
		List<BoardDTO> listboard;

		PageHandler ph;

		if(Boolean.TRUE.equals(my)) {

		    totalCnt = boardservice.getMyBoardCount(m_code, searchType, searchKeyword);
		    ph = new PageHandler(totalCnt,page,pageSize);

		    listboard = boardservice.getMyBoardPageList(
		            m_code,
		            searchType,
		            searchKeyword,
		            ph.getStartRow(),
		            pageSize
		    );

		}else{

		    if(searchType != null && searchKeyword != null && !searchKeyword.trim().isEmpty()) {
		        totalCnt = boardservice.getSearchCount(searchType, searchKeyword);
		    }else {
		        totalCnt = boardservice.getAllcount();
		    }

		    ph = new PageHandler(totalCnt,page,pageSize);

		    if(searchType != null && searchKeyword != null && !searchKeyword.trim().isEmpty()) {
		        listboard = boardservice.getSearchPageList(
		                searchType, searchKeyword, ph.getStartRow(), pageSize);
		    }else {
		        listboard = boardservice.getPagelist(ph.getStartRow(),pageSize);
		    }
		}

		Map<String, Object> result = new HashMap<>();
		
		result.put("boardList", listboard);
	    result.put("ph", ph);

		result.put("searchType", searchType);
	    result.put("searchKeyword", searchKeyword);
		
	    return result;
	}
	
	// 하나의 게시글 상세정보 확인 핸들러
	//num 글번호 받아 -> 해당 게시글 DB에서 조회하고, 그 상세정보를 
	//boardInfo 전달하는 컨트롤러
	@GetMapping("/board/boardInfo")
	public BoardDTO boardInfo(BoardDTO bdto,HttpSession session) {
		System.out.println("BoardApiController boardInfo() 메소드호출");
		
		MemberDTO loginedMember = (MemberDTO)session.getAttribute("loginUser");	
			
		BoardDTO result = boardservice.getOneBoard(bdto,loginedMember);

		return result;		
	}	
	
	// 게시글의 수정
	@PutMapping("/board/update")
	public boolean boardUpdate(HttpServletRequest request,
			BoardDTO bdto,
	        @RequestParam(value="upload", required=false) MultipartFile upload,
	        HttpSession session
	        ) throws IllegalStateException, IOException {

	    System.out.println("BoardApiController boardUpdate() 메소드호출");    

	    String rootPath = System.getProperty("user.dir");
        String savePath = rootPath + File.separator + "uploads" + File.separator + "img" + File.separator + "boardImg" + File.separator;


	    File saveDir = new File(savePath);
	    if(!saveDir.exists()) {
	        saveDir.mkdirs(); 
	    }

	    MemberDTO loginedMember = (MemberDTO)session.getAttribute("loginUser");
	    if(loginedMember == null) return false;

	    boolean isAdmin = "admin@resort.com".equals(loginedMember.getM_email());

	    BoardDTO original;

	    if(isAdmin) {
	        // 관리자는 m_code 조건 없이 조회
	        original = boardservice.getBoardByBcode(bdto);
	    } else {
	        // 일반회원은 본인글만 조회
	        bdto.setM_code(loginedMember.getM_code());
	        original = boardservice.getOneBoard(bdto, loginedMember);
	    }

	    if(original == null) {
	        System.out.println("수정실패");
	        return false;
	    }

	    //  일반회원만 비밀번호 체크
	    if(!isAdmin) {
	        if(!original.getB_pw().equals(bdto.getB_pw())) {
	            System.out.println("비밀번호가 맞지 않습니다");
	            return false;
	        }
	    }

	    String oldFileName = original.getB_upload();

	    // 새 파일 선택한 경우
	    if(upload != null && !upload.isEmpty()) {

	        if(oldFileName != null) {
	            File oldFile = new File(savePath + oldFileName);
	            if(oldFile.exists()) {
	                oldFile.delete();
	            }
	        }

	        String originalName = upload.getOriginalFilename();
	        String saveName = UUID.randomUUID().toString().substring(0, 6) + "_" + originalName;

	        File newFile  = new File(savePath + saveName);
	        upload.transferTo(newFile);

	        bdto.setB_upload(saveName);

	    } else {
	        bdto.setB_upload(oldFileName);
	    }

	    // 관리자는 m_code 조건 없이 수정
	    if(isAdmin) {
	        return boardservice.adminUpdateBoard(bdto);
	    } else {
	        bdto.setM_code(loginedMember.getM_code());
	        return boardservice.updateBoard(bdto,loginedMember);
	    }
	}

	// 하나의 게시글을 삭제하는 컨트롤러
	@DeleteMapping("/board/delete")
	public int boardDelete(BoardDTO bdto, HttpSession session) {

	    MemberDTO loginedMember = (MemberDTO)session.getAttribute("loginUser");

	    if(loginedMember == null) {
	        return 0;
	    }

	    // 로그인 회원코드 세팅
	    bdto.setM_code(loginedMember.getM_code());

	    int isSuccess = boardservice.deleteBoard(bdto);

	    return isSuccess;
	}

	
	
	// 관리자 페이지 에서 사용하는 리스트 
	@GetMapping("/board/adminlist")
	public Map<String,Object> boardAdminList(
			@RequestParam(value="searchType",required=false) String searchType,
			@RequestParam(value="searchKeyword",required=false) String searchKeyword,
			//1. 페이지 번호 => 1부터 시작이므로 초기값 1로 정의한다.
			@RequestParam(value="page",defaultValue = "1") int page,
			//2. 페이지 사이즈 => 한 화면에 보여지는 게시글의 개수를 5로 초기화한다.
			@RequestParam(value="pageSize",defaultValue = "10") int pageSize
			) {
		System.out.println("BoardApiController boardAdminList() 메소드호출");
		
		//3. 전체 게시글의 개수인 totalCnt 메소드 가져오기
		int totalCnt;
		
		if(searchType != null && searchKeyword != null && !searchKeyword.trim().isEmpty()) {
			//검색을 성공한 경우 검색한 결과에 해당되는 개수 반환
			totalCnt = boardservice.getSearchCount(searchType, searchKeyword);
		}else {
			//검색을 하지 않은 경우 전체 게시글의 개수 반환
			totalCnt = boardservice.getAllcount();
		}
		
		//4. PageHandler 클래스 접근하기위해 인스턴스화 한다.	
		PageHandler ph = new PageHandler(totalCnt,page,pageSize);
		
		List<BoardDTO> listboard;
		
		//검색 종료 후 => 검색내용이 list나오기
		if(searchType != null && searchKeyword != null && !searchKeyword.trim().isEmpty()) {
			//서비스에서 searchBoard() 메소드호출
			//검색이 성공했을때 검색된 리스트를 반환하는 메소드
			listboard = boardservice.getAdminSearchPageList
					(searchType, searchKeyword, ph.getStartRow(), pageSize);
		}else {
			//검색하지 않고 전체보기 list나오기
			//boardservice.allBoard() => 사용못하는 이유는?
			//=>페이징이 안된 모든 레코드가 출력되는 메소드이므로
			
			//검색하지 않은 게시글 전체에 대한 리스트
			listboard = boardservice.getAdminPagelist(ph.getStartRow(),pageSize);			
		}

		Map<String, Object> result = new HashMap<>();
		
		result.put("list", listboard);
	    result.put("ph", ph);
		result.put("searchType", searchType);
	    result.put("searchKeyword", searchKeyword);
		
	    return result;
	}
	
	//답글 작성을 처리하는 컨트롤러
	@PostMapping("/board/reply")
	public boolean reWrite(
			HttpServletRequest request,
			BoardDTO bdto,
			@RequestParam(value="upload", required=false) MultipartFile upload,
			HttpSession session
			) throws IllegalStateException, IOException {
		System.out.println("BoardApiController reWrite()호출");		
		
		MemberDTO loginedMember = (MemberDTO)session.getAttribute("loginUser");
		
		//회원코드 저장
		bdto.setM_code(loginedMember.getM_code());
		
		String rootPath = System.getProperty("user.dir"); 
        String savePath = rootPath + File.separator + "uploads" + File.separator + "img" + File.separator + "boardImg" + File.separator;
	
		File saveDir = new File(savePath);
		
		if(!saveDir.exists()) {
			saveDir.mkdirs(); //mkdirs() 메소드는 폴더가 없어도 한꺼번에 만들어주는 메소드이다.
		}
		
		if(upload != null && !upload.isEmpty()) { 
			String originalName = upload.getOriginalFilename();
			String saveName = UUID.randomUUID().toString().subSequence(0, 6) + "_" + originalName;
	
			File file = new File(savePath + saveName);
			
			upload.transferTo(file);
			
			//DB에 저장할 파일명 DTO에 세팅
			bdto.setB_upload(saveName);
		}		
		boolean isSuccess = boardservice.replyProcess(bdto);
		
		return isSuccess;	 
	}
	
}
