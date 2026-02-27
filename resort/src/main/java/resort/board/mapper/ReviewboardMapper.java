package resort.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import resort.board.dto.HotelAvgDTO;
import resort.board.dto.RatingDTO;
import resort.board.dto.ReviewboardDTO;

@Mapper
public interface ReviewboardMapper {
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
	
	// 리뷰 update
	public int reviewMod(@Param("rb_code") int rb_code, @Param("rb_score") int rb_score);
	
}
