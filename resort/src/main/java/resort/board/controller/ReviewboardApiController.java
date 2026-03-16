package resort.board.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import resort.board.dto.ScoreDTO;
import resort.board.service.ReviewboardService;
import resort.handler.PageHandler;
import resort.product.dto.HotelDTO;

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
		System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@" + redto.getRe_code());
		return reviewboardservice.reviewAdd(redto);
	}
	
	
	// =========== 2026-02-26 수정부분 JHJ ==============
	
	@GetMapping("/board/reviewlist")
	public Map<String, Object> reviewList(
			@RequestParam(value="searchType", required = false ) String searchType,
			@RequestParam(value="searchKeyword", required = false) String searchKeyword,
			@RequestParam(value="page",defaultValue="1") int page, // 초기 페이지
			@RequestParam(value="pageSize",defaultValue="10") int pageSize // 한 페이지당 보여줄 목록의 수
			){
		System.out.println("ReviewboardApiController : reviewList(@-@) 메서드 확인");
		
		int totalCnt ;
		
		if(searchType != null && !searchKeyword.trim().isEmpty()) {
			totalCnt=reviewboardservice.getReviewSearchCount(searchType, searchKeyword);
		}else {
			totalCnt=reviewboardservice.getAllReviewcount();
		}
		
		
		// 페이지 핸들러 인스터스화
		PageHandler ph = new PageHandler(totalCnt, page, pageSize);
		
		//List<MemberDTO>list = memberservice.getPagelist(ph.getStartRow(), pageSize);
		List<ReviewboardDTO>list;
		
		if(searchType != null && !searchKeyword.trim().isEmpty()) {
			// service 에서 SearchBoard
			list = reviewboardservice.getSearchPageReviewList(searchType, searchKeyword, ph.getStartRow(), pageSize);
		}else {
			list = reviewboardservice.getPageReviewlist(ph.getStartRow(), pageSize);
		}
		
		
		
		Map<String, Object> result = new HashMap<>();
		
		result.put("list", list);
		result.put("ph", ph);
		result.put("searchType",searchType);
		result.put("searchKeyword",searchKeyword);
		return result;
	}
	
	
	
	@DeleteMapping("/board/deletereview")
	public int deleteReview(@RequestParam("rb_code") int rb_code) {
		System.out.println("ReviewboardApiController : deleteReview(@-@) 메서드 확인");
		return reviewboardservice.deleteReview(rb_code);
	}
	
	// 리뷰  UPDATE
	@PutMapping("/board/reviewMod")
	public int reviewMod(@RequestParam("re_code") int re_code, @RequestParam("rb_score") int rb_score ) {
		System.out.println("ReviewboardApiController : reviewAdd() 메서드 확인");
		System.out.println("??????????????" + re_code);
		System.out.println("!!!!!!!!!!!!!!" + rb_score);
		return reviewboardservice.reviewMod(re_code, rb_score);
	}
	
	// 호텔별 각 점수들 갯수
	@GetMapping("/board/reviewData")
	public ScoreDTO hotelScoreCount(@RequestParam("h_code") int h_code) {
		System.out.println("ReviewboardApiController : hotelScoreCount() 메서드 확인");
		System.out.println("@@@@@@@@@@@@@@@@@@@#############" + h_code);
		return reviewboardservice.hotelScoreCount(h_code);
	}
	// 객실별 평점
	@GetMapping("/board/reviewRoom")
	public List<RatingDTO> roomReview(@RequestParam("h_code") int h_code){
		System.out.println("ReviewboardApiController : roomReview() 메서드 확인");
		return reviewboardservice.roomReview(h_code);
	}
}
