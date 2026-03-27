package resort.member.dto;

import java.util.Date;

import lombok.Data;

@Data
public class MyPageDTO {
	private int re_code; //예약코드 
	private int m_code; //회원코드
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
	
	private int h_code; // 호텔코드(PK)
  	private String hotelName; // 호텔이름
	private int discount; // 이벤트 여부
	private String h_Img; // 메인이미지
    private String country; // 국가
    private String city; // 도시
    private String type; // 호텔유형
	
	private String roomName;  //객실이름

	private String m_email;  //이메일
	private String m_pw;  //비밀번호
	private String m_phone;  //전화번호
	private Date m_birth;  //생년월일
	private int m_gender;  //성별
	private String m_nickName;  //닉네임
	private int m_coupon;  //쿠폰
	private Date m_regDate;  //가입일
	
	private int rb_code; // 리뷰보드코드
	private int rb_score; // 별점
	

	
}
