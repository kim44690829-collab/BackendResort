package resort.board.dto;

import java.util.Date;

import lombok.Data;

@Data
public class NoticeDTO{
	// 공지보드 DTO
	private int n_code; //공지사항코드
	private String n_title;//제목
	private Date n_date;//날짜
	private String n_content;//내용
	private Date n_update;//수정일자
	
	
}	
