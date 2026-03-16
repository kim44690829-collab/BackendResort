package resort.reservation.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import resort.handler.PageHandler;
import resort.product.dto.RoomDTO;
import resort.reservation.dto.ResInfoDTO;
import resort.reservation.dto.ResResponseDTO;
import resort.reservation.dto.ReservationDTO;
import resort.reservation.dto.ReservationMergeDTO;
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
	
	
	@GetMapping("/reservation/list")
	public Map<String, Object> reservationList(
			@RequestParam(value="searchType", required = false ) String searchType,
			@RequestParam(value="searchKeyword", required = false) String searchKeyword,
			@RequestParam(value="page",defaultValue="1") int page, // 초기 페이지
			@RequestParam(value="pageSize",defaultValue="10") int pageSize // 한 페이지당 보여줄 목록의 수
			){
		System.out.println("MemberApiController : reservationList(@-@) 메서드 확인");
		
		int totalCnt ;
		
		if(searchType != null && !searchKeyword.trim().isEmpty()) {
			totalCnt=reservationservice.getSearchResCount(searchType, searchKeyword);
		}else {
			totalCnt=reservationservice.getAllRescount();
		}
		
		
		// 페이지 핸들러 인스터스화
		PageHandler ph = new PageHandler(totalCnt, page, pageSize);
		
		List<ReservationMergeDTO>list;
		
		if(searchType != null && !searchKeyword.trim().isEmpty()) {
			list = reservationservice.getSearchResPageList(searchType, searchKeyword, ph.getStartRow(), pageSize);				
		}else {
			list = reservationservice.getResPagelist(ph.getStartRow(), pageSize);
		}
		
		
		
		Map<String, Object> result = new HashMap<>();
		
		result.put("list", list);
		result.put("ph", ph);
		result.put("searchType",searchType);
		result.put("searchKeyword",searchKeyword);
		return result;
	}
	// 비회원 소프트 삭제
	@PutMapping("/reservation/delete")
	public int reservationDelete(@RequestParam("re_code") int re_code) {
		System.out.println("reservationApiController : reservationDelete(@-@) 메서드 확인");
		reservationservice.deleteResercation(re_code);
		
		return 1;
	}
	
	
	// 비회원 정보 수정
	@PutMapping("/reservation/update")
	public int reservationUpdate(@RequestParam("re_code") int re_code,@RequestParam("g_phone") String g_phone,@RequestParam("booker_name") String booker_name) {
		System.out.println("reservationApiController : reservationDelete(@-@) 메서드 확인");
		reservationservice.updateResercation(booker_name, re_code, g_phone);
		
		return 1;
	}
	
	
	
	// 리뷰 상태 업데이트
	@PutMapping("/reservation/reviewStatusMod")
	public int reviewStatusMod() {
		System.out.println("MemberApiController : reviewStatusMod!!!!!!!!!! 메서드 확인");
		return reservationservice.reviewStatusMod();
	}
	
	// 리뷰 작성후 업데이트
	@PutMapping("/reservation/resMod")
	public int reviewMod(@RequestParam("re_code") int re_code) {
		System.out.println("MemberApiController : reviewMod!!!!!!!!!! 메서드 확인");
		return reservationservice.reviewMod(re_code);
	}
	
}
