package resort.board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import resort.board.dto.HotelAvgDTO;
import resort.board.dto.RatingDTO;
import resort.board.dto.ReviewboardDTO;
import resort.board.mapper.ReviewboardMapper;

@Service
public class ReviewboardServiceImpl implements ReviewboardService{
	@Autowired
	ReviewboardMapper reviewboardmapper;

	@Override
	public List<ReviewboardDTO> getReviewAll() {
		System.out.println("ReviewboardServiceImpl : getReviewAll() 메서드 확인");
		return reviewboardmapper.getReviewAll();
	}

	@Override
	public List<RatingDTO> getRatingAll() {
		System.out.println("ReviewboardServiceImpl : getRatingAll() 메서드 확인");
		return reviewboardmapper.getRatingAll();
	}

	@Override
	public List<RatingDTO> getRatingAvgAll() {
		System.out.println("ReviewboardServiceImpl : getRatingAvgAll() 메서드 확인");
		return reviewboardmapper.getRatingAvgAll();
	}

	@Override
	public List<ReviewboardDTO> getRecommReviewAvg(int hotelcode) {
		System.out.println("ReviewboardServiceImpl : getRecommReviewAvg() 메서드 확인");
		return reviewboardmapper.getRecommReviewAvg(hotelcode);
	}
	
	@Override
	public List<HotelAvgDTO> getHotelRatingAvgAll() {
		System.out.println("ReviewboardServiceImpl : getRatingAvgAll() 메서드 확인");
		return reviewboardmapper.getHotelRatingAvgAll();
	}

	@Override
	public int reviewAdd(ReviewboardDTO redto) {
		System.out.println("ReviewboardServiceImpl : reviewAdd() 메서드 확인");
		return reviewboardmapper.reviewAdd(redto);
	}

	// ========== 2026-02-26 수정부분 ===========
	@Override
	public int getAllReviewcount() {
		System.out.println("ReviewboardServiceImpl : getAllReviewcount(￣∇￣) 메서드 확인");
		return reviewboardmapper.getAllReviewcount();
	}

	@Override
	public List<ReviewboardDTO> getPageReviewlist(int startRow, int pageSize) {
		System.out.println("ReviewboardServiceImpl : getPageReviewlist(￣∇￣) 메서드 확인");
		return reviewboardmapper.getPageReviewlist(startRow, pageSize);
	}

	@Override
	public int getReviewSearchCount(String searchType, String searchKeyword) {
		System.out.println("ReviewboardServiceImpl : getReviewSearchCount(￣∇￣) 메서드 확인");
		return reviewboardmapper.getReviewSearchCount(searchType, searchKeyword);
	}

	@Override
	public List<ReviewboardDTO> getSearchPageReviewList(String searchType, String searchKeyword, int startRow,
			int pageSize) {
		System.out.println("ReviewboardServiceImpl : getSearchPageReviewList(￣∇￣) 메서드 확인");
		return reviewboardmapper.getSearchPageReviewList(searchType, searchKeyword, startRow, pageSize);
	}

	@Override
	public int deleteReview(int rb_code) {
		System.out.println("ReviewboardServiceImpl : deleteReview(￣∇￣) 메서드 확인");
		return reviewboardmapper.deleteReview(rb_code);
	}
	
	@Override
	public int reviewMod(int re_code, int rb_score) {
		System.out.println("ReviewboardServiceImpl : reviewMod() 메서드 확인");
		return reviewboardmapper.reviewMod(re_code, rb_score);
	}
}
