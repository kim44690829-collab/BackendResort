package resort.member.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import resort.member.dto.MemberDTO;

@Mapper
public interface MemberMapper {
	//회원 가입 추가하는 추상메소드
	public int insertMember(MemberDTO mdto);
	//회원가입 중복체크(이미 가입된 전화번호로 회원가입하면 실패출력)
	public boolean isMemberPhone(String m_phone);
	//회원가입 중복체크(이미 가입된 이메일로 회원가입하면 실패출력)
	public boolean isMemberEmail(String m_email);
	//회원가입 중복체크(이미 가입된 닉네임으로 회원가입하면 실패출력)
	public boolean isMemberNickname(String m_nickName);
	//회원 전체 목록 검색 쿼리
	public List<MemberDTO> allSelectMember();
	//개인 한 사람의 정보를 검색하는 메소드
	public MemberDTO oneSelectMember(String m_email);
	//개인 한사람의 패스워드 리턴하는 쿼리
	public String getPass(String m_email);
	//개인 한사람의 정보를 수정하는 쿼리
	public int updateMember(MemberDTO mdto);
	// 한사람 개인의 정보를 삭제하는 메소드 작성
	public int deleteMember(MemberDTO mdto);
	
	
	//=========2026-02-20 수정============
	
	// 전체 회원정보의 개수를 구하는 매소드
	public int getAllcount();
	
	// 전체 회원정보의 시작(startRow), 몇개의 행 (pageSize)만큼 보는 메소드
	public List<MemberDTO> getPagelist(@Param("startRow")int startRow,@Param("pageSize")int pageSize);
}
