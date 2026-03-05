package resort.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import resort.member.dto.GuestDTO;
import resort.member.service.GuestService;

@RestController
@RequestMapping("/api")
public class GuestApiController {

	@Autowired
	GuestService guestservice;
	
	@PostMapping("/guest")
	public int insertGuest(@RequestBody GuestDTO gdto) {
		System.out.println("GuestApiController : insertGuest() 메서드 확인");
		return guestservice.insertGuest(gdto);
	}
	
	@PutMapping("/guestResUpdate")
	public int guestChk(@RequestParam("reservation_no") String reservation_no, @RequestParam("g_phone") String g_phone) {
		System.out.println("GuestApiController : guestChk() 메서드 확인");
		return guestservice.guestChkPro(reservation_no, g_phone);
	}
	
	@GetMapping("/guestResSelect")
	public int guestSel(@RequestParam("reservation_no") String reservation_no) {
		System.out.println("GuestApiController : guestSel() 메서드 확인");
		return guestservice.guestSel(reservation_no);
	}

	
}
