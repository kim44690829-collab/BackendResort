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
import jakarta.servlet.http.HttpServletRequest;
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
	
//	@Autowired
//	HotelMergeDTO hmdto;
	
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
//		List<HotelMergeDTO> result = new ArrayList<HotelMergeDTO>();
		
//		if(hmdto.getHotelAvgScore() != null) {
//			result = hotelService.getHotelMerge();
//		}
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
	public int insertCarProduct(
			HttpServletRequest request,
			//@ModelAttribute HotelDTO hdto,
			@RequestParam("hotelData") String hotelData,
			@RequestParam("h_Img")MultipartFile h_Img,
			@RequestParam("h_s_Img1")MultipartFile h_s_Img1,
			@RequestParam("h_s_Img2")MultipartFile h_s_Img2,
			@RequestParam("h_s_Img3")MultipartFile h_s_Img3,
			@RequestParam("h_s_Img4")MultipartFile h_s_Img4
	        ) throws Exception {

	    String rootPath = System.getProperty("user.dir"); 
	    
	    ObjectMapper mapper = new ObjectMapper();
	    HotelDTO hdto = mapper.readValue(hotelData, HotelDTO.class);
	    
	    // 1. 대표 이미지 저장 경로 (car 폴더)
	    String hotelPath = rootPath + File.separator + "uploads" + File.separator + "img" + File.separator;
	    // 2. 상세 이미지 저장 경로 (detail 폴더)
	    //String detailPath = rootPath + File.separator + "uploads" + File.separator + "img" + File.separator + "detail" + File.separator;

	    
	    File dir = new File(hotelPath);
		 if (!dir.exists()) {
			 dir.mkdirs();
		 }
	    
	    // 폴더 생성
	    new File(hotelPath).mkdirs();
	    //new File(detailPath).mkdirs();

	    if (h_Img != null && !h_Img.isEmpty()) {
	        String fileName1 = UUID.randomUUID().toString().substring(0, 4) + "_" + h_Img.getOriginalFilename();
	        h_Img.transferTo(new File(hotelPath + fileName1)); // carPath에 저장
	        hdto.setH_Img(fileName1);
	    }

	    if (h_s_Img1 != null && !h_s_Img1.isEmpty()) {
	        String fileName2 = UUID.randomUUID().toString().substring(0, 4) + "_" + h_s_Img1.getOriginalFilename();
	        h_s_Img1.transferTo(new File(hotelPath + fileName2)); // detailPath에 저장
	        hdto.setH_s_Img1(fileName2);
	    }
	    if (h_s_Img2 != null && !h_s_Img2.isEmpty()) {
	    	String fileName3 = UUID.randomUUID().toString().substring(0, 4) + "_" + h_s_Img2.getOriginalFilename();
	    	h_s_Img2.transferTo(new File(hotelPath + fileName3)); // detailPath에 저장
	    	hdto.setH_s_Img2(fileName3);
	    }
	    if (h_s_Img3 != null && !h_s_Img3.isEmpty()) {
	    	String fileName4 = UUID.randomUUID().toString().substring(0, 4) + "_" + h_s_Img3.getOriginalFilename();
	    	h_s_Img3.transferTo(new File(hotelPath + fileName4)); // detailPath에 저장
	    	hdto.setH_s_Img3(fileName4);
	    }
	    if (h_s_Img4 != null && !h_s_Img4.isEmpty()) {
	    	String fileName5 = UUID.randomUUID().toString().substring(0, 4) + "_" + h_s_Img4.getOriginalFilename();
	    	h_s_Img4.transferTo(new File(hotelPath + fileName5)); // detailPath에 저장
	    	hdto.setH_s_Img4(fileName5);
	    }

	    hotelService.insertHotel(hdto);;
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
	
	// 호텔 상품의 총 개수
	@GetMapping("/hotel/getAllCount")
	public int gethotelAllCount() {
		System.out.println("HotelApiController : gethotelAllCount() 메서드 확인");
		return hotelService.getAllHotelcount();
	}
	
	@GetMapping("/hotel/chkAllHotel")
	public List<HotelDTO> chkAllHotel(){
		System.out.println("HotelApiController : gethotelAllCount() 메서드 확인");
		return hotelService.chkAllHotel();
	}
}
