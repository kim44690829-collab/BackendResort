package resort.board.dto;

import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

public class BoardDTO {

	private int b_code; // 게시판코드(PK)
	private String m_email; //회원아이디
	private String b_title; // 제목
	private String b_writer; // 작성자
	private String b_pw; // 글 비밀번호 
	private Date b_date; // 작성일자
	private int readcount; // 조회수 
	private String b_content; // 내용
	private int ref; // 원글번호
	private int re_step; // 댓글출력순서
	private Date b_update; // 수정일자
	private MultipartFile upload;  // 첨부파일
	
	public int getB_code() {
		return b_code;
	}
	public void setB_code(int b_code) {
		this.b_code = b_code;
	}
	public String getB_title() {
		return b_title;
	}
	public void setB_title(String b_title) {
		this.b_title = b_title;
	}
	
	public Date getB_date() {
		return b_date;
	}
	public void setB_date(Date b_date) {
		this.b_date = b_date;
	}
	public String getB_content() {
		return b_content;
	}
	public void setB_content(String b_content) {
		this.b_content = b_content;
	}
	public int getRef() {
		return ref;
	}
	public void setRef(int ref) {
		this.ref = ref;
	}
	public int getRe_step() {
		return re_step;
	}
	public void setRe_step(int re_step) {
		this.re_step = re_step;
	}
	public Date getB_update() {
		return b_update;
	}
	public void setB_update(Date b_update) {
		this.b_update = b_update;
	}
	public String getM_email() {
		return m_email;
	}
	public void setM_email(String m_email) {
		this.m_email = m_email;
	}
	public String getB_pw() {
		return b_pw;
	}
	public void setB_pw(String b_pw) {
		this.b_pw = b_pw;
	}
	public int getReadcount() {
		return readcount;
	}
	public void setReadcount(int readcount) {
		this.readcount = readcount;
	}
	public String getB_writer() {
		return b_writer;
	}
	public void setB_writer(String b_writer) {
		this.b_writer = b_writer;
	}
	public MultipartFile getUpload() {
		return upload;
	}
	public void setUpload(MultipartFile upload) {
		this.upload = upload;
	}
	
	
}
