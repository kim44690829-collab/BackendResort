CREATE DATABASE resort;

CREATE TABLE hotel(
	h_code int primary key auto_increment, -- 호텔코드(PK)
    hotelName varchar(30) not null, -- 호텔이름
    country varchar(50) not null, -- 국가
    city varchar(50) not null, -- 도시
    type varchar(20) not null, -- 호텔유형
    h_address varchar(100), -- 주소
    discount tinyint not null, -- 이벤트 여부
    h_Img varchar(100), -- 메인이미지
    h_s_Img1 varchar(100), -- 서브이미지1
    h_s_Img2 varchar(100), -- 서브이미지2
    h_s_Img3 varchar(100), -- 서브이미지3
    h_s_Img4 varchar(100), -- 서브이미지4
    startDate Date not null, -- 예약시작일
    endDate Date not null, -- 예약종료일
    roomservice varchar(100), -- 객내시설
    publicservice varchar(100), -- 공용시설
    otherservice varchar(100) -- 기타시설
);

CREATE TABLE room(
	r_code int primary key auto_increment, -- 객실코드(PK)
    h_code int not null, -- 호텔코드(FK)
    roomName varchar(100) not null, -- 객실이름
    price int not null, -- 가격
    maxOccupancy int not null, -- 최대 투숙 인원수
    r_img varchar(100) -- 이미지
);

CREATE TABLE reviewboard(
	rb_code int primary key auto_increment, -- 리뷰보드코드(PK)
    rb_score tinyInt not null, -- 별점
    rb_date datetime default now(), -- 작성일자
    m_code int not null, -- 회원코드(FK)
    r_code int not null, -- 객실코드(FK)
    re_code int not null unique -- 예약코드(PK)
);


CREATE TABLE member(
	m_code int primary key auto_increment, -- 회원코드(PK)
     m_email varchar(50) not null UNIQUE, -- 이메일
     m_pw varchar(200) not null, -- 비밀번호
     m_phone varchar(30) not null, -- 전화번호
     m_birth date not null, -- 생년월일
     m_gender tinyint unsigned not null, -- 성별
     m_nickName varchar(20) not null UNIQUE, -- 닉네임
     m_coupon tinyint default 1, -- 쿠폰
     m_regDate datetime default now(), -- 가입일
     m_is_deleted TINYINT DEFAULT 0, -- 탈퇴 여부
     deleted_at DATETIME NULL -- 탈퇴일
);

CREATE TABLE guest(
	g_code int primary key auto_increment, -- 비회원코드(PK)
	g_name varchar(20) not null, -- 이름
	g_phone varchar(30) not null, -- 전화번호
	g_birth date not null, -- 생년월일
	g_check tinyInt default 0 -- 숙박완료 여부
);

CREATE TABLE reservation(
	re_code int primary key auto_increment, -- 예약코드(PK)
	m_code int, -- 회원코드(FK)
	g_code int, -- 비회원코드(FK)
  reservation_no VARCHAR(36), -- 예약 번호
  r_code int not null, -- 객실코드(FK)
	booker_name varchar(50) not null, -- 예약자명
  reserved_at datetime default now(), -- 예약신청일
  check_in_date date not null, -- 예약시작일
  check_out_date date not null, -- 예약종료일
  original_price int not null, -- 원가격
  discount_rate tinyint unsigned, -- 할인율
  coupon_used tinyint DEFAULT 0, -- 쿠폰 사용 여부
  final_price int not null, -- 할인 후 가격
  cancel tinyint default 0, -- 취소여부
  cancel_date datetime default null, -- 취소일
  review_status tinyInt default 0 -- 예약 작성 여부 0작성가능/1작성완료/2작성불가
);

CREATE TABLE board(
	  b_code int primary key auto_increment, -- 게시판코드(PK)
    m_code int, -- 회원코드(FK)
    b_title varchar(100) not null, -- 제목
    b_writer varchar(30) not null, -- 작성자
    b_pw varchar(30) not null, -- 비밀번호
    readcount int default 1, -- 조회수
    b_date datetime default now(), -- 날짜
    b_content varchar(2000) not null, -- 내용
    ref int not null, -- 원글 분류를 위한 필드명
    re_step int not null, -- 원글과 댓글을 분류하기 위한 필드명
    re_level int not null, -- 댓글 들여쓰기 단계
    b_update datetime default now(), -- 수정일자
    b_upload varchar(200) -- 첨부파일
);

CREATE TABLE notice(
	  n_code int primary key auto_increment, -- 공지사항코드(PK)
    n_title varchar(100) not null, -- 제목
    n_date datetime default now(), -- 날짜
    n_content varchar(2000) not null, -- 내용
    n_update datetime default now() -- 수정일자
);