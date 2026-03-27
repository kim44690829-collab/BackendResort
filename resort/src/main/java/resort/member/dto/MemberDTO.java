package resort.member.dto;

import java.util.Date;

import lombok.Data;

@Data
public class MemberDTO {
	// 테이블
	private int m_code;  //회원코드(PK)
	private String m_email;  //이메일
	private String m_pw;  //비밀번호
	private String m_phone;  //전화번호
	private String m_birth;  //생년월일
	private int m_gender;  //성별
	private String m_nickName;  //닉네임
	private int m_coupon;  //쿠폰
	private String m_regDate;  //가입일
	private int currentCoupon;//쿠폰만료일
	private String pw_before; //이전 비밀번호
	private int m_is_deleted; // 탈퇴여부
	private String deleted_at; // 탈퇴일

}
