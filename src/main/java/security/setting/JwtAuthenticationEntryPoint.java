package security.setting;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Slf4j
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

  /**
   * 유효한 자격증명을 하지 않고 접근하려 할때 401.
   *
   * @param request
   * @param response
   * @param e
   * @throws IOException
   */
  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException {
    response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
  }
}