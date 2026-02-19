package resort.product.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import resort.product.dto.HotelDTO;
import resort.product.dto.HotelPriceDTO;
import resort.product.dto.HotelRatingDTO;
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
	
	@GetMapping("/hotel/hotelPrice")
	public  List<HotelPriceDTO> allHotelPrice(){
		System.out.println("HotelApiController : allHotelPrice(^^) 메서드 확인");
		return hotelService.getHotelPrice();
	}
	
	@GetMapping("/hotel/hotelRating")
	public  List<HotelRatingDTO> allHotelRating(){
		System.out.println("HotelApiController : allHotelRating(^^) 메서드 확인");
		return hotelService.getHotelRating();
	}
	
	@GetMapping("/hotel/price")
	public List<HotelPriceDTO> getHotelPrice() {
		System.out.println("HotelApiController : getHotelPrice() 메서드 확인");
		return hotelService.getHotelPrice();
	}
	
}
