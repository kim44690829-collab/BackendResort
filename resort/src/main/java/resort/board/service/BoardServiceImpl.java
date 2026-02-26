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

	//하나의 게시글을 출력하는 메소드
	@Override
	public BoardDTO getOneBoard(BoardDTO bdto, MemberDTO loginedMember) {
		System.out.println("BoardServiceImpl getOneBoard() 메소드호출");
		
		if(loginedMember == null) {
			System.out.println("로그인 해주세요");
			return null;
		}
		
		//로그인시 작성자 이메일 저장
		bdto.setM_code(loginedMember.getM_code());
		
		BoardDTO result = boardmapper.getOneBoard(bdto);
		
		if(result == null) {
			System.out.println("본인이 작성한 글만 볼 수 있습니다.");
			return null;
		}else {
			System.out.println("게시글 출력 성공");
			// 조회수 증가 메소드 추가
			boardmapper.upReadCount(bdto);
			//조회수 증가 + 하나게시글 검색
			return boardmapper.getOneBoard(bdto);
		}
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

	//게시글 검색 메소드
//	@Override
//	public List<BoardDTO> getSearchBoard(String searchType, String searchKeyword) {
//		System.out.println("BoardServiceImpl getSearchBoard() 메소드호출");
//		System.out.println("searchType :"+searchType);
//		System.out.println("searchKeyword :"+searchKeyword);
//		return boardmapper.getSearchBoard(searchType,searchKeyword);
//	}

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

	// 로그인된 나만의 게시글의 개수
//	@Override
//	public int getMyBoardCount(String m_email) {
//		System.out.println("BoardServiceImpl getMyBoardCount() 메소드호출");
//		return boardmapper.getMyBoardCount(m_email);
//	} 
//	
}
