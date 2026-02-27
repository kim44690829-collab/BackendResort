package resort.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import resort.board.dto.BoardDTO;

@Mapper
public interface BoardMapper {
	//하나의 게시글 작성하여 추가하는 쿼리문
	public void insertBoard(BoardDTO bdto);
	
	//전체 게시글 목록을 출력하는 쿼리문
	public List<BoardDTO> getAllBoard();
	
	//나의 게시글 목록을 출력하는 쿼리문
	public List<BoardDTO> getMyBoard(int m_code);
	
	//하나의 게시글 상세정보보기
	//Readcount 누적하여 조회수를 증가하는 메소드도 함께 작성한다.
	public int upReadCount(BoardDTO bdto);
	public BoardDTO getOneBoard(BoardDTO bdto);
	
	//하나의 게시글을 수정하는 메소드
	public int updateBoard(BoardDTO bdto);
	
	// 게시글 삭제
	// 매개변수가 2개이상인 경우는 @Param("변수" 데이터타입 필드명)이용해 작성한다.
	public int deleteBoard(BoardDTO bdto);

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
	
	//내가 작성한 게시글에 달린 관리자 댓글수 체크
	public int existsAdminReply(int ref);

		
	//답글 작성하여 추가하는 메소드
	public void reWriteInsert(BoardDTO bdto);
		
	//답글작성시 부모글의 re_level보다 큰 값들을 모두 1씩 증가시키는 메소드
	//ref : 1, re_step : 1, re_level : 1 => 원글
	//원글에 답글을 달 경우 
	//=>ref : 1(원글번호 동일), re_step : 2, re_level : 2
	public void reSqUpdate(BoardDTO bdto);
	
	//답글 추가시 reSqUpdate() 메소드가 먼저 실행 되도록 묶음으로 만든 메소드
	public void replyProcess(BoardDTO bdto);
	
	
	//나의 문의글 수
	public int getMyBoardCount(
			@Param("m_code") int m_code,
			@Param("searchType") String searchType,
			@Param("searchKeyword") String searchKeyword);

	//나의 문의글 리스트
	public List<BoardDTO> getMyBoardPageList(
			@Param("m_code") int m_code,
			@Param("searchType") String searchType,
			@Param("searchKeyword") String searchKeyword,
			@Param("startRow") int startRow,
			@Param("pageSize") int pageSize	);
}
