package resort.product.service;

import java.util.List;

import resort.product.dto.HotelDTO;

public interface HotelService {

	// 호텔 전체 검색
	public List<HotelDTO> getHotelAll();
	
	//(상세페이지 호텔과) 같은지역의 추천호텔
	public List<HotelDTO> getRecommHotel(String hotelcity,int hotelcode);
	
}
