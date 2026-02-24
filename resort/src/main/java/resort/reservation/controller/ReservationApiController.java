package resort.reservation.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import resort.reservation.dto.ResInfoDTO;
import resort.reservation.dto.ResResponseDTO;
import resort.reservation.dto.ReservationDTO;
import resort.reservation.service.ReservationService;

@RestController
@RequestMapping("/api")
public class ReservationApiController {
	
	@Autowired
	ReservationService reservationservice;
	
	// 예약 추가
	@PostMapping("/reservations")
	public ResResponseDTO insertReservation(@RequestBody ReservationDTO redto){
		System.out.println("ReservationApiController : insertReservation() 메서드 확인");
		
		int result;
		String res_id = ""; 
		res_id = "R" + "-" + LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE) + "-" + UUID.randomUUID().toString().substring(0,8);
		redto.setReservation_no(res_id);
		
		if(redto.getG_code() != null && redto.getM_code() == null) {
			result = reservationservice.gInsertReservation(redto);
		}else if(redto.getG_code() == null && redto.getM_code() != null){
			result = reservationservice.mInsertReservation(redto);
		}else {
			System.out.println("예약 실패");
			result = 0;
		}
		boolean success = (result == 1);
		return new ResResponseDTO(success, result, success ? res_id : null);
	}
	
	// 예약 내역 가져오는 컨트롤러
	@GetMapping("/reservationInfo")
	public ResInfoDTO resSelect(@RequestParam("reservation_no") String reservation_no) {
		System.out.println("ReservationApiController : resSelect() 메서드 확인");
		System.out.println("reservation_no = [" + reservation_no + "]");
		
		if (reservation_no == null || reservation_no.trim().isEmpty()) {
	        return null;
	    }
		
		return reservationservice.resSelect(reservation_no);
	}
	
	// 비회원 예약정보 검색시 select
	@GetMapping("/reservationGuest")
	public ResInfoDTO guestSelect(@RequestParam("reservation_no") String reservation_no, @RequestParam("g_phone") String g_phone) {
		System.out.println("ReservationApiController : guestSelect() 메서드 확인");
		
		System.out.println("reservation_no : " + reservation_no);
		System.out.println("g_phone : " + g_phone);
		
		if (reservation_no == null || reservation_no.trim().isEmpty()) {
	        return null;
	    }
		
		return reservationservice.guestSelect(reservation_no, g_phone);
	}
	
}
