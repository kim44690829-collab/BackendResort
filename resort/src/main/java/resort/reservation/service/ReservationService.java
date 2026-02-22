package resort.reservation.service;

import resort.reservation.dto.ReservationDTO;

public interface ReservationService {
	
	// 비회원 예약 내역 insert
	public int gInsertReservation(ReservationDTO redto);

	// 회원 예약 내역 insert
	public int mInsertReservation(ReservationDTO redto);
	
}
