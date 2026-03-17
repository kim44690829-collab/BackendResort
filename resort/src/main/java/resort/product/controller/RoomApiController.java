package resort.product.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import resort.handler.PageHandler;
import resort.member.dto.MemberDTO;
import resort.product.dto.HotelDTO;
import resort.product.dto.ReservateRoomDTO;
import resort.product.dto.RoomDTO;
import resort.product.dto.RoomMergeDTO;
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
		@GetMapping("/room/list")
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
			
			List<RoomMergeDTO>list;
			
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
		
		
		
		// =============== 2026-02-24 수정부분 JHJ =====================
		// 호텔 목록 추가
		@PostMapping("/room/insert")
		public int insertRoom(
				//@ModelAttribute HotelDTO hdto ,
				@RequestParam("roomData") String roomData
				) throws Exception{
			System.out.println("객실 등록 요청");
			
			// JSON 문자열 → TestImgDTO 변환
	        ObjectMapper mapper = new ObjectMapper();
	        RoomDTO rdto = mapper.readValue(roomData, RoomDTO.class);
			
			
			
			// DB에 저장
			roomService.insertRoom(rdto);
			
			return 1;
		}
		
	@GetMapping("/room/available")
	public List<RoomDTO> reservateRoom(ReservateRoomDTO resRdto) {
		System.out.println("RoomApiController : reservateRoom() 메서드 확인");
		System.out.println("?????????????" + resRdto.getMaxOccupancy());
		return roomService.reservateRoom(resRdto);
	}
	
	
	// =============== 2026-02-25 수정부분 JHJ =====================
	
	@PutMapping("/room/update")
	public int RoomUpdate(@RequestBody RoomDTO rdto) {
		System.out.println("RoomApiController : RoomUpdate() 메서드 확인");
		return roomService.updateRoom(rdto);
	}
	
	
	// 객실 상품의 총 개수
	@GetMapping("/room/getAllCount")
	public int getroomAllCount() {
		System.out.println("RoomApiController : getroomAllCount() 메서드 확인");
		return roomService.getAllRoomcount();
	}
	
	
	
	@GetMapping("/room/oneRoom/{r_code}")
	public RoomDTO  oneRoom(@PathVariable("r_code") int r_code) {
		System.out.println("RoomApiController : oneRoom 요청됨");
		System.out.println(r_code);
		return roomService.oneRoom(r_code);
	}
	
	
	
	
}
