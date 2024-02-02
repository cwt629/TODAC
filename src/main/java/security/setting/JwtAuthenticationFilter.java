package security.setting;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {

    log.info(request.getRequestURI());

    if(!request.getRequestURI().contains("login") && !request.getRequestURI().contains("favicon")) {
      log.info("토큰 체크");
      try {
        String jwt = getJwtFromRequest(request); //request에서 jwt 토큰을 꺼낸다.
        if (StringUtils.isNotEmpty(jwt) && JwtTokenProvider.validateToken(jwt)) {
          String userId = JwtTokenProvider.getUserIdFromJWT(jwt); //jwt에서 사용자 id를 꺼낸다.

          log.info("userId : " + userId);

          UserAuthentication authentication = new UserAuthentication(userId, null, null); //id를 인증한다.
          authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); //기본적으로 제공한 details 세팅

          SecurityContextHolder.getContext()
              .setAuthentication(authentication); //세션에서 계속 사용하기 위해 securityContext에 Authentication 등록
        } else {
          if (StringUtils.isEmpty(jwt)) {
            //request.setAttribute("unauthorization", "401 인증키 없음.");
        	System.out.println("401 인증키 없음.");
          }

          if (JwtTokenProvider.validateToken(jwt)) {
            //request.setAttribute("unauthorization", "401-001 인증키 만료.");
            System.out.println("401-001 인증키 만료.");
          }
        }
      } catch (Exception ex) {
        logger.error("Could not set user authentication in security context", ex);
      }
    }

    filterChain.doFilter(request, response);
  }

  private String getJwtFromRequest(HttpServletRequest request) {
    String bearerToken = request.getHeader("Authorization");
    log.info("bearerToken : " + bearerToken);
    if (StringUtils.isNotEmpty(bearerToken) && bearerToken.startsWith("Bearer ")) {
      log.info("Bearer exist");
      return bearerToken.substring("Bearer ".length());
    }
    return null;
  }
}