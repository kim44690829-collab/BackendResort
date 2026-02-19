package resort.product.dto;

import java.util.Date;

public class HotelDTO {

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
    private Date startDate; // 예약시작일
    private Date endDate; // 예약종료일
    private String roomservice; // 객내시설
    private String publicservice; // 공용시설
    private String otherservice; // 기타시설
    private int minPrice;  //객실최저가격
    
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
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
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
	public int getMinPrice() {
		return minPrice;
	}
	public void setMinPrice(int minPrice) {
		this.minPrice = minPrice;
	}
    
    
	
}
