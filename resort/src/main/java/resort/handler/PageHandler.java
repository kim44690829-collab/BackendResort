package resort.handler;

import lombok.Data;

@Data
public class PageHandler {
	// =================== 1. 기본 입력값 =================
			private int totalCnt; // 전체 게시글의 수
			private int pageNum; // 현재 페이지 번호
			private int pageSize; // 한 페이지에 보여줄 레코드(행의) 게수
			private int pageBlock = 5; // 페이지 번호 묶음(1~5)
			
			//=================== 2. DB 조회 변수 ==============
			// Limit 1(startRow) , 5(pageSize) => 1 부터시작해서 5개만 출력
			private int startRow; // DB의 시작 위치
			private int endRow; // 가져올 게시글 갯수 = pageSize
			
			//=================== 3. 페이지블록 부분 ==============
			
			private int totalPage; //전체 페이지 수
			private int startPage; // 블록페이지의 시작 번호
			private int endPage; // 블록페이지의 마지막 번호
			
			private boolean prev; // 이전
			private boolean next; // 다음
			
			// ===================== 생성자 =======================
			public PageHandler(int totalCnt, int pageNum, int pageSize) {
				this.totalCnt = totalCnt;
				this.pageNum = pageNum;
				this.pageSize = pageSize;
				
				// 계산함수 콜할 예정
				calcPageing();
			}
			
			public void calcPageing() {
				// totalPage : 전체 페이지수 계산
				// [1][2][3], [4][5][6]
				// 게시글의 개수 계속 증가/감소
				// 한페이지에 5개, 게시글 11개 -> 블록 3
				// 11/5 => int(2.2)(X)
				//나누어서 소수자리수까지 모두 반올림이 되어야 페이지 하나 생성
				// Math.ceil() => 소수정을 무조건 반올림하여 정수 출력하는 메소드
				totalPage = (int)Math.ceil(totalCnt / (double)pageSize);
				
				//DB 조회하는 범위, 첫 번째
				//1페이지 -> 0부터 5개
				//2페이지 -> 5부터 5개
				//3페이지 -> 10부터 5개
				startRow = (pageNum -1)*pageSize;
				startPage = ((pageNum-1)/pageBlock)*pageBlock+1;
				// 현재 pageBlock =3으로 지정, 만약 pageBlock =5
				// endPage = StartPage + 2 =>[1][2][3][4][5]
				endPage = startPage + (pageBlock-1);
				
				// 실제 페이지는 [1] ~ [8]까지만 출력되어야 하는데
				// 위의 계산식으로는 [1]~[9]까지 출력된다.
				// 이런 경우 가장 마지막 페이지를 강제로 endPage에 담아준다.
				
				if(endPage>totalPage) {
					endPage=totalPage;
				}
				
				// 4.이전/다음 버튼 여부
				prev = startPage>1;
				next = endPage < totalPage;
				
			}
}
