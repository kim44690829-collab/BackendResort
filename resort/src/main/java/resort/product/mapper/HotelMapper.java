package resort.product.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import resort.product.dto.HotelDTO;

@Mapper
public interface HotelMapper {

	// 호텔 전체 검색
	public List<HotelDTO> getHotelAll();
	
	//(상세페이지 호텔과) 같은지역의 추천호텔
	public List<HotelDTO> getRecommHotel(
			@Param("hotelcity") String hotelcity,
			@Param("hotelcode") int hotelcode
			);


}
