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
		noticeMapper.insertNotice(ndto);
		
	}

}
