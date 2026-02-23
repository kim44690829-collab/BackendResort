package resort.product.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import resort.product.dto.ReservateRoomDTO;
import resort.product.dto.RoomDTO;

@Mapper
public interface RoomMapper {

	// 객실 전체 검색
	public List<RoomDTO> getRoomAll();
	
	// 객실 최소가 검색
	public List<RoomDTO> getMinPrice();
	
	// 예약된 객실 제외한 객실을 찾는 select
	public List<RoomDTO> reservateRoom(ReservateRoomDTO resRdto);
}
