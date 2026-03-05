package resort.board.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import resort.board.dto.HotelAvgDTO;
import resort.board.dto.RatingDTO;
import resort.board.dto.ReviewboardDTO;

public interface ReviewboardService {
	//리뷰 전체 검색
	public List<ReviewboardDTO> getReviewAll();
	
	// 객실별 별점 검색
	public List<RatingDTO> getRatingAll();
	
	// 객실별 별점 평균
	public List<RatingDTO> getRatingAvgAll();
	
	//(상세페이지 호텔과) 같은지역의 추천호텔의 별점평균
	public List<ReviewboardDTO> getRecommReviewAvg(int hotelcode);
	// 호텔별 별점 평균
	public List<HotelAvgDTO> getHotelRatingAvgAll();
	
	// 리뷰 insert
	public int reviewAdd(ReviewboardDTO redto);
	
	// ========== 2026-02-26 수정부분 JHJ ===============
	// 전체 리뷰정보의 개수를 구하는 매소드
	public int getAllReviewcount();
	
	// 전체 리뷰정보의 시작(startRow), 몇개의 행 (pageSize)만큼 보는 메소드
	public List<ReviewboardDTO> getPageReviewlist(@Param("startRow")int startRow,@Param("pageSize")int pageSize);
	
	//검색페이징에 필요한 메서드
	//searchType, searchKeyword에 해당하는 검색된 개수를 반환하는 메소드
	public int getReviewSearchCount(@Param("searchType") String searchType,
			@Param("searchKeyword") String searchKeyword);
	
	// searchType, searchKeyword, startRow, pageSize
	// => limit startRow부터, pageSize개 만큼 한 화면에 보여질 행의 개수
	public List<ReviewboardDTO> getSearchPageReviewList(
		@Param("searchType") String searchType,
		@Param("searchKeyword") String searchKeyword,
		@Param("startRow") int startRow,
		@Param("pageSize") int pageSize
	);
	
	public int deleteReview(int rb_code);
	// 리뷰 update
	public int reviewMod(int re_code, int rb_score);
}
