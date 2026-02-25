package resort.product.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import resort.member.dto.MemberDTO;
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
	
	
	//=========2026-02-23 수정 JHJ==========
	
	// 전체 호텔정보의 개수를 구하는 매소드
	public int getAllHotelcount();
	
	// 전체 회원정보의 시작(startRow), 몇개의 행 (pageSize)만큼 보는 메소드
	public List<HotelDTO> getPageHotellist(@Param("startRow")int startRow,@Param("pageSize")int pageSize);
	
	//검색페이징에 필요한 메서드
	//searchType, searchKeyword에 해당하는 검색된 개수를 반환하는 메소드
	public int getHotelSearchCount(@Param("searchType") String searchType,
			@Param("searchKeyword") String searchKeyword);
	
	// searchType, searchKeyword, startRow, pageSize
	// => limit startRow부터, pageSize개 만큼 한 화면에 보여질 행의 개수
	public List<HotelDTO> getSearchPageHotelList(
			@Param("searchType") String searchType,
			@Param("searchKeyword") String searchKeyword,
			@Param("startRow") int startRow,
			@Param("pageSize") int pageSize
			);
	
	
	// =============== 2026-02-24 수정부분 JHJ =====================
	public void insertHotel(HotelDTO hdto);
	
	// =============== 2026-02-25 수정부분 JHJ =====================
	
	public List<HotelDTO> getonlyHotelAll();
	
	public int updateHotel(HotelDTO hdto);
	
	
	
	
	
	
	
	
	
	
	
	

}
