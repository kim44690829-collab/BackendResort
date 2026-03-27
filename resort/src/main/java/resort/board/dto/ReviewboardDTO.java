package resort.board.dto;

import java.util.Date;

import lombok.Data;

@Data
public class ReviewboardDTO{
	// 리뷰보드 DTO
	private int rb_code ; //리뷰보드코드
	private int rb_score; // 별점
	private Date rb_date; //작성일자
	private int m_code; //회원코드
	private int r_code; //객실코드
	private int re_code; // 예약코드
	private int reviewCount; //리뷰수
	private double scoreAvg;
	private int minPrice;
	private String m_nickName; // 리뷰 작성자명
	private String roomName; //리뷰한 방 이름
	private String hotelName;// 리뷰한 호텔의 이름
	
}
