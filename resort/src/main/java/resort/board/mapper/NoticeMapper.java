package resort.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import resort.board.dto.NoticeDTO;
import resort.member.dto.MemberDTO;
import resort.product.dto.HotelDTO;

@Mapper
public interface NoticeMapper {
	
	// 전체 호텔정보의 개수를 구하는 매소드
	public int getAllNoticecount();
	
	// 전체 회원정보의 시작(startRow), 몇개의 행 (pageSize)만큼 보는 메소드
	public List<NoticeDTO> getPageNoticelist(@Param("startRow")int startRow,@Param("pageSize")int pageSize);
	
	//검색페이징에 필요한 메서드
	//searchType, searchKeyword에 해당하는 검색된 개수를 반환하는 메소드
	public int getNoticeSearchCount(@Param("searchType") String searchType,
			@Param("searchKeyword") String searchKeyword);
	
	// searchType, searchKeyword, startRow, pageSize
	// => limit startRow부터, pageSize개 만큼 한 화면에 보여질 행의 개수
	public List<NoticeDTO> getSearchPageNoticeList(
		@Param("searchType") String searchType,
		@Param("searchKeyword") String searchKeyword,
		@Param("startRow") int startRow,
		@Param("pageSize") int pageSize
	);
	
	// 공지 추가를 위한 
	public void insertNotice(NoticeDTO ndto);
	
	//공지 삭제를 위한
	public int deleteNotice(@Param("n_code") int n_code);
	
	//수정할 한 공지의 정보를 검색하는 메소드
	public NoticeDTO oneSelectNotice(@Param("n_code") int n_code);
	
	// 공지사항 수정 메서드
	public int adminUpdateNotice(NoticeDTO ndto);
}
