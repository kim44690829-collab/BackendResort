package resort.product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
