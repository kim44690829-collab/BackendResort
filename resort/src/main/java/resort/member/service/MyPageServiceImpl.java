package resort.member.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import resort.member.dto.MyPageDTO;
import resort.member.mapper.MyPageMapper;

@Service
public class MyPageServiceImpl implements MyPageService {
	
	@Autowired
	MyPageMapper mypagemapper;

	//회원의 예약정보, 쿠폰정보, 회원정보 가져오기
	@Override
	public List<MyPageDTO> getMemberinfo(String m_email) {
		System.out.println("MyPageServiceImpl : getMemberinfo() 메서드 확인");
		return mypagemapper.getMemberinfo(m_email);
	}

	//예약취소
	@Override
	public boolean insertCancel(int re_code) {
		System.out.println("MyPageServiceImpl : insertCancel() 메서드 확인");
		
		int result = mypagemapper.insertCancel(re_code);
		
		if(result > 0) {
			System.out.println("취소 성공");
			return result > 0;
		}else {
			System.out.println("취소 실패");
			return false;			
		}
	}
	

}
