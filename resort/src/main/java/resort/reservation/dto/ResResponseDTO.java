package resort.reservation.dto;

import lombok.Data;

@Data
public class ResResponseDTO {
	
	private boolean success;
    private int result;              // 1 or 0
    private String reservation_no;   // 성공 시만

    public ResResponseDTO(boolean success, int result, String reservation_no) {
    	this.success = success;
    	this.result = result;
    	this.reservation_no = reservation_no;
    }
    
    
}
