package resort.reservation.dto;

public class ResResponseDTO {
	
	private boolean success;
    private int result;              // 1 or 0
    private String reservation_no;   // 성공 시만

    public ResResponseDTO(boolean success, int result, String reservation_no) {
    	this.success = success;
    	this.result = result;
    	this.reservation_no = reservation_no;
    }

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public int getResult() {
		return result;
	}

	public void setResult(int result) {
		this.result = result;
	}

	public String getReservation_no() {
		return reservation_no;
	}

	public void setReservation_no(String reservation_no) {
		this.reservation_no = reservation_no;
	};
    
    
    
}
