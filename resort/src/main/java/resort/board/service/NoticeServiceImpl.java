package resort.board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import resort.board.dto.NoticeDTO;
import resort.board.mapper.NoticeMapper;

@Service
public class NoticeServiceImpl implements NoticeService{
	
	@Autowired
	NoticeMapper noticeMapper;

	@Override
	public int getAllNoticecount() {
		System.out.println("NoticeServiceImpl : getAllNoticecount(A o A) 메서드확인");
		return noticeMapper.getAllNoticecount();
	}

	@Override
	public List<NoticeDTO> getPageNoticelist(int startRow, int pageSize) {
		System.out.println("NoticeServiceImpl : getPageNoticelist(A o A) 메서드확인");
		return noticeMapper.getPageNoticelist(startRow, pageSize);
	}

	@Override
	public int getNoticeSearchCount(String searchType, String searchKeyword) {
		System.out.println("NoticeServiceImpl : getNoticeSearchCount(A o A) 메서드확인");
		return noticeMapper.getNoticeSearchCount(searchType, searchKeyword);
	}

	@Override
	public List<NoticeDTO> getSearchPageNoticeList(String searchType, String searchKeyword, int startRow,
			int pageSize) {
		System.out.println("NoticeServiceImpl : getSearchPageNoticeList(A o A) 메서드확인");
		return noticeMapper.getSearchPageNoticeList(searchType, searchKeyword, startRow, pageSize);
	}

	@Override
	public void insertNotice(NoticeDTO ndto) {
		System.out.println("NoticeServiceImpl : insertNotice(A o A) 메서드확인");
		System.out.println(ndto.getN_title());
		System.out.println(ndto.getN_content());
		System.out.println("여기까지 확인");
		noticeMapper.insertNotice(ndto);
		
	}

	@Override
	public int deleteNotice(int n_code) {
		System.out.println("NoticeServiceImpl : deleteNotice(A o A) 메서드확인");
		return noticeMapper.deleteNotice(n_code);
	}

	@Override
	public NoticeDTO oneSelectNotice(int n_code) {
		System.out.println("NoticeServiceImpl : oneSelectNotice(A o A) 메서드확인");
		return noticeMapper.oneSelectNotice(n_code);
	}

	@Override
	public int adminUpdateNotice(NoticeDTO ndto) {
		System.out.println("NoticeServiceImpl : oneSelectNotice(A o A) 메서드확인");
		return noticeMapper.adminUpdateNotice(ndto);
	}

}
