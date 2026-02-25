package resort.reservation.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import resort.reservation.dto.ResInfoDTO;
import resort.reservation.dto.ReservationDTO;

public interface ReservationService {
	
	// 비회원 예약 내역 insert
	public int gInsertReservation(ReservationDTO redto);

	// 회원 예약 내역 insert
	public int mInsertReservation(ReservationDTO redto);
	
	// 회원 예약 내역 select
	public ResInfoDTO resSelect(String reservation_no);
	
	// 비회원의 g_check가 0이면서 axios로 받아온 데이터와 동일한 예약정보만 select
	public ResInfoDTO guestSelect(String reservation_no, String g_phone);
}
