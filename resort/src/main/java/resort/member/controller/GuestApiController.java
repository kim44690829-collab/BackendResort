package resort.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

	
}
