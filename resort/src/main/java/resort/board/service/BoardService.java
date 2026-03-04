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
	
	//나의 게시글 목록을 출력하는 쿼리문
	public List<BoardDTO> getMyBoard(int m_code);
	
	//하나의 게시글 상세정보보기
	//Readcount 누적하여 조회수를 증가하는 메소드도 함께 작성한다.
	public BoardDTO getOneBoard(BoardDTO bdto, MemberDTO loginedMember);
	
	//관리자 전용 조회
	public BoardDTO getBoardByBcode(BoardDTO bdto);
	
	//하나의 게시글을 수정하는 메소드
	public boolean updateBoard(BoardDTO bdto,MemberDTO loginUser);
	
	//관리자 수정
	public boolean  adminUpdateBoard(BoardDTO bdto);
	
	// 게시글 작성시 비밀번호 입력하였기 때문에 => 삭제시에도 비밀번호와 번호가 일치하는지 체크
	// 매개변수가 2개이상인 경우는 @Param("변수" 데이터타입 필드명)이용해 작성한다.
	//public boolean deleteBoard(BoardDTO bdto);
	
	// 삭제를 위한 ref 먼저 구하는 쿼리
	public Integer getRefByBcode(BoardDTO bdto);
	// 글을 삭제하는 메소드 : ref 전체 삭제
	public int deleteBoardByRef(int ref);
	//삭제실행 통합 메소드
	public int deleteBoard(BoardDTO bdto);
	
	// 댓글 삭제
	public int deleteSingleReply(int b_code);


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
	

	// 로그인된 나만의 게시글의 개수
	// 매개변수가 2개이상이면 Param으로 받고 1개면 그냥 받아도됨
	//public int getMyBoardCount(String m_email);
	
	
	public List<BoardDTO> getAdminPagelist(
			@Param("startRow") int startRow,
			@Param("pageSize") int pageSize);
	
	public List<BoardDTO> getAdminSearchPageList(
			@Param("searchType") String searchType,
			@Param("searchKeyword") String searchKeyword,
			@Param("startRow") int startRow,
			@Param("pageSize") int pageSize			
			);
	//답글 작성하여 추가하는 메소드
	public void reWriteInsert(BoardDTO bdto);
	
	//답글작성시 부모글의 re_level보다 큰 값들을 모두 1씩 증가시키는 메소드
	//ref : 1, re_step : 1, re_level : 1 => 원글
	//원글에 답글을 달 경우 
	//=>ref : 1(원글번호 동일), re_step : 2, re_level : 2
	public void reSqUpdate(BoardDTO bdto);
	
	//답글 추가시 reSqUpdate() 메소드가 먼저 실행 되도록 묶음으로 만든 메소드
	//reSqUpdate() + reWriteInsert()합쳐서 실행하는 메소드
	//이유는 답글은 추가되기 이전에 기존의 ref, re_step, re_level의 값이 변경되는
	//부분이 필요하므로 반드시 reSqUpdate() 먼저실행, reWriteInsert()를 그다음에 실행
	public boolean replyProcess(BoardDTO bdto);
	

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

	//ref값 추출
	public BoardDTO getParentByRef(int ref);
}
