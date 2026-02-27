package resort.board.dto;

import java.util.Date;

import lombok.Data;

@Data
public class BoardDTO {

	private int b_code; // 게시판코드(PK)
	private int m_code; //회원코드(FK)
	private String b_title; // 제목
	private String b_writer; // 작성자
	private String b_pw; // 글 비밀번호 
	private Date b_date; // 작성일자
	private int readcount; // 조회수 
	private String b_content; // 내용
	private int ref; // 원글번호
	private int re_step; // 댓글출력순서
	private int re_level; //댓글 들여쓰기 단계(원글/댓글 구분)
	private Date b_update; // 수정일자
	private String b_upload;  // 첨부파일
	
	
}