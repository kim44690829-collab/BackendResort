package resort.reservation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import resort.member.dto.GuestDTO;
import resort.member.service.GuestService;
import resort.reservation.dto.ReservationDTO;
import resort.reservation.service.ReservationService;

@RestController
@RequestMapping("/api")
public class ReservationApiController {
	
	@Autowired
	ReservationService reservationservice;
	
//	@Autowired
//	GuestService guestservice;
	
	// 예약 추가
//	@PostMapping("/reservations")
//	public int insertReservation(@RequestBody GuestDTO gdto, @RequestBody ReservationDTO redto){
//		System.out.println("ReservationApiController : insertReservation() 메서드 확인");
//		// 비회원 insert
//		guestservice.insertGuest(gdto);
//		return reservationservice.insertReservation(redto);
//	}
	
	// 예약 추가
	@PostMapping("/reservations")
	public int insertReservation(@RequestBody ReservationDTO redto){
		System.out.println("ReservationApiController : insertReservation() 메서드 확인");
		if(redto.getG_code() != null && redto.getM_code() == null) {
			return reservationservice.gInsertReservation(redto);
		}else if(redto.getG_code() == null && redto.getM_code() != null){
			return reservationservice.mInsertReservation(redto);
		}else {
			System.out.println("예약 실패");
			return 0;
		}
	}
}
