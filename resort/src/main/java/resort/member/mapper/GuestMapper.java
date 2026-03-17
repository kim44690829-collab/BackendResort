package resort.member.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import resort.member.dto.GuestDTO;

@Mapper
public interface GuestMapper {

	// 비회원 insert
	public void insertGuest(GuestDTO gdto);
	
	// 비회원 코드 select
	public GuestDTO selectOneGuest();
	
	// 비회원의 체크아웃 일자를 넘어서면 guest 의 g_check를 1로 업데이트
	public int guestChk(@Param("reservation_no") String reservation_no, @Param("g_phone") String g_phone);
	
	// 비회원의 정보가 있는지 확인하는 select문
	public GuestDTO selectResGuest(@Param("reservation_no") String reservation_no, @Param("g_phone") String g_phone);

	// 정보 있는지 확인
	public GuestDTO guestSel(@Param("reservation_no") String reservation_no);
	
	// 비회원 자동 소프트 삭제
	public void guestUpdate();
}
