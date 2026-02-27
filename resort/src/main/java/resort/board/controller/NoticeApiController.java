package resort.board.controller;

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

import com.fasterxml.jackson.databind.ObjectMapper;

import resort.board.dto.NoticeDTO;
import resort.board.service.NoticeService;
import resort.handler.PageHandler;
import resort.member.dto.MemberDTO;
import resort.product.dto.HotelDTO;
import resort.product.dto.RoomDTO;

@RestController
@RequestMapping("/api")
public class NoticeApiController {
	@Autowired
	NoticeService noticeService;
	
	@GetMapping("/board/noticelist")
	public Map<String, Object> noticelist(
			@RequestParam(value="searchType", required = false ) String searchType,
			@RequestParam(value="searchKeyword", required = false) String searchKeyword,
			@RequestParam(value="page",defaultValue="1") int page, // 초기 페이지
			@RequestParam(value="pageSize",defaultValue="10") int pageSize // 한 페이지당 보여줄 목록의 수
			){
		System.out.println("NoticeApiController : noticelist(@-@) 메서드 확인");
		
		int totalCnt ;
		
		if(searchType != null && !searchKeyword.trim().isEmpty()) {
			totalCnt=noticeService.getNoticeSearchCount(searchType, searchKeyword);
		}else {
			totalCnt=noticeService.getAllNoticecount();
		}
		
		
		// 페이지 핸들러 인스터스화
		PageHandler ph = new PageHandler(totalCnt, page, pageSize);
		
		//List<MemberDTO>list = memberservice.getPagelist(ph.getStartRow(), pageSize);
		List<NoticeDTO>list;
		
		if(searchType != null && !searchKeyword.trim().isEmpty()) {
			// service 에서 SearchBoard
			list = noticeService.getSearchPageNoticeList(searchType, searchKeyword,  ph.getStartRow(), pageSize);
		}else {
			list = noticeService.getPageNoticelist(ph.getStartRow(), pageSize);
		}
		
		
		
		Map<String, Object> result = new HashMap<>();
		
		result.put("list", list);
		result.put("ph", ph);
		result.put("searchType",searchType);
		result.put("searchKeyword",searchKeyword);
		return result;
	}
	
	// 공지사항 추가 메서드
	@PostMapping("/board/noticeinsert")
	public int insertNotice(@RequestParam("noticeData") String noticeData)throws Exception {
		System.out.println("자동차 등록 요청");
		
		// JSON 문자열 → TestImgDTO 변환
        ObjectMapper mapper = new ObjectMapper();
        NoticeDTO ndto = mapper.readValue(noticeData, NoticeDTO.class);
        
        noticeService.insertNotice(ndto);
        
        return 1;
	}
	
	// 공지사항 삭제 메서드
	@DeleteMapping("/board/deletenotice")
	public int deleteNotice(@RequestParam("n_code") int n_code) {
		System.out.println("ReviewboardApiController : deleteNotice(@-@) 메서드 확인");
		return noticeService.deleteNotice(n_code);
	}
	
	@GetMapping("/board/onenotice")
	public NoticeDTO oneSelectNotice(@RequestParam("n_code") int n_code) {
		System.out.println("ReviewboardApiController : oneSelectNotice(@-@) 메서드 확인");
		return noticeService.oneSelectNotice(n_code);
	}
	
	//공지 수정 메서드
	@PutMapping("/board/adminupdatenotice")
	public int adminUpdateNotice(@RequestBody NoticeDTO ndto){			
		System.out.println("ReviewboardApiController : oneSelectNotice(@-@) 메서드 확인");
		return noticeService.adminUpdateNotice(ndto);
	}
	
}
