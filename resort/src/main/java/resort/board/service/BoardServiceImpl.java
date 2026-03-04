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

	    if(loginedMember == null) {
	        return null;
	    }

	    BoardDTO board = boardmapper.getOneBoard(bdto);
	    if(board == null) {
	        return null;
	    }

	    // 로그인한 사람 정보
	    MemberDTO loginMem = memberservice.getOneMember(loginedMember.getM_code());

	    // 이 글(ref)의 원글 작성자 찾기
	    // ref가 같고 re_step = 1 인 사람이 원글 작성자
	    BoardDTO parent = boardmapper.getParentByRef(board.getRef());

	    if(parent == null) {
	        return null;
	    }

	    MemberDTO parentWriter = memberservice.getOneMember(parent.getM_code());

	    boolean isAdmin = loginMem.getM_email().equals("admin@resort.com");
	    boolean isOriginalWriter = loginMem.getM_email().equals(parentWriter.getM_email());

	    if(!isAdmin && !isOriginalWriter) {
	        return null;
	    }

	    // 조회수 증가
	    boardmapper.upReadCount(bdto);

	    return boardmapper.getOneBoard(bdto);
	}

	//하나의 게시글을 수정하는 메소드
	@Override
	public boolean updateBoard(BoardDTO bdto,MemberDTO loginUser) {
		System.out.println("BoardServiceImpl updateBoard() 메소드호출");
		
		// 관리자면 그냥 수정
	    if("admin@resort.com".equals(loginUser.getM_email())) {
	        return boardmapper.adminUpdateBoard(bdto);
	    }
	    
		//일반 사용자
		int result = boardmapper.updateBoard(bdto);
		
		if(result > 0) {
			System.out.println("게시글 수정 성공");
			return true; //수정이 된 경우
		}else {
			System.out.println("게시글 수정 실패(비밀번호 불일치)");
			return false;
		}
	}

	//게시글 삭제하는 메소드	
	@Override
	public int deleteBoard(BoardDTO bdto) {
	    System.out.println("BoardServiceImpl deleteBoard() 메소드호출");

	    MemberDTO loginUser = memberservice.getOneMember(bdto.getM_code());
	    if(loginUser == null) {
	        return 0;
	    }

	    boolean isAdmin = "admin@resort.com".equals(loginUser.getM_email());

	    // 🔥 삭제 대상 게시글 먼저 조회
	    BoardDTO board = boardmapper.getBoardByBcode(bdto);
	    if(board == null) {
	        return 0;
	    }

	    boolean isOriginal = board.getRe_level() == 1;

	    //  관리자
	    if(isAdmin) {

	        if(isOriginal) {
	            // 원글이면 ref 전체 삭제
	            return boardmapper.deleteBoardByRef(board.getRef());
	        } else {
	            // 댓글이면 해당 댓글만 삭제
	            return boardmapper.deleteSingleReply(board.getB_code());
	        }
	    }

	    //  일반 사용자
	    if(isOriginal) {
	        // 원글 삭제는 비밀번호 체크 필요
	        Integer ref = boardmapper.getRefByBcode(bdto);
	        if(ref == null) {
	            return 0;
	        }
	        return boardmapper.deleteBoardByRef(ref);
	    } else {
	        // 댓글 삭제도 비밀번호 체크 필요
	        Integer ref = boardmapper.getRefByBcode(bdto);
	        if(ref == null) {
	            return 0;
	        }
	        return boardmapper.deleteSingleReply(board.getB_code());
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

	//나의 문의글 수
	@Override
	public int getMyBoardCount(int m_code, String searchType, String searchKeyword) {
		System.out.println("BoardServiceImpl getMyBoardCount() 호출");	
		return boardmapper.getMyBoardCount(m_code, searchType, searchKeyword);
	}

	//나의문의글 리스트
	@Override
	public List<BoardDTO> getMyBoardPageList(int m_code, String searchType, String searchKeyword, int startRow,
			int pageSize) {
		System.out.println("BoardServiceImpl getMyBoardPageList() 호출");	
		return boardmapper.getMyBoardPageList(m_code, searchType, searchKeyword, startRow, pageSize);
	}

	//ref값 추출
	@Override
	public BoardDTO getParentByRef(int ref) {
		System.out.println("BoardServiceImpl getParentByRef() 호출");	
		return boardmapper.getParentByRef(ref);
	}

	@Override
	public Integer getRefByBcode(BoardDTO bdto) {
		System.out.println("BoardServiceImpl getRefByBcode() 호출");	
		return boardmapper.getRefByBcode(bdto);
	}

	@Override
	public int deleteBoardByRef(int ref) {
		System.out.println("BoardServiceImpl deleteBoardByRef() 호출");	
		return boardmapper.deleteBoardByRef(ref);
	}

	@Override
	public BoardDTO getBoardByBcode(BoardDTO bdto) {
		System.out.println("BoardServiceImpl getBoardByBcode() 호출");	
		return boardmapper.getBoardByBcode(bdto);
	}
	//관리자 전용 조회
	@Override
	public boolean adminUpdateBoard(BoardDTO bdto) {
		System.out.println("BoardServiceImpl adminUpdateBoard() 호출");	
	    return boardmapper.adminUpdateBoard(bdto);
	}
	//댓글삭제
	@Override
	public int deleteSingleReply(int b_code) {
		System.out.println("BoardServiceImpl deleteSingleReply() 호출");	
		return boardmapper.deleteSingleReply(b_code);
	}

	
}
