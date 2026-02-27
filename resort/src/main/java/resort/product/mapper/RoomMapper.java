package resort.product.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import resort.member.dto.MemberDTO;
import resort.product.dto.HotelDTO;
import resort.product.dto.ReservateRoomDTO;
import resort.product.dto.RoomDTO;

@Mapper
public interface RoomMapper {

	// 객실 전체 검색
	public List<RoomDTO> getRoomAll();
	
	// 객실 최소가 검색
	public List<RoomDTO> getMinPrice();
	
	//=========2026-02-23 수정 ==========
	// 전체 회원정보의 개수를 구하는 매소드
	public int getAllRoomcount();
	
	// 전체 회원정보의 시작(startRow), 몇개의 행 (pageSize)만큼 보는 메소드
	public List<RoomDTO> getRoomPagelist(@Param("startRow")int startRow,@Param("pageSize")int pageSize);
	
	//검색페이징에 필요한 메서드
	//searchType, searchKeyword에 해당하는 검색된 개수를 반환하는 메소드
	public int getSearchRoomCount(@Param("searchType") String searchType,
			@Param("searchKeyword") String searchKeyword);
	
	// searchType, searchKeyword, startRow, pageSize
	// => limit startRow부터, pageSize개 만큼 한 화면에 보여질 행의 개수
	public List<RoomDTO> getSearchRoomPageList(
			@Param("searchType") String searchType,
			@Param("searchKeyword") String searchKeyword,
			@Param("startRow") int startRow,
			@Param("pageSize") int pageSize
			);
	
	// =============== 2026-02-24 수정부분 JHJ =====================
	public void insertRoom(RoomDTO rdto);
	// 예약된 객실 제외한 객실을 찾는 select
	public List<RoomDTO> reservateRoom(ReservateRoomDTO resRdto);
	
	public int updateRoom(RoomDTO rdto);
}
