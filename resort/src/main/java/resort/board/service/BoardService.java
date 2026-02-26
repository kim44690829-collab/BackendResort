package resort.board.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import resort.board.dto.BoardDTO;
import resort.member.dto.MemberDTO;

public interface BoardService {
	//하나의 게시글 작성하여 추가하는 쿼리문
	public boolean insertBoard(BoardDTO bdto, MemberDTO loginedMember);
	
	//전체 게시글 목록을 출력하는 쿼리문
	public List<BoardDTO> getAllBoard();
	
	//하나의 게시글 상세정보보기
	//Readcount 누적하여 조회수를 증가하는 메소드도 함께 작성한다.
	public BoardDTO getOneBoard(BoardDTO bdto, MemberDTO loginedMember);
	
	//하나의 게시글을 수정하는 메소드
	public boolean updateBoard(BoardDTO bdto);
	
	// 게시글 작성시 비밀번호 입력하였기 때문에 => 삭제시에도 비밀번호와 번호가 일치하는지 체크
	// 매개변수가 2개이상인 경우는 @Param("변수" 데이터타입 필드명)이용해 작성한다.
	public boolean deleteBoard(BoardDTO bdto);
	
	//내용 또는 제목으로 게시글 검색하는 메소드
	//검색메소드 반드시, searchType, searchKeyword 매개변수 필요
	//public List<BoardDTO> getSearchBoard(@Param("searchType") String searchType,
	//		@Param("searchKeyword") String searchKeyword);
	
	//전체 게시글의 개수를 구하는 메소드
	public int getAllcount();
	
	//Limit 1(startRow), 5(PageSize) => 1부터 시작해서 5개만 출력
	//startRow ~ 한 페이지에 보여줄 레코드(=행의) 개수(pageSize)만큼 보여주는 메소드
	public List<BoardDTO> getPagelist(
			@Param("startRow") int startRow,
			@Param("pageSize") int pageSize);
	
	//검색 페이징에 필요한 메소드 생성하기 -------------------------------------------------
	//searchType, searchkeyword에 해당하는 검색된 개수를 반환하는 메소드
	public int getSearchCount(@Param("searchType") String searchType,
			@Param("searchKeyword") String searchKeyword);
	
	//검색 페이징 출력
	//searchType, searchkeyword, startRow, pageSize
	//=> limit startRow부터, pageSize개 만큼 한 화면에 보여질 행의 개수
	public List<BoardDTO> getSearchPageList(
			@Param("searchType") String searchType,
			@Param("searchKeyword") String searchKeyword,
			@Param("startRow") int startRow,
			@Param("pageSize") int pageSize			
			);
	
	
	// 로그인된 상태의 나만의 게시글을 출력
//	public List<BoardDTO> getMyBoardList(
//			@Param("loginId") String m_email,
//			@Param("startRow") int startRow,
//			@Param("pageSize") int pageSize
//			);

	// 로그인된 나만의 게시글의 개수
	// 매개변수가 2개이상이면 Param으로 받고 1개면 그냥 받아도됨
	//public int getMyBoardCount(String m_email);
}
