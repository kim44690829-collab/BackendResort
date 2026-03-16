package resort.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import resort.member.dto.GuestDTO;
import resort.member.mapper.GuestMapper;

@Service
public class GuestServiceImpl implements GuestService{

	@Autowired
	GuestMapper guestmapper;
	
	public final static int UPDATE_NOT_MATCHED = 0;
	
	public final static int UPDATE_SUCCESS = 1;
	
	public final static int MEMBER_NOT_FOUND = -1;
	
	public final static int MEMBER_FOUND = 1;
	
	@Override
	public int insertGuest(GuestDTO gdto) {
		System.out.println("GuestServiceImpl : insertGuest() 메서드 확인");
		guestmapper.insertGuest(gdto);
		return gdto.getG_code();
	}

	@Override
	public int guestChk(String reservation_no, String g_phone) {
		System.out.println("GuestServiceImpl : guestChk() 메서드 확인");
		return guestmapper.guestChk(reservation_no, g_phone);
	}

	@Override
	public GuestDTO selectResGuest(String reservation_no, String g_phone) {
		System.out.println("GuestServiceImpl : selectResGuest() 메서드 확인");
		return guestmapper.selectResGuest(reservation_no, g_phone);
	}

	@Override
	public int guestChkPro(String reservation_no, String g_phone) {
		System.out.println("GuestServiceImpl : guestChkPro() 메서드 확인");
		
		GuestDTO gdto = guestmapper.selectResGuest(reservation_no, g_phone);
		int result = guestmapper.guestChk(reservation_no, g_phone);
		
		if(gdto == null) {
			return MEMBER_NOT_FOUND;
		}else {
			if(result == 1) {
				return UPDATE_SUCCESS;
			}else {
				return UPDATE_NOT_MATCHED;
			}
		}
	}

	@Override
	public int guestSel(String reservation_no) {
		System.out.println("GuestServiceImpl : guestChkPro() 메서드 확인");
		GuestDTO gdto = guestmapper.guestSel(reservation_no);
		System.out.printf("gdtogdtogdto", gdto);
		int result = 0;
		if(gdto == null) {
			result = MEMBER_NOT_FOUND;
		}else {
			result = MEMBER_FOUND;
		}
		return result;
	}

}
