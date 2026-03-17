package resort.member.service;

import org.apache.ibatis.annotations.Param;

import resort.member.dto.GuestDTO;

public interface GuestService {

	// 비회원 insert
	public int insertGuest(GuestDTO gdto);
	
	// 비회원의 체크아웃 일자를 넘어서면 guest 의 g_check를 1로 업데이트
	public int guestChk(String reservation_no,String g_phone);
	
	// 비회원의 정보가 있는지 확인하는 select문
	public GuestDTO selectResGuest(String reservation_no,String g_phone);
	
	// 정보가 있는지 확인하고 있으면 업데이트
	public int guestChkPro(String reservation_no,String g_phone);
	
	// 정보 있는지 확인
	public int guestSel(String reservation_no);
	
	// 비회원 자동 소프트 삭제
	public void guestUpdate();
}
