package login.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import login.service.LoginService;
import lombok.RequiredArgsConstructor;
import mypage.data.MemberDto;
import security.setting.JwtTokenProvider;
import security.setting.UserAuthentication;

@RestController
@RequiredArgsConstructor
public class LoginController {
	
	@Autowired
	private final LoginService loginService;
	
	//소셜로그인용 키
	@Value("${react.kakao.login.client}")
    private String kakaoClient;
	@Value("${react.kakao.login.secret}")
    private String kakaoSecret;
    @Value("${react.naver.login.client}")
    private String naverClient;
    @Value("${react.naver.login.secret}")
    private String naverSecret;
    @Value("${react.kakao.login.redirecturl}")
    private String redirectUrl;
    @Value("${react.kakao.login.logoutRedirectUrl}")
    private String logoutRedirectUrl;

    //관리자 로그인 - 아이디가 없는 경우 noid, 있는 경우 비번을 비교하고 맞을때만 토큰 전달
	@PostMapping("/login/auth")
	public Map<String, Object> login(@RequestBody MemberDto dto)
	{
		//System.out.println("id="+dto.getUserid()+",pass="+dto.getPass());//아이디,비번 확인
		Map<String, Object> map=new HashMap<>();//결과값 넣을 map
		MemberDto user = loginService.getUser(dto.getUserid()); //해당 아이디에 대한 db값 넣기
		int usercode = user.getUsercode();
		
		//아이디 비교
		if(user==null) {
			map.put("result", "noid");//결과 - 아이디없음
		}
		else {
			String dbPass=user.getPass();//비번값넣기
			String pass=dto.getPass();//로그인시 입력한 비번
			String myid=dto.getUserid();//로그인시 입력한 아이디
			
			//비번 비교
			if(pass.equals(dbPass))
			{
                map.put("result", "success");//결과 - 로그인성공
                
                Authentication auth = new UserAuthentication(myid, null, null);
                String token = JwtTokenProvider.generateToken(auth, myid);
                
                //System.out.println("token=" + token); //토큰 확인
                map.put("token", token);//토근전달
                map.put("usercode", usercode);
                
                String userId = JwtTokenProvider.getUserIdFromJWT(token);
                //System.out.println("userId=" + userId);
            } 
			else {
                map.put("result", "nopass");//결과 - 비번안맞음
            }
		}
		return map;
	}
	
	//소셜 로그인 url 셋팅
	@PostMapping("/login/socialLogin")
	public Map<String, Object> getKaKaoUrl(@RequestBody HashMap<String, Object> reqMap) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		 String kakaoUrl = "https://kauth.kakao.com/oauth/authorize?client_id="
				 			+ kakaoClient 
				 			+ "&redirect_uri=" + redirectUrl
				 			+ "&response_type=code";
		 
		 String naverUrl = "https://nid.naver.com/oauth2.0/authorize"
			 		+ "?response_type=code"
			 		+ "&client_id="		+ naverClient
			 		+ "&state="			+ "a7890123"//임의지정
			 		+ "&redirect_uri="	+ redirectUrl;
		 
		 //System.out.println(" =============================== kakaoUrl : " + kakaoUrl);
		 //System.out.println(" =============================== naverUrl : " + naverUrl);
		 
		 map.put("kakaoUrl", kakaoUrl);
		 map.put("naverUrl", naverUrl);
		
		return map;
	}
	
	//로그인 콜백
	@PostMapping("/login/getCallBack")
	public Map<String, Object> getCallBack(@RequestBody HashMap<String, Object> reqMap) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		
		//System.out.println(" =============================== reqMap : " + reqMap);
		
		String code		 = reqMap.get("code").toString();
		String loginType = reqMap.get("loginType").toString();
		String infoUrl	 = "";
		
		if("kakao".equals(loginType)) {			
			reqMap.put("client", kakaoClient);
			reqMap.put("secret", kakaoSecret);
			reqMap.put("redirect", redirectUrl);
			
			map = loginService.getKaKaoAccessToken(reqMap);
			
		} else {
			reqMap.put("client", naverClient);
			reqMap.put("secret", naverSecret);
			reqMap.put("state", reqMap.get("state"));
			
			map = loginService.getNaverToken(reqMap);
		}
		
		return map;
	}
	
	//로그아웃 url
	@PostMapping("/logout/logoutCallBack")
	public Map<String, Object> logoutCallBack(@RequestBody HashMap<String, Object> reqMap) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		
		System.out.println(" =============================== reqMap : " + reqMap);
		
		
		reqMap.put("client", kakaoClient);
		reqMap.put("secret", kakaoSecret);
		reqMap.put("redirect", redirectUrl);
		reqMap.put("logoutRedirectUrl", logoutRedirectUrl);
		
		map = loginService.logoutKakao(reqMap);
					
		return map;
	}
	
	
	
}
