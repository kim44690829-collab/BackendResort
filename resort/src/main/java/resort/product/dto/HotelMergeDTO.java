package resort.product.dto;

import java.util.Date;

import lombok.Data;

@Data
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
	private double hotelAvgScore;  //호텔평균별점
	private int hotelPrice; // 호텔가격(객실별 최소가)
	private int roomReviewCount; // 객실별 평가 인원수
	private int hotelReviewCount; // 호텔 전체 평가 인원수
	private int hotelMaxOccupancy; // 호텔별 최대 인원수
	private int hotelMinOccupancy; // 호텔별 최소 인원수
	
	
}
