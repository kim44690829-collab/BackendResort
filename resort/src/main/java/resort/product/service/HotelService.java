package resort.product.service;

import java.util.List;

import resort.product.dto.HotelDTO;
import resort.product.dto.HotelPriceDTO;

public interface HotelService {

	// 호텔 전체 검색
	public List<HotelDTO> getHotelAll();
	
	// 호텔 가격
	public List<HotelPriceDTO> getHotelPrice();
}
