package resort.reservation.mapper;

import org.apache.ibatis.annotations.Mapper;

import resort.reservation.dto.ReservationDTO;

@Mapper
public interface ReservationMapper {

	// 비회원 예약 내역 insert
	public int gInsertReservation(ReservationDTO redto);
	
	// 회원 예약 내역 insert
	public int mInsertReservation(ReservationDTO redto);
}
