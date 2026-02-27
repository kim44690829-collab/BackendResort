package resort.board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;
import resort.board.dto.BoardDTO;
import resort.board.mapper.BoardMapper;
import resort.member.dto.MemberDTO;
import resort.member.service.MemberService;

@Service
public class BoardServiceImpl implements BoardService {

	@Autowired
	private BoardMapper boardmapper;
	
	@Autowired
	MemberService memberservice;

	//하나의 게시글이 추가되는 메소드
	@Override
	public boolean insertBoard(BoardDTO bdto, MemberDTO loginedMember) {
		System.out.println("BoardServiceImpl insertBoard() 메소드호출");
		
		if(loginedMember == null) {
			System.out.println("로그인 해주세요");
			return false;
		}		

		//회원코드 저장
		bdto.setM_code(loginedMember.getM_code());		
		
		System.out.println("글 작성 성공");
		boardmapper.insertBoard(bdto);
		return true;
		
	}

	//게시글 전체 목록을 출력하는 메소드
	@Override
	public List<BoardDTO> getAllBoard() {
		System.out.println("BoardServiceImpl insertBoard() 메소드호출");
		return boardmapper.getAllBoard();
	}
	
	//나의 게시글 목록을 출력하는 메소드
	@Override
	public List<BoardDTO> getMyBoard(int m_code) {
		System.out.println("BoardServiceImpl getMyBoard() 메소드호출");
		return boardmapper.getMyBoard(m_code);
	}

	//하나의 게시글을 출력하는 메소드
	@Override
	public BoardDTO getOneBoard(BoardDTO bdto, MemberDTO loginedMember) {
		System.out.println("BoardServiceImpl getOneBoard() 메소드호출");
		
		if(loginedMember == null) {
			System.out.println("로그인 해주세요");
			return null;
		}
		
		BoardDTO board = boardmapper.getOneBoard(bdto);

		if(board == null) {
			System.out.println("게시글 없음");
		    return null;
		}
		
		//게시판 멤버조회
		MemberDTO boardMem = memberservice.getOneMember(board.getM_code());
		//로그인 멤버조회
		MemberDTO loginMem = memberservice.getOneMember(loginedMember.getM_code());
		
		boolean isWriter = boardMem.getM_email().equals(loginMem.getM_email());
	    boolean isAdmin = loginMem.getM_email().equals("admin@resort.com");

	    // 관리자 댓글 존재 여부 체크(갯수)
	    int adminReplyCount = boardmapper.existsAdminReply(board.getRef());
	    boolean hasAdminReply = adminReplyCount > 0;
		
		//게시판 작성회원 아이디와 세션에 로그인된 회원 아이디를 비교해서 다르거나,
		//회원아이디가 관리자가 아니거나
	    //관리자가 단 댓글이 존재하지 않는다면 조회불가능(존재시에는 조회가능)
	    if(!isWriter && !isAdmin && !hasAdminReply) {
			System.out.println("작성자만 조회 가능");
			return null;
		}		
		
		System.out.println("게시글 출력 성공");
		// 조회수 증가 메소드 추가
		boardmapper.upReadCount(bdto);
		//조회수 증가 + 하나게시글 검색
		return boardmapper.getOneBoard(bdto);
		
	}

	//하나의 게시글을 수정하는 메소드
	@Override
	public boolean updateBoard(BoardDTO bdto) {
		System.out.println("BoardServiceImpl updateBoard() 메소드호출");
		
		int result = boardmapper.updateBoard(bdto);
		
		if(result > 0) {
			System.out.println("게시글 수정 성공");
			return true; //수정이 된 경우
		}else {
			System.out.println("게시글 수정 실패(비밀번호 불일치)");
			return false;
		}
	}

	//게시글 하나를 삭제하는 메소드
	@Override
	public boolean deleteBoard(BoardDTO bdto) {
		System.out.println("BoardServiceImpl deleteBoard() 메소드호출");
		int result = boardmapper.deleteBoard(bdto);
		
		if(result > 0) {
			System.out.println("게시글 삭제 성공");
			return true;
		}else {
			System.out.println("게시글 삭제 실패(비밀번호 불일치)");
			return false;
		}
	}

	//전체 게시글수 검색하는 메소드
	@Override
	public int getAllcount() {
		System.out.println("BoardServiceImpl getAllcount() 메소드호출");
		return boardmapper.getAllcount();
	}
//
//	//startRow ~ pageSize까지의 행 출력
	@Override
	public List<BoardDTO> getPagelist(int startRow, int pageSize) {
		System.out.println("BoardServiceImpl getPagelist() 메소드호출");
		return boardmapper.getPagelist(startRow, pageSize); 
	}

	//검색 페이징에 필요한 메소드
	@Override
	public int getSearchCount(String searchType, String searchKeyword) {
		System.out.println("BoardServiceImpl getSearchCount() 메소드호출");
		return boardmapper.getSearchCount(searchType, searchKeyword);
	}

	//검색결과 노출
	@Override
	public List<BoardDTO> getSearchPageList(String searchType, String searchKeyword, int startRow, int pageSize) {
		System.out.println("BoardServiceImpl getSearchPageList() 메소드호출");
		return boardmapper.getSearchPageList(searchType, searchKeyword, startRow, pageSize);
	}

	@Override
	public List<BoardDTO> getAdminPagelist(int startRow, int pageSize) {
		System.out.println("BoardServiceImpl getAdminPagelist() 메소드호출");
		return boardmapper.getAdminPagelist(startRow, pageSize);
	}

	@Override
	public List<BoardDTO> getAdminSearchPageList(String searchType, String searchKeyword, int startRow, int pageSize) {
		System.out.println("BoardServiceImpl getAdminSearchPageList() 메소드호출");
		return boardmapper.getAdminSearchPageList(searchType, searchKeyword, startRow, pageSize);
	}

	//로그인된 상태의 나만의 게시글을 출력
//	@Override
//	public List<BoardDTO> getMyBoardList(String m_email, int startRow, int pageSize) {
//		System.out.println("BoardServiceImpl getMyBoardList() 메소드호출");
//		return boardmapper.getMyBoardList(m_email, startRow, pageSize);
//	}

	//답글 작성하여 추가하는 메소드
	@Override
	public void reWriteInsert(BoardDTO bdto) {
		System.out.println("BoardServiceImpl reWriteInsert() 호출");	
		boardmapper.reWriteInsert(bdto);
	}
	//답글작성시 부모글의 re_level보다 큰 값들을 모두 1씩 증가시키는 메소드
	@Override
	public void reSqUpdate(BoardDTO bdto) {
		System.out.println("BoardServiceImpl reSqUpdate() 호출");
		boardmapper.reSqUpdate(bdto);
	}
	//답글 추가시 reSqUpdate() 메소드가 먼저 실행 되도록 묶음으로 만든 메소드
	@Override
	public boolean replyProcess(BoardDTO bdto) {
		//반드시 update메소드를 먼저 실행해야 함
		System.out.println("BoardServiceImpl replyProcess() 호출");		
		//로그인 멤버조회
		MemberDTO loginMem = memberservice.getOneMember(bdto.getM_code());
				
		//관리자면 댓글성공
		if(loginMem.getM_email().equals("admin@resort.com")) {
			
			boardmapper.reSqUpdate(bdto);
			
			// 댓글 위치 계산 (여기서 증가시킴)
	        bdto.setRe_step(bdto.getRe_step() + 1);
	        bdto.setRe_level(bdto.getRe_level() + 1);
	        
			//답글 insert 메소드
			boardmapper.reWriteInsert(bdto);
			
			System.out.println("ref: " + bdto.getRef());
			System.out.println("re_step: " + bdto.getRe_step());
			System.out.println("re_level: " + bdto.getRe_level());
			
			System.out.println("댓글추가 성공");
			
			return true;
		}else {
			System.out.println("댓글추가 실패. 문의게시판은 관리자만 댓글작성 가능합니다.");
			return false;
		}
	}

	//내가 작성한 게시글에 달린 관리자 댓글수 체크
	@Override
	public int existsAdminReply(int ref) {
		System.out.println("BoardServiceImpl existsAdminReply() 호출");	
		return boardmapper.existsAdminReply(ref);
	}

	@Override
	public int getMyBoardCount(int m_code, String searchType, String searchKeyword) {
		System.out.println("BoardServiceImpl getMyBoardCount() 호출");	
		return boardmapper.getMyBoardCount(m_code, searchType, searchKeyword);
	}

	@Override
	public List<BoardDTO> getMyBoardPageList(int m_code, String searchType, String searchKeyword, int startRow,
			int pageSize) {
		System.out.println("BoardServiceImpl getMyBoardPageList() 호출");	
		return boardmapper.getMyBoardPageList(m_code, searchType, searchKeyword, startRow, pageSize);
	}

	
}
