package resort.product.service;

import java.util.List;

import resort.product.dto.ReservateRoomDTO;
import resort.product.dto.RoomDTO;

public interface RoomService {

	// 객실 전체 검색
	public List<RoomDTO> getRoomAll();
	
	// 예약된 객실 제외한 객실을 찾는 select
	public List<RoomDTO> reservateRoom(ReservateRoomDTO resRdto);
	
}
