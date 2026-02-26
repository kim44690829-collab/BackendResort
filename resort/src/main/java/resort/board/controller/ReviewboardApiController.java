package resort.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	//(상세페이지 호텔과) 같은지역의 추천호텔의 별점평균
	@GetMapping("/board/recomm")
	public List<ReviewboardDTO> getRecommReviewAvg(
			@RequestParam("hotelcode") int hotelcode
			){
		System.out.println("HotelApiController : getRecommReviewAvg() 메서드 확인");
		return reviewboardservice.getRecommReviewAvg(hotelcode);
	}
	
	@GetMapping("/board/hotelRatingAvg")
	public List<HotelAvgDTO> getHotelRatingAvgAll(){
		System.out.println("ReviewboardApiController : getRatingAvgAll() 메서드 확인");
		return reviewboardservice.getHotelRatingAvgAll();
	}
	
	// 리뷰 insert
	@PostMapping("/board/reviewSend")
	public int reviewAdd(@RequestBody ReviewboardDTO redto) {
		System.out.println("ReviewboardServiceImpl : reviewAdd() 메서드 확인");
		return reviewboardservice.reviewAdd(redto);
	}
	
	// 리뷰  UPDATE
	@PutMapping("/board/reviewMod")
	public int reviewMod(@RequestParam("rb_code") int rb_code, @RequestParam("rb_score") int rb_score ) {
		System.out.println("ReviewboardServiceImpl : reviewAdd() 메서드 확인");
		return reviewboardservice.reviewMod(rb_code, rb_score);
	}
}
