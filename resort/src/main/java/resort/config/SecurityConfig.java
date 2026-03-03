package resort.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

// spring security 부품을 설정하기 위해서 config패키지 생성
// SecurityConfig 클래스 생성

@Configuration // 이 클래스는 환경설정하는 부분이야
@EnableWebSecurity // 우리가 지정한 암호화를 웹어플리피케이션에 적용할께 라는 어노테이션
public class SecurityConfig {

	@Bean //IoC 스프링컨테이너에 Bean객체로 등록한다.
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(); // 12223 -> sfjlsdfksl(문자열 암호화)
	}
	
	// 기본적으로 동작하는 기능을 꺼야 하기에 모두 disable() 비활성화 한다.
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	
		http
		.cors(cors -> cors.disable())
		.csrf(csrf -> csrf.disable());
		
		http
		.formLogin(login -> login.disable());
		
		return http.build();
	}
	
}
