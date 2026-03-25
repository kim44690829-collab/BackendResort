package resort.reservation.dto;

import java.util.Date;

import lombok.Data;

@Data
public class ResInfoDTO{
	
	private String hotelName; // 호텔이름
	private String roomName;  //객실이름
	private String check_in_date; //예약시작일
	private String check_out_date; //예약종료일
	private int original_price; //원가격
	private int discount_rate; //할인율
	private int coupon_used; // 쿠폰 사용 여부
	private int final_price; //할인 후 가격
	private String booker_name; //예약자명
	private Date reserved_at; //예약신청일
	private String reservation_no; // 예약 번호
	private String h_Img; // 호텔이미지
	private String city; // 나라
}	
