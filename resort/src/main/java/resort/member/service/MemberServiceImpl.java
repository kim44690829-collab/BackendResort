package resort.member.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import resort.member.dto.MemberDTO;
import resort.member.mapper.MemberMapper;

@Service
public class MemberServiceImpl implements MemberService {
	
	//id중복체크, 성공, 실패 상수변수 정의
	//회원가입의 중복을 확인하는 상수
	public final static int user_phone_already_exit = -1;//폰번호가 이미 존재하는지 유무
	public final static int user_email_already_exit = -2;//이메일이 이미 존재하는지 유무
	public final static int user_nickname_already_exit = -3;//닉네임이 이미 존재하는지 유무
	
	//회원가입의 성공여부를 확인하는 상수
	public final static int user_join_success = 1;
	//회원가입의 실패를 확인하는 상수
	public final static int user_join_fail = 0;
	
	// 비밀번호 찾기를 했을때 성공했을 때 상수
	public final static int user_pwMod_success = 1;
	// 비밀번호 찾기를 했을때 실패했을때 상수
	public final static int user_pwMod_fail = 0;
	
	@Autowired
	MemberMapper membermapper;
	
	
	@Autowired
	PasswordEncoder passwordEncoder;

	//회원 가입 추가
	@Override
	public int insertMember(MemberDTO mdto) {
		System.out.println("MemberServiceImpl : insertMember() 메서드 확인");
		
		//회원가입 중복체크 (true면 중복, false면 중복X)
		boolean isMemberPhone = membermapper.isMemberPhone(mdto.getM_phone());
		boolean isMemberEmail = membermapper.isMemberEmail(mdto.getM_email());
		boolean isMemberNickname = membermapper.isMemberNickname(mdto.getM_nickName());
		
		
		//회원가입 중복체크 통과했다면
		if(isMemberPhone == false && isMemberEmail == false && isMemberNickname == false) {
			//문자인pw를 암호화된 비밀번호로 변화해주는 코드
			String encodepw = passwordEncoder.encode(mdto.getM_pw());
			//암호화된 encodepw로 수정
			mdto.setM_pw(encodepw);
		
			//DB에 회원정보 추가
			int result = membermapper.insertMember(mdto);
			
			if(result > 0) {
				return user_join_success; //가입성공시 result =1;
			}else {
				return user_join_fail; //가입실패시 result =0;
			}
		}else if(isMemberPhone == true){
			//중복된 번호가 존재할때
			return user_phone_already_exit; //중복된 번호가 있으면 result = -1;
		}else if(isMemberEmail == true){
			//중복된 이메일이 존재할때
			return user_email_already_exit; //중복된 이메일이 있으면 result = -2;
		}else {
			//중복된 닉네임이 존재할때
			return user_nickname_already_exit; //중복된 닉네임이 있으면 result = -3;
		}
	}

	//회원 전체 목록 검색
	@Override
	public List<MemberDTO> allSelectMember() {
		System.out.println("MemberServiceImpl : allSelectMember() 메서드 확인");
		return membermapper.allSelectMember();
	}

	//개인 한 사람의 정보를 검색
	@Override
	public MemberDTO oneSelectMember(String m_email) {
		System.out.println("MemberServiceImpl : oneSelectMember() 메서드 확인");
		return membermapper.oneSelectMember(m_email);
	}
	
	@Override
	public MemberDTO getOneMember(int m_code) {
		System.out.println("MemberServiceImpl : getOneMember() 메서드 확인");
		return membermapper.getOneMember(m_code);
	}


	
	//개인 한사람의 정보를 수정
	@Override
	public boolean updateMember(MemberDTO mdto) {
		System.out.println("MemberServiceImpl : updateMember() 메서드 확인");
		
		//DB패스워드 조회
		String dbPass = membermapper.getPass(mdto.getM_email());
		//입력한 패스워드
		String inputPass = mdto.getPw_before();
		
		// 암호화하여 비교
	    if(passwordEncoder.matches(inputPass, dbPass)) {
	    	//내가 입력한 이전 패스워드가 기존 DB에 있던 패스워드랑 같을때
	    	
	    	//문자인pw를 암호화된 비밀번호로 변화해주는 코드
			String encodepw = passwordEncoder.encode(mdto.getM_pw());
			//암호화된 encodepw로 수정
			mdto.setM_pw(encodepw);	    	
	    	
	        return membermapper.updateMember(mdto) == 1;
	    } else {
	    	//내가 입력한 이전 패스워드가 기존 DB에 있던 패스워드랑 다를때
	        return false;
	    }
	
	}
	
	// 한사람 개인의 정보를 삭제하는 메소드 작성
	@Override
	public boolean deleteMember(MemberDTO mdto) {
		System.out.println("MemberServiceImpl : deleteMember() 메서드 확인");
		
		//DB패스워드 조회
		String dbPass = membermapper.getPass(mdto.getM_email());
		//입력한 패스워드
		String inputPass = mdto.getPw_before();
		
		// 암호화하여 비교
	    if(passwordEncoder.matches(inputPass, dbPass)) {
	    	//내가 입력한 패스워드가 DB에 있던 패스워드랑 같을때
	    	return membermapper.deleteMember(mdto) == 1;
	    } else {
	    	//내가 입력한 패스워드가 DB에 있던 패스워드랑 다를때
	        return false;
	    }
		
	}
	
	//로그인 메소드
	public MemberDTO loginConfirm(MemberDTO mdto) {
		System.out.println("MemberServiceImpl : loginConfirm() 메서드 확인");

		//DB에서 해당 id(이메일)의 회원정보 가져오기
		MemberDTO dbMember = membermapper.oneSelectMember(mdto.getM_email());
		
		//DB에서 꺼내온 회원정보의 비밀번호와 입력한 값이 일치하는지 확인
		if(dbMember != null && dbMember.getM_pw() != null) {
			//사용자 입력 비밀번호를 자동으로 복호화시켜 비교시킴
			if(passwordEncoder.matches(mdto.getM_pw(),dbMember.getM_pw())) {
				//로그인 성공한 경우
				return dbMember;
			}
		}
		return null; // 로그인 실패			
	}

	@Override
	public int getAllcount() {
		System.out.println("MemberServiceImpl : getAllcount(@-@) 메서드 확인");
		return membermapper.getAllcount();
	}

	@Override
	public List<MemberDTO> getPagelist(int startRow, int pageSize) {
		System.out.println("MemberServiceImpl : getPagelist(@-@) 메서드 확인");
		return membermapper.getPagelist(startRow, pageSize);
	}
	
	// ============= 2026-02-23 수정 ===============
	@Override
	public int getSearchCount(String searchType, String searchKeyword) {
		System.out.println("MemberServiceImpl : getSearchCount(@-@) 메서드 확인");
		return membermapper.getSearchCount(searchType, searchKeyword);
	}
	
	@Override
	public int couponMod(Integer m_code) {
		System.out.println("MemberServiceImpl : couponMod(@-@) 메서드 확인");
		return membermapper.couponMod(m_code);
	}

	@Override
	public MemberDTO getOneSelectMember(String m_nickName) {
		System.out.println("MemberServiceImpl : getOneSelectMember(@-@) 메서드 확인");
		return membermapper.getOneSelectMember(m_nickName);
	}

	@Override
	public List<MemberDTO> getSearchPageList(String searchType, String searchKeyword, int startRow, int pageSize) {
		System.out.println("MemberServiceImpl : getPagelist(@-@) 메서드 확인");
		return membermapper.getSearchPageList(searchType, searchKeyword, startRow, pageSize);
	}
	
	// =================== 2026-02-24 수정부분 ======================
	@Override
	public int adminUpdateMember(MemberDTO mdto) {
		System.out.println("MemberServiceImpl : getPagelist^(@-@)^ 메서드 확인");
		return membermapper.adminUpdateMember(mdto);
	}

	// 비밀번호 찾기 =================================================
	@Override
	public int pwFind(MemberDTO mdto) {

	    // 새 비번 암호화 먼저
	    mdto.setM_pw(passwordEncoder.encode(mdto.getM_pw()));
	    
	    System.out.println("이메일=[" + mdto.getM_email() + "]");
	    System.out.println("전화번호=[" + mdto.getM_phone() + "]");

	    // email+phone 조건으로 update
	    int updated = membermapper.pwFind(mdto);
	    System.out.println("updated@@@@@@@@@@@@@@@@@@@@@@@" + updated);

	    return (updated == 1) ? user_pwMod_success : user_pwMod_fail;
	}
		
	
	
}
