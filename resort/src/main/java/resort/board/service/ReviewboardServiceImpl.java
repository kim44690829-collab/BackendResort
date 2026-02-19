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
	public List<HotelAvgDTO> getHotelRatingAvgAll() {
		System.out.println("ReviewboardServiceImpl : getRatingAvgAll() 메서드 확인");
		return reviewboardmapper.getHotelRatingAvgAll();
	}
}
