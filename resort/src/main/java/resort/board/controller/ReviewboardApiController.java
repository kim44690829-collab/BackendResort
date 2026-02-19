package resort.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import resort.board.dto.HotelAvgDTO;
import resort.board.dto.RatingDTO;
import resort.board.dto.ReviewboardDTO;
import resort.board.service.ReviewboardService;

@RestController
@RequestMapping("/api")
public class ReviewboardApiController {
	@Autowired
	ReviewboardService reviewboardservice;
	
	//리뷰 전체 정보 보내는 컨트롤러
	@GetMapping("/board/review")
	public List<ReviewboardDTO> allReview(){
		System.out.println("ReviewboardApiController : allReview() 메서드 확인");
		return reviewboardservice.getReviewAll();
	}
	
	@GetMapping("/board/rating")
	public List<RatingDTO> getRatingAll(){
		System.out.println("ReviewboardApiController : getRatingAll() 메서드 확인");
		return reviewboardservice.getRatingAll();
	}
	
	@GetMapping("/board/ratingAvg")
	public List<RatingDTO> getRatingAvgAll(){
		System.out.println("ReviewboardApiController : getRatingAvgAll() 메서드 확인");
		return reviewboardservice.getRatingAvgAll();
	}
	
	@GetMapping("/board/hotelRatingAvg")
	public List<HotelAvgDTO> getHotelRatingAvgAll(){
		System.out.println("ReviewboardApiController : getRatingAvgAll() 메서드 확인");
		return reviewboardservice.getHotelRatingAvgAll();
	}
}
