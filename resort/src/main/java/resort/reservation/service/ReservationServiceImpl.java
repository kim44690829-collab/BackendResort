package resort.reservation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import resort.reservation.dto.ReservationDTO;
import resort.reservation.mapper.ReservationMapper;

@Service
public class ReservationServiceImpl implements ReservationService {

	@Autowired
	ReservationMapper reservationmapper;
	
	@Override
	public int insertReservation(ReservationDTO redto) {
		System.out.println("ReservationServiceImpl : insertReservation() 메서드 확인");
		return reservationmapper.insertReservation(redto);
	}

	
	
}
