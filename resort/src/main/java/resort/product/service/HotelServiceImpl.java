package resort.product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import resort.product.dto.HotelDTO;
import resort.product.dto.HotelMergeDTO;
import resort.product.dto.HotelPriceDTO;
import resort.product.dto.HotelRatingDTO;
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

	@Override
	public List<HotelDTO> getRecommHotel(String hotelcity,int hotelcode) {
		System.out.println("HotelServiceImpl : getRecommHotel() 메서드 확인");
		return hotelMapper.getRecommHotel(hotelcity,hotelcode);
	}

	public List<HotelPriceDTO> getHotelPrice() {
		System.out.println("HotelServiceImpl : getHotelPrice(^^) 메서드 확인");
		return hotelMapper.getHotelPrice();
	}

	@Override
	public List<HotelRatingDTO> getHotelRating() {
		System.out.println("HotelServiceImpl : getHotelRating(^^) 메서드 확인");
		return hotelMapper.getHotelRating();
	}

	@Override
	public List<HotelMergeDTO> getHotelMerge() {
		System.out.println("HotelServiceImpl : getHotelMerge(^^) 메서드 확인");
		return hotelMapper.getHotelMerge();
	}
	
	// ================2026-02-23 수정 부분 JHJ =================
	@Override
	public int getAllHotelcount() {
		System.out.println("HotelServiceImpl : getAllHotelcount(^^) 메서드 확인");
		return hotelMapper.getAllHotelcount();
	}

	@Override
	public List<HotelDTO> getPageHotellist(int startRow, int pageSize) {
		System.out.println("HotelServiceImpl : getPageHotellist(^^) 메서드 확인");
		return hotelMapper.getPageHotellist(startRow, pageSize);
	}

	@Override
	public int getHotelSearchCount(String searchType, String searchKeyword) {
		System.out.println("HotelServiceImpl : getHotelSearchCount(^^) 메서드 확인");
		return hotelMapper.getHotelSearchCount(searchType, searchKeyword);
	}

	@Override
	public List<HotelDTO> getSearchPageHotelList(String searchType, String searchKeyword, int startRow, int pageSize) {
		System.out.println("HotelServiceImpl : getSearchPageHotelList(^^) 메서드 확인");
		return hotelMapper.getSearchPageHotelList(searchType, searchKeyword, startRow, pageSize);
	}
	
	// ================2026-02-24 수정 부분 JHJ =================
	@Override
	public void insertHotel(HotelDTO hdto) {
		System.out.println("HotelServiceImpl : insertHotel(^o^) 메서드 확인");
		hotelMapper.insertHotel(hdto);
		
	}

	@Override
	public List<HotelDTO> getonlyHotelAll() {
		System.out.println("HotelServiceImpl : getonlyHotelAll(^o^) 메서드 확인");
		return hotelMapper.getonlyHotelAll();
	}

	@Override
	public int updateHotel(HotelDTO hdto) {
		System.out.println("HotelServiceImpl : getonlyHotelAll(^o^) 메서드 확인");
		return hotelMapper.updateHotel(hdto);
	}

}
