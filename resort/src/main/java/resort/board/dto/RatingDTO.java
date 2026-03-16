package resort.board.dto;

import lombok.Data;

@Data
public class RatingDTO {

	private int h_code;
	private int r_code;
	private int rb_score;
	private String roomName;
	private double scoreAvg;

}
