package resort.member.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import resort.member.dto.MemberDTO;

public interface MemberService {
	//회원 가입 추가하는 추상메소드
	public int insertMember(MemberDTO mdto);
	//회원 전체 목록 검색 쿼리
	public List<MemberDTO> allSelectMember();
	//개인 한 사람의 정보를 검색하는 메소드
	public MemberDTO oneSelectMember(String m_email);
	//개인 한사람의 정보를 수정하는 쿼리
	public boolean updateMember(MemberDTO mdto);
	// 한사람 개인의 정보를 삭제하는 메소드 작성
	public boolean deleteMember(String m_email);
}
