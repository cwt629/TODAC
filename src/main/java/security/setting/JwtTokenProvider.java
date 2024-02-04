package security.setting;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtTokenProvider {  
	//https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx
	private static final String JWT_SECRET = "KbPeShVmYq3t6w9z$C&F)H@McQfTjWnZ";

	// 토큰 유효시간
	private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30;            // 30분
	private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7;  // 7일
	private static Key secretKey;

	@PostConstruct  
	protected void init() {
		secretKey = Keys.hmacShaKeyFor(JWT_SECRET.getBytes(StandardCharsets.UTF_8));
	}
	// jwt 토큰 생성
	public static String generateToken(Authentication authentication,String userId) {
		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + ACCESS_TOKEN_EXPIRE_TIME);

		return Jwts.builder()
				.setSubject((String) authentication.getPrincipal()) // 사용자
				.setIssuedAt(new Date()) // 현재 시간 기반으로 생성
				.setExpiration(expiryDate) // 만료 시간 세팅
				.claim("userId", userId)
				//.claim("userName", "비트캠프")
				// 사용할 암호화 알고리즘, signature에 들어갈 secret 값 세팅
				.signWith(secretKey, SignatureAlgorithm.HS256)
				.compact();
	}

	// Jwt 토큰에서 아이디 추출
	public static String getUserIdFromJWT(String token) {
		Claims claims = Jwts.parser()
				.setSigningKey(secretKey)
				.parseClaimsJws(token)
				.getBody();

		log.info("id:"+claims.getId());
		log.info("issuer:"+claims.getIssuer());
		log.info("issue:"+claims.getIssuedAt().toString());
		log.info("subject:"+claims.getSubject());
		log.info("Audience:"+claims.getAudience());
		log.info("expire:"+claims.getExpiration().toString());
		//log.info("userName:"+claims.get("userName"));
    log.info("userId:"+claims.get("userId"));

		return claims.getSubject();
	}

	// Jwt 토큰 유효성 검사
	public static boolean validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
			return true;
		}catch (io.jsonwebtoken.security.SecurityException|MalformedJwtException e) {
			log.error("잘못된 JWT 서명입니다.", e.getMessage());
		} catch (ExpiredJwtException e) {
			log.error("만료된 JWT 토큰입니다.", e.getMessage());
		} catch (UnsupportedJwtException e) {
			log.error("지원되지 않는 JWT 토큰입니다.", e.getMessage());
		} catch (IllegalArgumentException e) {
			log.error("JWT 토큰이 잘못되었습니다.", e.getMessage());
		}catch(Exception e) {
			log.error("에러 메세지", e.getMessage());
		}
		return false;
	}
}