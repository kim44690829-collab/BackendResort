package resort.reservation.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import resort.reservation.dto.ResInfoDTO;
import resort.reservation.dto.ReservationDTO;

@Mapper
public interface ReservationMapper {

	// 비회원 예약 내역 insert
	public int gInsertReservation(ReservationDTO redto);
	
	// 회원 예약 내역 insert
	public int mInsertReservation(ReservationDTO redto);
	
	// 회원 예약 내역 select
	public List<ResInfoDTO> resSelect(@Param("booker_name") String booker_name);
}
