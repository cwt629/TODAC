package security.setting;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
//Security filterchain을 구성하기 위한 어노테이션
@EnableWebSecurity
public class SecurityConfiguration {
   private JwtAuthenticationEntryPoint unauthorizedHandler;
   //비밀번호 암호화를 위한 PasswordEncoder
   //복호화가 불가능. match라는 메소드를 이용해서 사용자의 입력값과 DB의 저장값을 비교
   /*
    * 복호화 또는 디코딩(decoding)은 부호화(encoding)된 정보를 부호(code)화되기 전으로 되돌리는 처리 
    * 혹은 그 처리 방식을 말한다. 보통은 부호화의 절차를 역으로 수행하면 복호화가 된다. 
    * 암호화(encryption)의 반대말로서의 복호화는 decryption이라고 부른다.
    */
   // => true나 false 리턴, match(암호화되지 않은 값, 암호화된 값)
   @Bean
   public static PasswordEncoder passwordEncoder() {
      System.out.println("PasswordEncoder 메서드 호출");
      return new BCryptPasswordEncoder();
   }

   //필터 체인 구현(HttpSecurity 객체 사용)
   @Bean
   public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
      http
      //csrf 공격에 대한 옵션 꺼두기
      /*
       * CSRF란, Cross Site Request Forgery 의 약자로, 한글 뜻으로는 사이트간 요청 위조를 뜻합니다.
       * CSRF는 웹 보안 취약점의 일종이며, 사용자가 자신의 의지와는 무관하게 공격자가 
       * 의도한 행위(데이터 수정, 삭제, 등록 등) 을 특정 웹사이트에 요청하게 하는 공격입니다.
       * 예를 들어, 피해자의 전자 메일 주소를 변경하거나 암호를 변경하거나 자금이체를 하는 등의 
       * 동작을 수행하게 할 수 있습니다.
       * 특성에 따라, 공격자는 사용자의 계정에 대한 완전한 제어권을 얻을 수 있을 수도 있습니다.
       */
      .csrf(AbstractHttpConfigurer::disable)
      .addFilterBefore(new JwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
      //요청 주소에 대한 권한 설정
      .authorizeHttpRequests((authorizeRequests) -> {
         //'/'요청은 모든 사용자가 이용가능
         authorizeRequests         
         .requestMatchers("/**").permitAll()
         .requestMatchers("/favicon.ico").permitAll()
         .requestMatchers(AntPathRequestMatcher.antMatcher("/h2-console/**")).permitAll()
         //css, js, images, upload 같은 정적 리소스들도 권한처리 필수
         .requestMatchers("/css/**").permitAll()
         .requestMatchers("/js/**").permitAll()
         .requestMatchers("/upload/**").permitAll()
         .requestMatchers("/images/**").permitAll()
         .requestMatchers("/member/**").permitAll()         
         .requestMatchers("/login/**").permitAll() 
         .requestMatchers("/game/**").permitAll()
         //이외의 요청은 인증된 사용자만 사용자만 사용가능
         .anyRequest().authenticated();   
         
      })
      .headers(headers -> headers.frameOptions().disable());
//      .csrf(csrf -> csrf
//            .ignoringRequestMatchers(AntPathRequestMatcher.antMatcher("/h2-console/**")));

      return http.build();
   }
}