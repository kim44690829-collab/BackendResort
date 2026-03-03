package resort.member.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestParam;

import resort.member.dto.MemberDTO;

public interface MemberService {
	//회원 가입 추가하는 추상메소드
	public int insertMember(MemberDTO mdto);
	//회원 전체 목록 검색 쿼리
	public List<MemberDTO> allSelectMember();
	//개인 한 사람의 정보를 검색하는 메소드
	public MemberDTO oneSelectMember(String m_email);
	//개인 한 사람의 정보를 검색하는 메소드 - 예약 페이지용
	public MemberDTO getOneSelectMember(String m_nickName);
	//개인 한 사람의 정보를 검색하는 메소드
	public MemberDTO getOneMember(int m_code);
	//개인 한사람의 정보를 수정하는 쿼리
	public boolean updateMember(MemberDTO mdto);
	// 한사람 개인의 정보를 삭제하는 메소드 작성
	public boolean deleteMember(MemberDTO mdto);
	//로그인 메소드
	public MemberDTO loginConfirm(MemberDTO mdto);
	
	//=========2026-02-20 수정============
	
	// 전체 회원정보의 개수를 구하는 매소드
	public int getAllcount();
	// 전체 회원정보의 시작(startRow), 몇개의 행 (pageSize)만큼 보는 메소드
	public List<MemberDTO> getPagelist(@Param("startRow")int startRow,@Param("pageSize")int pageSize);
	
	//=========2026-02-23 수정 ==========
	//검색페이징에 필요한 메서드
	//searchType, searchKeyword에 해당하는 검색된 개수를 반환하는 메소드
	public int getSearchCount(@Param("searchType") String searchType,
			@Param("searchKeyword") String searchKeyword);
	
	// searchType, searchKeyword, startRow, pageSize
	// => limit startRow부터, pageSize개 만큼 한 화면에 보여질 행의 개수
	public List<MemberDTO> getSearchPageList(
			@Param("searchType") String searchType,
			@Param("searchKeyword") String searchKeyword,
			@Param("startRow") int startRow,
			@Param("pageSize") int pageSize
				);
	
	//=========== 2026-02-24 수정부분 ===============
	public int adminUpdateMember(MemberDTO mdto);
	
	// 쿠폰 사용한 회원 쿠폰수량 업데이트
	public int couponMod(Integer m_code );
	
	// 비밀번호 찾기
	public int pwFind(MemberDTO mdto);

}