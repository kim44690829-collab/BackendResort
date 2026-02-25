package resort.product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import resort.product.dto.ReservateRoomDTO;
import resort.product.dto.RoomDTO;
import resort.product.mapper.RoomMapper;

@Service
public class RoomServiceImpl implements RoomService {

	@Autowired
	RoomMapper roomMapper;
	
	@Override
	public List<RoomDTO> getRoomAll() {
		System.out.println("RoomServiceImpl : getRoomAll() 메서드 확인");
		return roomMapper.getRoomAll();
	}
	
	// ============ 2026-02-23 수정사항 ================
	
	@Override
	public int getAllRoomcount() {
		System.out.println("RoomServiceImpl : getAllRoomcount() 메서드 확인");
		return roomMapper.getAllRoomcount();
	}

	@Override
	public List<RoomDTO> getRoomPagelist(int startRow, int pageSize) {
		System.out.println("RoomServiceImpl : getRoomPagelist() 메서드 확인");
		return roomMapper.getRoomPagelist(startRow, pageSize);
	}

	@Override
	public int getSearchRoomCount(String searchType, String searchKeyword) {
		System.out.println("RoomServiceImpl : getSearchRoomCount() 메서드 확인");
		return roomMapper.getSearchRoomCount(searchType, searchKeyword);
	}

	@Override
	public List<RoomDTO> getSearchRoomPageList(String searchType, String searchKeyword, int startRow, int pageSize) {
		System.out.println("RoomServiceImpl : getSearchRoomPageList() 메서드 확인");
		return roomMapper.getSearchRoomPageList(searchType, searchKeyword, startRow, pageSize);
	}
	
	// =========== 2026-02-24 수정부분 JHJ =========
	@Override
	public void insertRoom(RoomDTO rdto) {
		System.out.println("RoomServiceImpl : insertRoom() 메서드 확인");
		roomMapper.insertRoom(rdto);
	}

	
	
	public List<RoomDTO> reservateRoom(ReservateRoomDTO resRdto) {
		System.out.println("RoomServiceImpl : getRoomAll() 메서드 확인");
		return roomMapper.reservateRoom(resRdto);
	}

	// =========== 2026-02-25 수정부분 JHJ =========
	@Override
	public int updateRoom(RoomDTO rdto) {
		System.out.println("RoomServiceImpl : updateRoom() 메서드 확인");
		return roomMapper.updateRoom(rdto);
	}

}
