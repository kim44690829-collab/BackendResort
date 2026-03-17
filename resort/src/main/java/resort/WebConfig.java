package resort;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//이 클래스는 스프링부트의 설정파일 입니다.를 알려주는 어노테이션
@Configuration  
public class WebConfig implements WebMvcConfigurer{
   
	// addResourceHandlers는 : 정적 리소스(HTML, CSS, JS등)을 관리하는 메소드이다.
	// 외부의 물리적인 경로를 웹에서 사용하는 URL 주소로 매핑하는 설정을 담당한다.
	
	// file:///c:/upload/ => 실제로 파일이 저장되는 물리적인 경로이다.
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
//		registry.addResourceHandler("/boardImg/**")
//		        .addResourceLocations("file:///c:/resort2026/resort/frontend/public/img/boardImg/");
		String rootPath = System.getProperty("user.dir");
		String uploadPath = "file:" + rootPath + "/uploads/img/";
		
		registry.addResourceHandler("/img/**")
				.addResourceLocations(uploadPath, "classpath:/static/img/");
		
	}
	
	// F5누르면 오류뜨는 이슈때문에 반드시 작성한다.
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {

		// 모든 계층의 경로를 index.html로 포워딩합니다. (가장 권장되는 방식)
	    registry.addViewController("/**/{path:[^\\.]*}")
	            .setViewName("forward:/index.html");
	
	}
}
