package resort.reservation.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import resort.reservation.dto.ResInfoDTO;
import resort.reservation.dto.ReservationDTO;
import resort.reservation.mapper.ReservationMapper;

@Service
public class ReservationServiceImpl implements ReservationService {

	@Autowired
	ReservationMapper reservationmapper;

	@Override
	public int gInsertReservation(ReservationDTO redto) {
		System.out.println("ReservationServiceImpl : insertReservation() 메서드 확인");
		return reservationmapper.gInsertReservation(redto);
	}

	@Override
	public int mInsertReservation(ReservationDTO redto) {
		System.out.println("ReservationServiceImpl : mInsertReservation() 메서드 확인");
		return reservationmapper.mInsertReservation(redto);
	}

	@Override
	public ResInfoDTO resSelect(String reservation_no) {
		System.out.println("ReservationServiceImpl : resSelect() 메서드 확인");
		return reservationmapper.resSelect(reservation_no);
	}

	
	
}
