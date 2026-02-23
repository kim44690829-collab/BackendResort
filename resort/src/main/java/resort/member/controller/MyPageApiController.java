package resort.member.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import resort.member.dto.MyPageDTO;
import resort.member.service.MyPageService;

@RestController
@RequestMapping("/api")
public class MyPageApiController {
	@Autowired
	MyPageService mypageservice; 
	
	//회원의 예약정보, 쿠폰정보, 회원정보 가져오기
	@GetMapping("/member/mypage")
	public List<MyPageDTO> getMemberinfo(@RequestParam("m_email") String email){
		System.out.println("MyPageApiController : getMemberinfo() 메서드 확인");

		return mypageservice.getMemberinfo(email);
	}
	
	//예약취소
	@PutMapping("/reservation/cancel")
	public boolean insertCancel(@RequestParam("re_code") int re_code) {
		System.out.println("MyPageApiController : insertCancel() 메서드 확인");

		return mypageservice.insertCancel(re_code);			
	}

	
	
}
