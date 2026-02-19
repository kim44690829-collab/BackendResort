package resort.board.dto;

public class RatingDTO {

	private int h_code;
	private int r_code;
	private int rb_score;
	private double scoreAvg;
	
	public double getScoreAvg() {
		return scoreAvg;
	}
	public void setScoreAvg(double scoreAvg) {
		this.scoreAvg = scoreAvg;
	}
	public int getH_code() {
		return h_code;
	}
	public void setH_code(int h_code) {
		this.h_code = h_code;
	}
	public int getR_code() {
		return r_code;
	}
	public void setR_code(int r_code) {
		this.r_code = r_code;
	}
	public int getRb_score() {
		return rb_score;
	}
	public void setRb_score(int rb_score) {
		this.rb_score = rb_score;
	}

	
	
}
