package resort.product.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.annotation.MultipartConfig;
import resort.handler.PageHandler;
import resort.product.dto.HotelDTO;
import resort.product.dto.HotelMergeDTO;
import resort.product.dto.HotelPriceDTO;
import resort.product.dto.HotelRatingDTO;
import resort.product.service.HotelService;

@MultipartConfig(
	    maxFileSize = 10 * 1024 * 1024,        // 파일 1개 최대 10MB
	    maxRequestSize = 100 * 1024 * 1024,    // 전체 요청 최대 100MB
	    fileSizeThreshold = 1024 * 1024        // 1MB 초과시 디스크에 저장
)
@RestController
@RequestMapping("/api")
public class HotelApiController {

	@Autowired
	HotelService hotelService;
	
	// 호텔 전체 정보 보내는 컨트롤러
	@GetMapping("/hotel/context")
	public List<HotelDTO> allHotel(){
		System.out.println("HotelApiController : allHotel() 메서드 확인");
		return hotelService.getHotelAll();
	}
	
	// (상세페이지 호텔과) 같은지역의 추천호텔 컨트롤러
	@GetMapping("/hotel/recomm")
	public List<HotelDTO> getRecommHotel(
			@RequestParam("hotelcity") String hotelcity,
			@RequestParam("hotelcode") int hotelcode
			){
		System.out.println("HotelApiController : getRecommHotel() 메서드 확인");
		return hotelService.getRecommHotel(hotelcity,hotelcode);
	}

	@GetMapping("/hotel/price")
	public List<HotelPriceDTO> getHotelPrice() {
		System.out.println("HotelApiController : getHotelPrice() 메서드 확인");
		return hotelService.getHotelPrice();
	}
	
	@GetMapping("/hotel/hotelRating")
	public  List<HotelRatingDTO> allHotelRating(){
		System.out.println("HotelApiController : allHotelRating(^^) 메서드 확인");
		return hotelService.getHotelRating();
	}
	
	
	
	@GetMapping("/hotel/hotelMarge")
	public  List<HotelMergeDTO> allHotelMarge(){
		System.out.println("HotelApiController : allHotelMarge(^^) 메서드 확인");
		return hotelService.getHotelMerge();
	}
	
	// ============= 2026-02-23 수정 부분 JHJ==============
	@GetMapping("/hotel/list")
	public Map<String, Object> hotelList(
			@RequestParam(value="searchType", required = false ) String searchType,
			@RequestParam(value="searchKeyword", required = false) String searchKeyword,
			@RequestParam(value="page",defaultValue="1") int page, // 초기 페이지
			@RequestParam(value="pageSize",defaultValue="10") int pageSize // 한 페이지당 보여줄 목록의 수
			){
		System.out.println("MemberApiController : hotelList(@-@) 메서드 확인");
		
		int totalCnt ;
		
		if(searchType != null && !searchKeyword.trim().isEmpty()) {
			totalCnt=hotelService.getHotelSearchCount(searchType, searchKeyword);
		}else {
			totalCnt=hotelService.getAllHotelcount();
		}
		
		
		// 페이지 핸들러 인스터스화
		PageHandler ph = new PageHandler(totalCnt, page, pageSize);
		
		//List<MemberDTO>list = memberservice.getPagelist(ph.getStartRow(), pageSize);
		List<HotelDTO>list;
		
		if(searchType != null && !searchKeyword.trim().isEmpty()) {
			// service 에서 SearchBoard
			list = hotelService.getSearchPageHotelList(searchType, searchKeyword, ph.getStartRow(), pageSize);
		}else {
//				list = boardservice.allboard();
			list = hotelService.getPageHotellist(ph.getStartRow(), pageSize);
		}
		
		
		
		Map<String, Object> result = new HashMap<>();
		
		result.put("list", list);
		result.put("ph", ph);
		result.put("searchType",searchType);
		result.put("searchKeyword",searchKeyword);
		return result;
	}
	
	// =============== 2026-02-24 수정부분 JHJ =====================
	// 호텔 목록 추가
	@PostMapping("/hotel/insert")
	public int insertHotel(
			//@ModelAttribute HotelDTO hdto ,
			@RequestParam("hotelData") String hotelData,
			@RequestParam("h_Img")MultipartFile h_Img,
			@RequestParam("h_s_Img1")MultipartFile h_s_Img1,
			@RequestParam("h_s_Img2")MultipartFile h_s_Img2,
			@RequestParam("h_s_Img3")MultipartFile h_s_Img3,
			@RequestParam("h_s_Img4")MultipartFile h_s_Img4
			) throws Exception{
		System.out.println("자동차 등록 요청");
		
		// JSON 문자열 → TestImgDTO 변환
        ObjectMapper mapper = new ObjectMapper();
        HotelDTO hdto = mapper.readValue(hotelData, HotelDTO.class);
		
		//저장경로
		String savePath = "C:/resort2026/resort/frontend/public/img/";
				
		//저장할 경로가 졵하지 않으면 자동 생성해주는 코드
		File dir = new File(savePath);
		if(!dir.exists()) {
			dir.mkdirs();
		}
		
		String fileName="";
		if(!h_Img.isEmpty()) {
			//사용자가 올린 파일명을 가져온다.
			String originalName = h_Img.getOriginalFilename();
			
			// 사용자명 중복해서 입력되지 않도록 UUID클래스 이용
			fileName = UUID.randomUUID().toString().substring(0,4)+"_"+originalName;
			
			//fileName = hdto.getH_code()+1+"-"+"1";
			
			File saveFile = new File(savePath + fileName);
			h_Img.transferTo(saveFile);
		}
		String fileName1="";
		if(!h_s_Img1.isEmpty()) {
			//사용자가 올린 파일명을 가져온다.
			String originalName = h_s_Img1.getOriginalFilename();
			
			// 사용자명 중복해서 입력되지 않도록 UUID클래스 이용
			fileName1 = UUID.randomUUID().toString().substring(0,4)+"_"+originalName;
			
			//fileName1 = hdto.getH_code()+1+"-"+"2";
			
			File saveFile = new File(savePath + fileName1);
			h_s_Img1.transferTo(saveFile);
		}
		String fileName2="";
		if(!h_s_Img2.isEmpty()) {
			//사용자가 올린 파일명을 가져온다.
			String originalName = h_s_Img2.getOriginalFilename();
			
			// 사용자명 중복해서 입력되지 않도록 UUID클래스 이용
			fileName2 = UUID.randomUUID().toString().substring(0,4)+"_"+originalName;
			//fileName2 = hdto.getH_code()+1+"-"+"3";
			
			File saveFile = new File(savePath + fileName2);
			h_s_Img2.transferTo(saveFile);
		}
		String fileName3="";
		if(!h_s_Img3.isEmpty()) {
			//사용자가 올린 파일명을 가져온다.
			String originalName = h_s_Img3.getOriginalFilename();
			
			// 사용자명 중복해서 입력되지 않도록 UUID클래스 이용
			fileName3 = UUID.randomUUID().toString().substring(0,4)+"_"+originalName;
			//fileName3 = hdto.getH_code()+1+"-"+"4";
			
			File saveFile = new File(savePath + fileName3);
			h_s_Img3.transferTo(saveFile);
		}
		String fileName4="";
		if(!h_s_Img4.isEmpty()) {
			//사용자가 올린 파일명을 가져온다.
			String originalName = h_s_Img4.getOriginalFilename();
			
			// 사용자명 중복해서 입력되지 않도록 UUID클래스 이용
			fileName4 = UUID.randomUUID().toString().substring(0,4)+"_"+originalName;
			//fileName4 = hdto.getH_code()+1+"-"+"5";
			
			File saveFile = new File(savePath + fileName4);
			h_s_Img4.transferTo(saveFile);
		}
		
		// DTO중 setImg()에 파일명만 세팅한다.
		hdto.setH_Img(fileName);
		hdto.setH_s_Img1(fileName1);
		hdto.setH_s_Img2(fileName2);
		hdto.setH_s_Img3(fileName3);
		hdto.setH_s_Img4(fileName4);
		
		// DB에 저장
		hotelService.insertHotel(hdto);
		
		return 1;
	}
	
	@GetMapping("/hotel/onlyhotel")
	public List<HotelDTO> allonlyHotel(){
		System.out.println("HotelApiController : allonlyHotel() 메서드 확인");
		return hotelService.getonlyHotelAll();
	}
	
	@PutMapping("/hotel/adminupdatehotel")
	public int adminupdatehotel(@RequestBody HotelDTO hdto) {
		System.out.println("HotelApiController : adminupdatehotel() 메서드 확인");
		return hotelService.updateHotel(hdto);
	}
	
}
