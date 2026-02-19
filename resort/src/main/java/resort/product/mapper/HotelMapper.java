package resort.product.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import resort.product.dto.HotelDTO;
import resort.product.dto.HotelMergeDTO;
import resort.product.dto.HotelPriceDTO;
import resort.product.dto.HotelRatingDTO;

@Mapper
public interface HotelMapper {

	// 호텔 전체 검색
	public List<HotelDTO> getHotelAll();
	
	//(상세페이지 호텔과) 같은지역의 추천호텔
	public List<HotelDTO> getRecommHotel(
			@Param("hotelcity") String hotelcity,
			@Param("hotelcode") int hotelcode
			);

	// 호텔의 가격 출력
	public List<HotelPriceDTO> getHotelPrice();
	
	// 호텔 별점 출력
	public List<HotelRatingDTO> getHotelRating();
	
	// 호텔 정보 총합 출력
	public List<HotelMergeDTO> getHotelMerge();

}
