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

//Spring Security 설정을 위해서 config 패키지를 만들고, SecurityConfig클래스를 만든다.

@Configuration
@EnableWebSecurity //우리가 지정한 암호화를 웹어플리케이션에 적용하겠다는 어노테이션
public class SecurityConfig {
 
	@Bean // Ioc컨테이너에 Bean으로 등록한다.
	public PasswordEncoder passwordEncoder() {
		   return new BCryptPasswordEncoder(); //문자열을 암호화 해주는 클래스이다.
	   }
	
	//기본적으로 동작하는 기능을 꺼야하기에 disable()로 비활성화 한다.
	   @Bean
	   SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

	       http
	               .cors(cors -> cors.disable())
	               .csrf(csrf -> csrf.disable());
	       

	       http
	       			// 아래 설정을 추가하여 모든 경로에 대한 접근을 허용합니다.
			        .authorizeHttpRequests(auth -> auth
			            .anyRequest().permitAll() 
			        )
	               .formLogin(login -> login.disable());

	       return http.build();
	   }
	
}
