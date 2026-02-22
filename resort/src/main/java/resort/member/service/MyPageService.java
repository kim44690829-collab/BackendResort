package resort.member.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import resort.member.dto.MyPageDTO;

public interface MyPageService {
	//회원의 예약정보, 쿠폰정보, 회원정보 가져오기
	public List<MyPageDTO> getMemberinfo(String m_email);
	
	//예약취소
	public boolean insertCancel(int re_code);
}
