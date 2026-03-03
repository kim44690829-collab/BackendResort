package resort.member.dto;

import java.util.Date;

import lombok.Data;

@Data
public class GuestDTO {
	// 테이블
	private int g_code;  //비회원코드(PK)
	private String g_name ;  //이름
	private String g_phone;  //전화번호
	private Date g_birth;  //생년월일
	private int g_check; // 숙박완료여부
	
}
