package resort.reservation.dto;

import java.util.Date;

import lombok.Data;

@Data
public class ReservationMergeDTO {
	private int re_code; //예약코드 
	private Integer m_code; //회원코드
	private Integer g_code; //비회원코드
	private int r_code; //객실코드
	private String booker_name; //예약자명
	private Date reserved_at; //예약신청일
	private String check_in_date; //예약시작일
	private String check_out_date; //예약종료일
	private int original_price; //원가격
	private int discount_rate; //할인율
	private int final_price; //할인 후 가격
	private int cancel; //취소여부
	private Date cancel_date; //취소일자
	private int review_status; // 예약 작성 여부
	private int coupon_used; // 쿠폰 사용 여부
	private String m_phone; // 회원전화번호
	private String g_phone; // 비회원전화번호	
	private String reservation_no; // 예약 번호
	private String roomName; // 객실이름
	private String hotelName; // 호텔이름
	private int g_check; // 회원의 탈퇴여부
}
