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
import resort.reservation.dto.ReservationDTO;
import resort.reservation.service.ReservationService;

@RestController
@RequestMapping("/api")
public class ReservationApiController {
	
	@Autowired
	ReservationService reservationservice;
	
	// 예약 추가
	@PostMapping("/reservations")
	public int insertReservation(@RequestBody ReservationDTO redto){
		System.out.println("ReservationApiController : insertReservation() 메서드 확인");
		
		String res_id = ""; 
		res_id = "R" + "-" + LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE) + "-" + UUID.randomUUID().toString().substring(0,8);
		redto.setReservation_no(res_id);
		
		if(redto.getG_code() != null && redto.getM_code() == null) {
			return reservationservice.gInsertReservation(redto);
		}else if(redto.getG_code() == null && redto.getM_code() != null){
			return reservationservice.mInsertReservation(redto);
		}else {
			System.out.println("예약 실패");
			return 0;
		}
	}
	
	// 예약 내역 가져오는 컨트롤러
	@GetMapping("/reservationInfo")
	public List<ResInfoDTO> resSelect(@RequestParam("booker_name") String booker_name) {
		System.out.println("ReservationApiController : resSelect() 메서드 확인");
		System.out.println("booker_name = [" + booker_name + "]");
		List<ResInfoDTO> resDTO = reservationservice.resSelect(booker_name);
		
		System.out.println("조회 건수: " + (resDTO == null ? "null" : resDTO.size()));
		if (resDTO == null) return new ArrayList<>();
		
		return resDTO;
	}
	
}
