package resort.product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import resort.product.dto.HotelDTO;
import resort.product.mapper.HotelMapper;

@Service
public class HotelServiceImpl implements HotelService {

	@Autowired
	HotelMapper hotelMapper;
	
	@Override
	public List<HotelDTO> getHotelAll() {
		System.out.println("HotelServiceImpl : getHotelAll() 메서드 확인");
		return hotelMapper.getHotelAll();
	}

}
