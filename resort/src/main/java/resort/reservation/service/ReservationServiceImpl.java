package resort.reservation.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import resort.reservation.dto.ResInfoDTO;
import resort.reservation.dto.ReservationDTO;
import resort.reservation.dto.ReservationMergeDTO;
import resort.reservation.mapper.ReservationMapper;

@Service
public class ReservationServiceImpl implements ReservationService {

	@Autowired
	ReservationMapper reservationmapper;

	@Override
	public int gInsertReservation(ReservationDTO redto) {
		System.out.println("ReservationServiceImpl : insertReservation() 메서드 확인");
		return reservationmapper.gInsertReservation(redto);
	}

	@Override
	public int mInsertReservation(ReservationDTO redto) {
		System.out.println("ReservationServiceImpl : mInsertReservation() 메서드 확인");
		return reservationmapper.mInsertReservation(redto);
	}

	@Override
	public ResInfoDTO resSelect(String reservation_no) {
		System.out.println("ReservationServiceImpl : resSelect() 메서드 확인");
		return reservationmapper.resSelect(reservation_no);
	}

	@Override
	public ResInfoDTO guestSelect(String reservation_no, String g_phone) {
		System.out.println("ReservationServiceImpl : guestSelect() 메서드 확인");
		return reservationmapper.guestSelect(reservation_no, g_phone);
	}

	@Override
	public int getAllRescount() {
		System.out.println("ReservationServiceImpl : getAllRescount() 메서드 확인");
		return reservationmapper.getAllRescount();
	}

	@Override
	public List<ReservationMergeDTO> getResPagelist(int startRow, int pageSize) {
		System.out.println("ReservationServiceImpl : getResPagelist() 메서드 확인");
		return reservationmapper.getResPagelist(startRow, pageSize);
	}

	@Override
	public int getSearchResCount(String searchType, String searchKeyword) {
		System.out.println("ReservationServiceImpl : getSearchResCount() 메서드 확인");
		return reservationmapper.getSearchResCount(searchType, searchKeyword);
	}

	@Override
	public List<ReservationMergeDTO> getSearchResPageList(String searchType, String searchKeyword, int startRow,
			int pageSize) {
		System.out.println("ReservationServiceImpl : getSearchResPageList() 메서드 확인");
		return reservationmapper.getSearchResPageList(searchType, searchKeyword, startRow, pageSize);
	}

	// 리뷰 상태 업데이트 함수
	@Override
	public int reviewStatusMod() {
		System.out.println("ReservationServiceImpl : reviewStatusMod() 메서드 확인");
		return reservationmapper.reviewStatusMod();
	}
	@Override
	public int deleteResercation(@RequestParam("re_code") int re_code) {
		System.out.println("ReservationServiceImpl : deleteResercation(O*O) 메서드 확인");
		return reservationmapper.deleteResercation(re_code);
	}

	@Override
	public int updateResercation(String booker_name, int re_code, String g_phone) {
		System.out.println("ReservationServiceImpl : updateResercation(O*O) 메서드 확인");
		return reservationmapper.updateResercation(booker_name, re_code, g_phone);
	}

	@Override
	public int reviewMod(int re_code) {
		System.out.println("ReservationServiceImpl : updateResercation(O*O) 메서드 확인");
		return reservationmapper.reviewMod(re_code);
	}

	@Override
	public int getAllRescount1() {
		System.out.println("ReservationServiceImpl : getAllRescount1(O*O) 메서드 확인");
		return reservationmapper.getAllRescount1();
	}

	@Override
	public List<ReservationMergeDTO> getResPagelist1(int startRow, int pageSize) {
		System.out.println("ReservationServiceImpl : getResPagelist1(O*O) 메서드 확인");
		return reservationmapper.getResPagelist1(startRow, pageSize);
	}

	@Override
	public int getSearchResCount1(String searchType, String searchKeyword) {
		System.out.println("ReservationServiceImpl : getSearchResCount1(O*O) 메서드 확인");
		return reservationmapper.getSearchResCount1(searchType, searchKeyword);
	}

	@Override
	public List<ReservationMergeDTO> getSearchResPageList1(String searchType, String searchKeyword, int startRow,
			int pageSize) {
		System.out.println("ReservationServiceImpl : getSearchResPageList1(O*O) 메서드 확인");
		return reservationmapper.getSearchResPageList1(searchType, searchKeyword, startRow, pageSize);
	}

	@Override
	public int getAllRescount2() {
		System.out.println("ReservationServiceImpl : getAllRescount2(O*O) 메서드 확인");
		return reservationmapper.getAllRescount2();
	}

	@Override
	public List<ReservationMergeDTO> getResPagelist2(int startRow, int pageSize) {
		System.out.println("ReservationServiceImpl : getResPagelist2(O*O) 메서드 확인");
		return reservationmapper.getResPagelist2(startRow, pageSize);
	}

	@Override
	public int getSearchResCount2(String searchType, String searchKeyword) {
		System.out.println("ReservationServiceImpl : getSearchResCount2(O*O) 메서드 확인");
		return reservationmapper.getSearchResCount2(searchType, searchKeyword);
	}

	@Override
	public List<ReservationMergeDTO> getSearchResPageList2(String searchType, String searchKeyword, int startRow,
			int pageSize) {
		System.out.println("ReservationServiceImpl : getSearchResPageList2(O*O) 메서드 확인");
		return reservationmapper.getSearchResPageList2(searchType, searchKeyword, startRow, pageSize);
	}

	
	
	@Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")
	public void reviewStatusUpdate() {
		System.out.println("ReservationServiceImpl : reviewStatusUpdate() 메서드 확인");
		reservationmapper.reviewStatusUpdate();
	}
}
