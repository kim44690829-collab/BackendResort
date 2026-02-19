package resort.product.controller;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import resort.product.dto.HotelDTO;
import resort.product.service.HotelService;

@RestController
@RequestMapping("/api")
public class HotelApiController {

	@Autowired
	HotelService hotelService;
	
	// 호텔 전체 정보 보내는 컨트롤러
	@GetMapping("/hotel/context")
	public List<HotelDTO> allHotel(){
		System.out.println("HotelApiController : allHotel() 메서드 확인");
		return hotelService.getHotelAll();
	}
	
	// (상세페이지 호텔과) 같은지역의 추천호텔 컨트롤러
	@GetMapping("/hotel/recomm")
	public List<HotelDTO> getRecommHotel(
			@RequestParam("hotelcity") String hotelcity,
			@RequestParam("hotelcode") int hotelcode
			){
		System.out.println("HotelApiController : getRecommHotel() 메서드 확인");
		return hotelService.getRecommHotel(hotelcity,hotelcode);
	}

	
	
}
