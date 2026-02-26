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
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

	// 1. 게시글 작성 
	@PostMapping("/board/write")
	public boolean boardWrite(BoardDTO bdto,
			@RequestParam(value="upload", required=false) MultipartFile upload,
			HttpSession session
			) throws IllegalStateException, IOException {
		System.out.println("BoardApiController boardWrite() 메소드호출");
		
		MemberDTO loginedMember = (MemberDTO)session.getAttribute("loginUser");
		
		System.out.println(loginedMember);
			
		//1. 파일을 저장할 실제 하드디스크 위치를 지정한다.
		//WebConfig에서 설정한 "file:///c:/upload/' 이 경로와 반드시 일치하여야 한다.
		String savePath = "c:/resort2026/resort/frontend/public/boardImg";
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
			File file = new File(savePath + "/" + saveName);
			
			
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
	
	//3. DB에서 전체 게시글 목록 select로 검색하여 추출
	@GetMapping("/board/list")
	public Map<String,Object> boardList(
			@RequestParam(value="searchType",required=false) String searchType,
			@RequestParam(value="searchKeyword",required=false) String searchKeyword,
			//1. 페이지 번호 => 1부터 시작이므로 초기값 1로 정의한다.
			@RequestParam(value="page",defaultValue = "1") int page,
			//2. 페이지 사이즈 => 한 화면에 보여지는 게시글의 개수를 5로 초기화한다.
			@RequestParam(value="pageSize",defaultValue = "5") int pageSize
			) {
		System.out.println("BoardApiController boardList() 메소드호출");
		
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
			listboard = boardservice.getSearchPageList
					(searchType, searchKeyword, ph.getStartRow(), pageSize);
		}else {
			//검색하지 않고 전체보기 list나오기
			//boardservice.allBoard() => 사용못하는 이유는?
			//=>페이징이 안된 모든 레코드가 출력되는 메소드이므로
			
			//검색하지 않은 게시글 전체에 대한 리스트
			listboard = boardservice.getPagelist(ph.getStartRow(),pageSize);			
		}

		Map<String, Object> result = new HashMap<>();
		
		result.put("boardList", listboard);
	    result.put("ph", ph);

		result.put("searchType", searchType);
	    result.put("searchKeyword", searchKeyword);
		
	    return result;
	}
	
	
	//4. 하나의 게시글 상세정보 확인 핸들러
	//num 글번호 받아 -> 해당 게시글 DB에서 조회하고, 그 상세정보를 
	//boardInfo 전달하는 컨트롤러
	@GetMapping("/board/boardInfo")
	public BoardDTO boardInfo(BoardDTO bdto,HttpSession session) {
		System.out.println("BoardApiController boardInfo() 메소드호출");
		
		MemberDTO loginedMember = (MemberDTO)session.getAttribute("loginUser");
		
		System.out.println(loginedMember);
		
		BoardDTO result = boardservice.getOneBoard(bdto,loginedMember);

		return result;		
	}	
	
	//5. 게시글의 수정
	@PutMapping("/board/update")
	public boolean boardUpdate(BoardDTO bdto,
			@RequestParam(value="upload", required=false) MultipartFile upload,
			HttpSession session
			)throws IllegalStateException, IOException {
		System.out.println("BoardApiController boardUpdate() 메소드호출");	
		
		String savePath = "c:/resort2026/resort/frontend/public/boardImg";

		File saveDir = new File(savePath);
		if(!saveDir.exists()) {
			saveDir.mkdirs(); 
		}
		
		MemberDTO loginedMember = (MemberDTO)session.getAttribute("loginUser");
		if(loginedMember == null) return false;
		
		// bdto에 m_code 세팅
	    bdto.setM_code(loginedMember.getM_code());

	    // 기존 게시글 조회 (b_code + m_code)
	    BoardDTO original = boardservice.getOneBoard(bdto,loginedMember);
		
	    if(original == null) {
	    	// 본인 글 아니거나 존재 안함
	    	System.out.println("수정실패");
	        return false;
	    }
	    
	    // 비밀번호 체크
	    if(!original.getB_pw().equals(bdto.getB_pw())) {
	    	System.out.println("비밀번호가 맞지 않습니다");
	        return false;
	    }
	    
	    // 기존 파일명 가져오기
	    String oldFileName = original.getB_upload();
	    
	    // 새 파일이 선택된 경우
		if(upload != null && !upload.isEmpty()) { 
			// 기존 파일 삭제
	        if(oldFileName != null) {
	            File oldFile = new File(savePath + "/" + oldFileName);
	            if(oldFile.exists()) {
	                oldFile.delete();
	            }
	        }
			
	        // 새 파일 저장
			String originalName = upload.getOriginalFilename();
			String saveName = UUID.randomUUID().toString().subSequence(0, 6) + "_" + originalName;//파일명에 랜덤 문자 섞고 싶으면 pdf 16강 - 13페이지(random.UUID) 추가하면됨.
			
			File newFile  = new File(savePath + "/" + saveName);
			
			upload.transferTo(newFile ); 			
			//DB에 저장할 파일명 DTO에 세팅
			bdto.setB_upload(saveName);
		}else {
			// 새 파일 선택 안 했으면 기존 파일 유지
	        bdto.setB_upload(oldFileName);
		}	
		
		boolean isSuccess = boardservice.updateBoard(bdto);
		
		return isSuccess;
	}
	
	// 하나의 게시글을 삭제하는 컨트롤러
	@DeleteMapping("/board/delete")
	public boolean boardDelete(BoardDTO bdto) {
		System.out.println("BoardApiController boardDelete() 메소드호출");

		// boardService removeBoard()메소드 삭제: true, 실패:false
		boolean isSuccess = boardservice.deleteBoard(bdto);
		
		return isSuccess;
	}
	
	//로그인된 나의 게시글 목록을 검색하는 핸들러
//	@GetMapping("/board/mypage")
//	public String myBoardList(Model model,HttpSession session,
//			@RequestParam(value="page",defaultValue = "1") int page) {
//		
//		//세션 키 이름을 loginmember로 가져오기
//		//세션 키 값 가져오는 메소드 : getAttribute("loginmember")
//		//id = "kkk" 해당하는 행전체를 가져오려면 MemberDTO 필요
//		//MemberDTO로 다운캐스팅 한다.
//		
//		//현재 loginId => MemberDTO의 멤버변수 모두 저장됨을 주의하자
//		MemberDTO loginId = (MemberDTO)session.getAttribute("loginmember");
//		
//		//로그인 실패또는 로그인이 안된 상태이면 => member/login로 이동
//		if(loginId == null) {
//			System.out.println("로그인 정보가 없으니 로그인 페이지로 이동합니다.");
//			return "redirect:/member/login";
//		}
//		
//		int pageSize = 5;
//		// 로그인된 내 게시글의 개수 조회
//		int totalCnt = boardservice.getMyBoardCount(loginId.getId());
//		
//		//pageHandler 클래스 인스턴스화 한다.
//		PageHandler ph = new PageHandler(totalCnt, page, pageSize);
//		
//		//로그인된 내 게시글의 목록을 가져오기
//		List<BoardDTO> mylist = boardservice.getMyBoardList
//				(loginId.getId(), ph.getStartRow(), pageSize);
//		
//		model.addAttribute("list", mylist);
//		model.addAttribute("ph", ph);
//		
//
//		return "/board/mypage";
//	}
}
