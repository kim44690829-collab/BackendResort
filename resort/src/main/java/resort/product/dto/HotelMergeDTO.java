package resort.product.dto;

import java.util.Date;

public class HotelMergeDTO {
	private int h_code; // 호텔코드(PK)
    private String hotelName; // 호텔이름
    private String country; // 국가
    private String city; // 도시
    private String type; // 호텔유형
    private String h_address; // 주소
    private int discount; // 이벤트 여부
    private String h_Img; // 메인이미지
    private String h_s_Img1; // 서브이미지1
    private String h_s_Img2; // 서브이미지2
    private String h_s_Img3; // 서브이미지3
    private String h_s_Img4; // 서브이미지4
    private String startDate; // 예약시작일
    private String endDate; // 예약종료일
    private String roomservice; // 객내시설
    private String publicservice; // 공용시설
    private String otherservice; // 기타시설
    private int r_code;  //객실코드(PK)
	private String roomName;  //객실이름
	private int price;  //가격
	private int maxOccupancy;  //최대 투숙 인원수
	private int rb_score; // 별점
	// ---------------------------------- 별칭(그룹 묶을 시)
	private int roomAvgScore;  //객실평균별점
	private int hotelAvgScore;  //호텔평균별점
	private int hotelPrice; // 호텔가격(객실별 최소가)
	private int roomReviewCount; // 객실별 평가 인원수
	private int hotelReviewCount; // 호텔 전체 평가 인원수
	private int hotelMaxOccupancy; // 호텔별 최대 인원수
	private int hotelMinOccupancy; // 호텔별 최소 인원수
	
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
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getH_address() {
		return h_address;
	}
	public void setH_address(String h_address) {
		this.h_address = h_address;
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
	public String getH_s_Img1() {
		return h_s_Img1;
	}
	public void setH_s_Img1(String h_s_Img1) {
		this.h_s_Img1 = h_s_Img1;
	}
	public String getH_s_Img2() {
		return h_s_Img2;
	}
	public void setH_s_Img2(String h_s_Img2) {
		this.h_s_Img2 = h_s_Img2;
	}
	public String getH_s_Img3() {
		return h_s_Img3;
	}
	public void setH_s_Img3(String h_s_Img3) {
		this.h_s_Img3 = h_s_Img3;
	}
	public String getH_s_Img4() {
		return h_s_Img4;
	}
	public void setH_s_Img4(String h_s_Img4) {
		this.h_s_Img4 = h_s_Img4;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getRoomservice() {
		return roomservice;
	}
	public void setRoomservice(String roomservice) {
		this.roomservice = roomservice;
	}
	public String getPublicservice() {
		return publicservice;
	}
	public void setPublicservice(String publicservice) {
		this.publicservice = publicservice;
	}
	public String getOtherservice() {
		return otherservice;
	}
	public void setOtherservice(String otherservice) {
		this.otherservice = otherservice;
	}
	public int getR_code() {
		return r_code;
	}
	public void setR_code(int r_code) {
		this.r_code = r_code;
	}
	public String getRoomName() {
		return roomName;
	}
	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public int getMaxOccupancy() {
		return maxOccupancy;
	}
	public void setMaxOccupancy(int maxOccupancy) {
		this.maxOccupancy = maxOccupancy;
	}
	public int getRb_score() {
		return rb_score;
	}
	public void setRb_score(int rb_score) {
		this.rb_score = rb_score;
	}
	public int getRoomAvgScore() {
		return roomAvgScore;
	}
	public void setRoomAvgScore(int roomAvgScore) {
		this.roomAvgScore = roomAvgScore;
	}
	public int getHotelAvgScore() {
		return hotelAvgScore;
	}
	public void setHotelAvgScore(int hotelAvgScore) {
		this.hotelAvgScore = hotelAvgScore;
	}
	public int getHotelPrice() {
		return hotelPrice;
	}
	public void setHotelPrice(int hotelPrice) {
		this.hotelPrice = hotelPrice;
	}
	public int getRoomReviewCount() {
		return roomReviewCount;
	}
	public void setRoomReviewCount(int roomReviewCount) {
		this.roomReviewCount = roomReviewCount;
	}
	public int getHotelReviewCount() {
		return hotelReviewCount;
	}
	public void setHotelReviewCount(int hotelReviewCount) {
		this.hotelReviewCount = hotelReviewCount;
	}
	public int getHotelMaxOccupancy() {
		return hotelMaxOccupancy;
	}
	public void setHotelMaxOccupancy(int hotelMaxOccupancy) {
		this.hotelMaxOccupancy = hotelMaxOccupancy;
	}
	public int getHotelMinOccupancy() {
		return hotelMinOccupancy;
	}
	public void setHotelMinOccupancy(int hotelMinOccupancy) {
		this.hotelMinOccupancy = hotelMinOccupancy;
	}
	
	
	
}
