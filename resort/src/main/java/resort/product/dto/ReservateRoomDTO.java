package resort.product.dto;

import lombok.Data;

@Data
public class ReservateRoomDTO {

	private int h_code; // 호텔코드(FK)
	private int maxOccupancy;  //최대 투숙 인원수
	private String check_in_date; //예약시작일
	private String check_out_date; //예약종료일
	
}
