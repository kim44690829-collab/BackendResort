package resort.reservation.dto;

import java.util.Date;

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
	
	public String getHotelName() {
		return hotelName;
	}
	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}
	public String getRoomName() {
		return roomName;
	}
	public void setRoomName(String roomName) {
		this.roomName = roomName;
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
	public int getCoupon_used() {
		return coupon_used;
	}
	public void setCoupon_used(int coupon_used) {
		this.coupon_used = coupon_used;
	}
	public int getFinal_price() {
		return final_price;
	}
	public void setFinal_price(int final_price) {
		this.final_price = final_price;
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
	public String getReservation_no() {
		return reservation_no;
	}
	public void setReservation_no(String reservation_no) {
		this.reservation_no = reservation_no;
	}
	
	
}	
