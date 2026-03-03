package resort.member.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import resort.handler.PageHandler;
import resort.member.dto.MemberDTO;
import resort.member.service.MemberService;

@RestController
@RequestMapping("/api")
public class MemberApiController {
	@Autowired
	MemberService memberservice;

	
	//회원 가입 추가
	@PostMapping("/member/insert")
	public int insertMember(@RequestBody MemberDTO mdto){
		System.out.println("MemberApiController : insertMember() 메서드 확인");
		return memberservice.insertMember(mdto);
	}	
	//회원 전체 목록 검색
	@GetMapping("/member/allmember")
	public List<MemberDTO> allSelectMember(){
		System.out.println("MemberApiController : allSelectMember() 메서드 확인");
		return memberservice.allSelectMember();
	}	
	
	//개인 한 사람의 정보를 검색
	@GetMapping("/member/onemember")
	public MemberDTO oneSelectMember(@RequestParam("m_email") String m_email){
		System.out.println("MemberApiController : oneSelectMember() 메서드 확인");
		return memberservice.oneSelectMember(m_email);
	}	
	//개인 한 사람의 정보를 검색 - 예약 페이지용
	@GetMapping("/member/onememberSelect")
	public MemberDTO getOneSelectMember(@RequestParam("m_nickName") String m_nickName){
		System.out.println("MemberApiController : oneSelectMember() 메서드 확인");
		return memberservice.getOneSelectMember(m_nickName);
	}	
	
	//개인 한사람의 정보를 수정
	@PutMapping("/member/updatemember")
	public boolean updateMember(@RequestBody MemberDTO mdto){			
		System.out.println("MemberApiController : updateMember() 메서드 확인");
		return memberservice.updateMember(mdto);
	}
	
	// 한사람 개인의 정보를 삭제하는 메소드 작성
	@PutMapping("/member/deletemember")
	public boolean deleteMember(@RequestBody MemberDTO mdto){
		System.out.println("MemberApiController : deleteMember() 메서드 확인");
		return memberservice.deleteMember(mdto);
	}
	
	// ============= 2026-02-20 수정 부분 ==============
	@GetMapping("member/list")
	public Map<String, Object> memberList(
			@RequestParam(value="searchType", required = false ) String searchType,
			@RequestParam(value="searchKeyword", required = false) String searchKeyword,
			@RequestParam(value="page",defaultValue="1") int page, // 초기 페이지
			@RequestParam(value="pageSize",defaultValue="10") int pageSize // 한 페이지당 보여줄 목록의 수
			){
		System.out.println("MemberApiController : memberList(@-@) 메서드 확인");
		System.out.println(searchKeyword);
		System.out.println(searchType);
		int totalCnt ;
		
		if(searchType != null && !searchKeyword.trim().isEmpty()) {
			totalCnt=memberservice.getSearchCount(searchType, searchKeyword);
		}else if(searchType == "gender" && searchKeyword.trim()=="남"){
			System.out.println("성별 남자 확인용");
			System.out.println(searchKeyword);
			totalCnt=memberservice.getSearchCount(searchType, "0");
		}else if(searchType == "gender" && searchKeyword.trim()=="여"){
			System.out.println("성별 여자 확인용");
			System.out.println(searchKeyword);
			totalCnt=memberservice.getSearchCount(searchType, "1");
		}else {
			totalCnt=memberservice.getAllcount();
		}
		
		
		// 페이지 핸들러 인스터스화
		PageHandler ph = new PageHandler(totalCnt, page, pageSize);
		
		//List<MemberDTO>list = memberservice.getPagelist(ph.getStartRow(), pageSize);
		List<MemberDTO>list;
		
		if(searchType != null && !searchKeyword.trim().isEmpty()) {
			// service 에서 SearchBoard
			if("gender".equals(searchType) && "남".equals(searchKeyword)) {				
				list = memberservice.getSearchPageList(searchType, "0", ph.getStartRow(), pageSize);				
			}else if("gender".equals(searchType) && "여".equals(searchKeyword)) {
				list = memberservice.getSearchPageList(searchType, "1", ph.getStartRow(), pageSize);								
			}else {
				list = memberservice.getSearchPageList(searchType, searchKeyword, ph.getStartRow(), pageSize);				
			}
		}else {
//			list = boardservice.allboard();
			list = memberservice.getPagelist(ph.getStartRow(), pageSize);
		}
		
		
		Map<String, Object> result = new HashMap<>();
		
		result.put("list", list);
		result.put("ph", ph);
		result.put("searchType",searchType);
		result.put("searchKeyword",searchKeyword);
		return result;
	}
	
	
	
	//로그인 메소드
	@PostMapping("/member/login")
	public MemberDTO login(@RequestBody MemberDTO mdto,HttpSession session) {
		System.out.println("MemberApiController : login 요청됨");
		
		MemberDTO loginUser = memberservice.loginConfirm(mdto);
		
		System.out.println(loginUser);
		
		if(loginUser != null) {
			//세션에 로그인 정보담기
			//session.setAttribute("loginUser", loginUser.getM_email());
			session.setAttribute("loginUser", loginUser);
			System.out.println("################로그인성공"+session.getAttribute("loginUser"));
		}
		
		//React로 JSON 변환
		return loginUser;
	}
	
	//로그아웃
	@GetMapping("/member/logout")
	public int logout(HttpSession session) {
		//, HttpServletResponse response
		System.out.println("MemberApiController : logout 요청됨");
		
		if(session.getAttribute("loginUser") != null) {
			session.invalidate();//세션삭제
			System.out.println("logout 성공");
			
			return 1;//성공	
		}else {
			System.out.println("logout 실패");
			return 0;//실패			
		}		
		// 2. 브라우저에게 JSESSIONID 쿠키를 삭제하라고 명령
//	    Cookie cookie = new Cookie("JSESSIONID", null);
//	    cookie.setPath("/");
//	    cookie.setMaxAge(0); // 수명을 0으로 설정하여 즉시 삭제
//	    response.addCookie(cookie);  
	}
	
	// ========================== 2026-02-24 수정부분 ==============================
	// 관리자 페이지에서 회원수정
	//개인 한사람의 정보를 수정
	@PutMapping("/member/adminupdatemember")
	public int adminUpdateMember(@RequestBody MemberDTO mdto){			
		System.out.println("MemberApiController : updateMember() 메서드 확인");
		return memberservice.adminUpdateMember(mdto);
	}
	
	// 쿠폰 사용한 회원 쿠폰수량 업데이트
	@PutMapping("/member/couponMod")
	public int couponMod(@RequestParam("m_code") Integer m_code) {
		System.out.println("MemberApiController : couponMod 요청됨");
		return memberservice.couponMod(m_code);
	}
	
	// 비밀번호 찾기
	@PutMapping("/member/modPwMember")
	public int pwFind(@RequestBody MemberDTO mdto) {
		System.out.println("MemberApiController : pwFind 요청됨");
		return memberservice.pwFind(mdto);
	}

}