package resort.product.dto;

import lombok.Data;

@Data
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
    private String startDate; // 예약시작일
    private String endDate; // 예약종료일
    private String roomservice; // 객내시설
    private String publicservice; // 공용시설
    private String otherservice; // 기타시설
    private int minPrice;  //객실최저가격
    private int hotelMaxOccupancy; // 호텔별 최대 인원수
	
}
