package resort.member.dto;

import java.util.Date;

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
	
	private int h_code; // 호텔코드(PK)
  	private String hotelName; // 호텔이름
	private int discount; // 이벤트 여부
	private String h_Img; // 메인이미지
	
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
	
	public int getRe_code() {
		return re_code;
	}
	public void setRe_code(int re_code) {
		this.re_code = re_code;
	}
	public int getM_code() {
		return m_code;
	}
	public void setM_code(int m_code) {
		this.m_code = m_code;
	}
	public int getR_code() {
		return r_code;
	}
	public void setR_code(int r_code) {
		this.r_code = r_code;
	}
	public String getBooker_name() {
		return booker_name;
	}
	public void setBooker_name(String booker_name) {
		this.booker_name = booker_name;
	}
	public Date getReserved_at() {
		return reserved_at;
	}
	public void setReserved_at(Date reserved_at) {
		this.reserved_at = reserved_at;
	}
	public String getCheck_in_date() {
		return check_in_date;
	}
	public void setCheck_in_date(String check_in_date) {
		this.check_in_date = check_in_date;
	}
	public String getCheck_out_date() {
		return check_out_date;
	}
	public void setCheck_out_date(String check_out_date) {
		this.check_out_date = check_out_date;
	}
	public int getOriginal_price() {
		return original_price;
	}
	public void setOriginal_price(int original_price) {
		this.original_price = original_price;
	}
	public int getDiscount_rate() {
		return discount_rate;
	}
	public void setDiscount_rate(int discount_rate) {
		this.discount_rate = discount_rate;
	}
	public int getFinal_price() {
		return final_price;
	}
	public void setFinal_price(int final_price) {
		this.final_price = final_price;
	}
	public int getCancel() {
		return cancel;
	}
	public void setCancel(int cancel) {
		this.cancel = cancel;
	}
	public Date getCancel_date() {
		return cancel_date;
	}
	public void setCancel_date(Date cancel_date) {
		this.cancel_date = cancel_date;
	}
	public int getH_code() {
		return h_code;
	}
	public void setH_code(int h_code) {
		this.h_code = h_code;
	}
	public String getHotelName() {
		return hotelName;
	}
	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}
	public int getDiscount() {
		return discount;
	}
	public void setDiscount(int discount) {
		this.discount = discount;
	}
	public String getH_Img() {
		return h_Img;
	}
	public void setH_Img(String h_Img) {
		this.h_Img = h_Img;
	}
	public String getRoomName() {
		return roomName;
	}
	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}
	public String getM_email() {
		return m_email;
	}
	public void setM_email(String m_email) {
		this.m_email = m_email;
	}
	public String getM_pw() {
		return m_pw;
	}
	public void setM_pw(String m_pw) {
		this.m_pw = m_pw;
	}
	public String getM_phone() {
		return m_phone;
	}
	public void setM_phone(String m_phone) {
		this.m_phone = m_phone;
	}
	public Date getM_birth() {
		return m_birth;
	}
	public void setM_birth(Date m_birth) {
		this.m_birth = m_birth;
	}
	public int getM_gender() {
		return m_gender;
	}
	public void setM_gender(int m_gender) {
		this.m_gender = m_gender;
	}
	public String getM_nickName() {
		return m_nickName;
	}
	public void setM_nickName(String m_nickName) {
		this.m_nickName = m_nickName;
	}
	public int getM_coupon() {
		return m_coupon;
	}
	public void setM_coupon(int m_coupon) {
		this.m_coupon = m_coupon;
	}
	public Date getM_regDate() {
		return m_regDate;
	}
	public void setM_regDate(Date m_regDate) {
		this.m_regDate = m_regDate;
	}
	public int getRb_code() {
		return rb_code;
	}
	public void setRb_code(int rb_code) {
		this.rb_code = rb_code;
	}
	public int getRb_score() {
		return rb_score;
	}
	public void setRb_score(int rb_score) {
		this.rb_score = rb_score;
	}
	
	
	
		
	
}
