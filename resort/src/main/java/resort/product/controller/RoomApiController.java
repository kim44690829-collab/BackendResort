package resort.product.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import resort.product.dto.ReservateRoomDTO;
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
	
	@GetMapping("/room/available")
	public List<RoomDTO> reservateRoom(ReservateRoomDTO resRdto) {
		System.out.println("RoomApiController : reservateRoom() 메서드 확인");
		return roomService.reservateRoom(resRdto);
	}
	
}
