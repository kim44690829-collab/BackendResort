package resort.reservation.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestParam;

import resort.product.dto.RoomDTO;
import resort.reservation.dto.ResInfoDTO;
import resort.reservation.dto.ReservationDTO;
import resort.reservation.dto.ReservationMergeDTO;

@Mapper
public interface ReservationMapper {

	// 비회원 예약 내역 insert
	public int gInsertReservation(ReservationDTO redto);
	
	// 회원 예약 내역 insert
	public int mInsertReservation(ReservationDTO redto);
	
	// 회원 예약 내역 select
	public ResInfoDTO resSelect(@Param("reservation_no") String reservation_no);
	
	// 비회원의 g_check가 0이면서 axios로 받아온 데이터와 동일한 예약정보만 select
	public ResInfoDTO guestSelect(@Param("reservation_no") String reservation_no, @Param("g_phone") String g_phone);
	
	
	// 전체 예약정보의 개수를 구하는 매소드
	public int getAllRescount1();
		
	// 전체 예약정보의 시작(startRow), 몇개의 행 (pageSize)만큼 보는 메소드
	public List<ReservationMergeDTO> getResPagelist1(@Param("startRow")int startRow,@Param("pageSize")int pageSize);
	
	//검색페이징에 필요한 메서드
	//searchType, searchKeyword에 해당하는 검색된 개수를 반환하는 메소드
	public int getSearchResCount1(@Param("searchType") String searchType,
			@Param("searchKeyword") String searchKeyword);
	
	// searchType, searchKeyword, startRow, pageSize
	// => limit startRow부터, pageSize개 만큼 한 화면에 보여질 행의 개수
	public List<ReservationMergeDTO> getSearchResPageList1(
		@Param("searchType") String searchType,
		@Param("searchKeyword") String searchKeyword,
		@Param("startRow") int startRow,
		@Param("pageSize") int pageSize
	);
	
	// 전체 예약정보의 개수를 구하는 매소드
	public int getAllRescount2();
		
	// 전체 예약정보의 시작(startRow), 몇개의 행 (pageSize)만큼 보는 메소드
	public List<ReservationMergeDTO> getResPagelist2(@Param("startRow")int startRow,@Param("pageSize")int pageSize);
	
	//검색페이징에 필요한 메서드
	//searchType, searchKeyword에 해당하는 검색된 개수를 반환하는 메소드
	public int getSearchResCount2(@Param("searchType") String searchType,
			@Param("searchKeyword") String searchKeyword);
	
	// searchType, searchKeyword, startRow, pageSize
	// => limit startRow부터, pageSize개 만큼 한 화면에 보여질 행의 개수
	public List<ReservationMergeDTO> getSearchResPageList2(
		@Param("searchType") String searchType,
		@Param("searchKeyword") String searchKeyword,
		@Param("startRow") int startRow,
		@Param("pageSize") int pageSize
	);
	
	
	// 전체 예약정보의 개수를 구하는 매소드
	public int getAllRescount();
		
	// 전체 예약정보의 시작(startRow), 몇개의 행 (pageSize)만큼 보는 메소드
	public List<ReservationMergeDTO> getResPagelist(@Param("startRow")int startRow,@Param("pageSize")int pageSize);
	
	//검색페이징에 필요한 메서드
	//searchType, searchKeyword에 해당하는 검색된 개수를 반환하는 메소드
	public int getSearchResCount(@Param("searchType") String searchType,
			@Param("searchKeyword") String searchKeyword);
	
	// searchType, searchKeyword, startRow, pageSize
	// => limit startRow부터, pageSize개 만큼 한 화면에 보여질 행의 개수
	public List<ReservationMergeDTO> getSearchResPageList(
		@Param("searchType") String searchType,
		@Param("searchKeyword") String searchKeyword,
		@Param("startRow") int startRow,
		@Param("pageSize") int pageSize
	);
	
	
	
	// 리뷰 상태 업데이트 함수
	public int reviewStatusMod();
	// 비회원 예약 삭제
	public int deleteResercation(@RequestParam("re_code") int re_code);
	
	// 비회원정보 수정
	public int updateResercation(@Param("booker_name") String booker_name, @Param("re_code") int re_code, @Param("g_phone") String g_phone);
	
	public int reviewMod(@Param("re_code") int re_code);
	
	// 리뷰 자동 업데이트
	public void reviewStatusUpdate();
	
	// 예약하나를 찾는 컨트롤러 - 중복 예약 방지
	public int reservationChk(@Param("r_code") int r_code, @Param("check_in_date") String check_in_date, @Param("check_out_date") String check_out_date);
}
