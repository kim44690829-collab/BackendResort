package resort.product.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import resort.handler.PageHandler;
import resort.member.dto.MemberDTO;
import resort.product.dto.RoomDTO;
import resort.product.service.RoomService;

@RestController
@RequestMapping("/api")
public class RoomApiController {

	@Autowired
	RoomService roomService;
	
	// 호텔 전체 정보 보내는 컨트롤러
	@GetMapping("/room/context")
	public List<RoomDTO> allRoom(){
		System.out.println("RoomApiController : roomService() 메서드 확인");
		return roomService.getRoomAll();
	}
	
	// ============= 2026-02-23 수정 부분 ==============
		@GetMapping("room/list")
		public Map<String, Object> roomList(
				@RequestParam(value="searchType", required = false ) String searchType,
				@RequestParam(value="searchKeyword", required = false) String searchKeyword,
				@RequestParam(value="page",defaultValue="1") int page, // 초기 페이지
				@RequestParam(value="pageSize",defaultValue="10") int pageSize // 한 페이지당 보여줄 목록의 수
				){
			System.out.println("MemberApiController : memberList(@-@) 메서드 확인");
			
			int totalCnt ;
			
			if(searchType != null && !searchKeyword.trim().isEmpty()) {
				totalCnt=roomService.getSearchRoomCount(searchType, searchKeyword);
			}else {
				totalCnt=roomService.getAllRoomcount();
			}
			
			
			// 페이지 핸들러 인스터스화
			PageHandler ph = new PageHandler(totalCnt, page, pageSize);
			
			List<RoomDTO>list;
			
			if(searchType != null && !searchKeyword.trim().isEmpty()) {
					list = roomService.getSearchRoomPageList(searchType, searchKeyword, ph.getStartRow(), pageSize);				
			}else {
				list = roomService.getRoomPagelist(ph.getStartRow(), pageSize);
			}
			
			
			
			Map<String, Object> result = new HashMap<>();
			
			result.put("list", list);
			result.put("ph", ph);
			result.put("searchType",searchType);
			result.put("searchKeyword",searchKeyword);
			return result;
		}
}
