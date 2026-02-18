package resort.product.dto;

public class HotelPriceDTO {
	
	private int p_h_code; // 호텔코드(PK)
	private int p_h_price; // 호텔가격
	
	public int getP_h_code() {
		return p_h_code;
	}
	public void setP_h_code(int p_h_code) {
		this.p_h_code = p_h_code;
	}
	public int getP_h_price() {
		return p_h_price;
	}
	public void setP_h_price(int p_h_price) {
		this.p_h_price = p_h_price;
	}
	
}
