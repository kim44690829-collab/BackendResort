package resort.product.dto;

import lombok.Data;

@Data
public class RoomMergeDTO {
	private int r_code;  //객실코드(PK)
	private int h_code;  //호텔코드(FK)
	private String roomName;  //객실이름
	private int price;  //가격
	private int score;  //평균별점
	private int maxOccupancy;  //최대 투숙 인원수
	private String r_img;  //이미지
	private String hotelName; //호텔이름
}
