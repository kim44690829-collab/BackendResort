package resort.member.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import resort.member.dto.MyPageDTO;

@Mapper
public interface MyPageMapper {
	//회원의 예약정보, 쿠폰정보, 회원정보 가져오기
	public List<MyPageDTO> getMemberinfo(@Param("m_email") String m_email);
	
	//예약취소
	public int insertCancel(@Param("re_code") int re_code);
}
