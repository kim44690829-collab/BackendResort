package resort.reservation.mapper;

import org.apache.ibatis.annotations.Mapper;

import resort.reservation.dto.ReservationDTO;

@Mapper
public interface ReservationMapper {

	// 예약 내역 insert
	public int insertReservation(ReservationDTO redto);
	
}
