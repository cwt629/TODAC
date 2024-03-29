package login.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import login.repository.LoginDao;
import mypage.data.MemberDto;
import mypage.repository.MemberDao;
import security.setting.JwtTokenProvider;
import security.setting.UserAuthentication;

@Service
public class LoginServiceImpl implements LoginService {
	
    private final MemberDao memberDao;

    @Autowired
    public LoginServiceImpl(MemberDao memberDao) {
		this.memberDao = memberDao;
    }

    
    //userid로 memberDto
    @Override
    public MemberDto getUser(String userid) {
        //return loginDao.findByUserid(userid);
    	return memberDao.getMemberByID(userid);
    }
   

    /**
     * 인가된 코드를 가지고 카카오 token 발급받기
     * 
     * @param reqMap
     * @return
     * @throws Exception
     */
    public HashMap<String, Object> getKaKaoAccessToken(HashMap<String, Object> reqMap) throws Exception {
    	HashMap<String, Object> retMap = new HashMap<String, Object>();
    	
	//카카오 API의 엔드포인트
    	String REQ_URL = "https://kauth.kakao.com/oauth/token";
    	
	//hppt 요청 엔티티
    	//HTTP 요청에 포함될 헤더
    	HttpHeaders headers = new HttpHeaders();
    	headers.add("Content-Type", "application/x-www-form-urlencoded;");
    	//HTTP 요청에 전달될 파라미터
    	MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id",  reqMap.get("client").toString());
        params.add("redirect_uri", reqMap.get("redirect").toString()); 
        params.add("code", reqMap.get("code").toString());
        params.add("client_secret", reqMap.get("secret").toString());
        //Http Entity 객체 생성
        HttpEntity<MultiValueMap<String, String>> request  = new HttpEntity<>(params, headers);

    //카카오에 Access token 발급 요청
        //Spring의 RestTemplate을 사용하여 HTTP 요청을 수행할 객체를 생성
        RestTemplate restTemplate = new RestTemplate();
        //POST 요청으로 Access Token을 발급
        ResponseEntity<String> accessTokenResponse = restTemplate.postForEntity(
        		REQ_URL, //카카오 api 엔드포인트
        		request , //hppt 요청 엔티티
                String.class //응답은 String으로
        );
        
	// JSON Parsing (-> HashMap)
        //Jackson 라이브러리를 사용하여 JSON 응답을 파싱할 ObjectMapper 객체를 생성
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        //JSON 문자열을 HashMap으로 변환
		HashMap<String, Object> map = objectMapper.readValue(accessTokenResponse.getBody(), HashMap.class);
		//System.out.println(map);
		
	//발급받은 Access Token을 이용하여 kakaoLogin 메소드를 호출
		retMap = kakaoLogin(map.get("access_token").toString());
    	
    	return retMap;
    }
    
    /**
     * 카카오 로그인 처리 로직
     * 
     * @param kakaoAccessToken
     * @return
     * @throws Exception
     */
    public HashMap<String, Object> kakaoLogin(String kakaoAccessToken) throws Exception {
    	HashMap<String, Object> retMap = new HashMap<String, Object>();
    	
        HashMap<String, Object> userInfo = getKakaoInfo(kakaoAccessToken);//카카오토큰으로 정보받아 저장
        //System.out.println(" ======================= kakao userInfo : " + userInfo);
        
        String userid = userInfo.get("id").toString(); //카카오정보에서 id 받아 저장
        MemberDto user = memberDao.getMemberByID(userid); //그 id로 db조회해서 저장
        

        if(user==null) {
        	retMap.put("Signup", "N"); //회원가입해야함
        	retMap.put("userInfo", userInfo);//회원가입을 위한 user 정보 전달
        }  else {
	        retMap.put("Signup", "Y"); //회원가입되어있음
	        Authentication auth = new UserAuthentication(userid, null, null);
            String token = JwtTokenProvider.generateToken(auth, userid); //토큰발급
            //System.out.println("token=" + token); //토큰 확인
            retMap.put("accessToken", kakaoAccessToken);//카카오토근전달
            retMap.put("token", token);//토근전달
            int usercode = user.getUsercode();//사용편의를 위한 usercode저장
            retMap.put("id", userid);//id전달
            retMap.put("usercode", usercode);//usercode전달
        }
        return retMap;
    }
    
    /**
     * 카카오 로그인시 사용자 정보 가져옴
     * 
     * @param kakaoAccessToken
     * @return
     * @throws Exception
     */
    public HashMap<String, Object> getKakaoInfo(String kakaoAccessToken) throws Exception {
    	HashMap<String, Object> retMap = new HashMap<String, Object>();
    	
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + kakaoAccessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> accountInfoRequest = new HttpEntity<>(headers);

        ResponseEntity<String> accountInfoResponse = rt.postForEntity(
        		"https://kapi.kakao.com/v2/user/me",
                accountInfoRequest,
                String.class
        );
        
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        
    	retMap = objectMapper.readValue(accountInfoResponse.getBody(), HashMap.class);
    	//System.out.println(retMap);
        
        return retMap;
    }
    
    
    /**
     * 네이버 로그인 토큰 요청
     * 
     * @param reqMap
     * @return
     * @throws Exception
     */
    public HashMap<String, Object> getNaverToken(HashMap<String, Object> reqMap) throws Exception {
    	HashMap<String, Object> retMap = new HashMap<String, Object>();
    	
	//hppt 요청 엔티티
    	//HTTP 요청에 포함될 헤더
    	HttpHeaders headers = new HttpHeaders();
    	headers.add("Content-Type", "application/x-www-form-urlencoded;");
    	//HTTP 요청에 전달될 파라미터
    	MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id",  reqMap.get("client").toString());
        params.add("code", reqMap.get("code").toString());
        params.add("client_secret", reqMap.get("secret").toString());
        //Http Entity 객체 생성
        HttpEntity<MultiValueMap<String, String>> request  = new HttpEntity<>(params, headers);

      //네이버에 Access token 발급 요청
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> accessTokenResponse = restTemplate.postForEntity(
        		"https://nid.naver.com/oauth2.0/token", //네이버 api 엔드포인트
        		request , //hppt 요청 엔티티
                String.class //응답은 String으로
        );
        
        // JSON Parsing (-> HashMap)
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
      //JSON 문자열을 HashMap으로 변환
		HashMap<String, Object> map = objectMapper.readValue(accessTokenResponse.getBody(), HashMap.class);
		//System.out.println(map);
		
		//발급받은 Access Token을 이용하여 네이버 정보 받아오기
		HashMap<String, Object> userInfo = getNaverinfo(map.get("access_token").toString());
		userInfo = (HashMap<String, Object>) userInfo.get("response");
		//System.out.println(" =======================naver userInfo : " + userInfo);
		
		String userid = userInfo.get("id").toString();//정보에서 id 받아 저장
        MemberDto user = memberDao.getMemberByID(userid);//그 id로 db조회해서 저장
        
        
        if(user==null) {
        	retMap.put("Signup", "N");//회원가입해야함
        	retMap.put("userInfo", userInfo);//회원가입을 위한 user 정보 전달
        }  else {
	        retMap.put("Signup", "Y");//회원가입되어있음
	        Authentication auth = new UserAuthentication(userid, null, null);
            String token = JwtTokenProvider.generateToken(auth, userid);//토큰발급
            //System.out.println("token=" + token); //토큰 확인
            retMap.put("token", token);//토근전달
            retMap.put("id", userid);//id 전달
            int usercode = user.getUsercode();//사용편의를 위한 usercode저장
            retMap.put("usercode", usercode);//usercode 전달
        }
		
    	return retMap;
    	
    }
    
    /**
     * 네이버 로그인시 사용자 정보 가져옴
     * 
     * @param naverAccessToken
     * @return
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
	public HashMap<String, Object> getNaverinfo(String naverAccessToken) throws Exception {
    	HashMap<String, Object> retMap = new HashMap<String, Object>();
    	
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + naverAccessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> accountInfoRequest = new HttpEntity<>(headers);

        ResponseEntity<String> accountInfoResponse = rt.postForEntity(
        		"https://openapi.naver.com/v1/nid/me",
                accountInfoRequest,
                String.class
        );
        
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        
    	retMap = objectMapper.readValue(accountInfoResponse.getBody(), HashMap.class);
        
        return retMap;
    }
    
    /**
     * 카카오 로그아웃
     * 
     * @param reqMap
     * @return
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
	public HashMap<String, Object> logoutKakao(HashMap<String, Object> reqMap) throws Exception {
    	HashMap<String, Object> retMap = new HashMap<String, Object>();
    	
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        String url = "https://kauth.kakao.com/oauth/logout?client_id=" + reqMap.get("client") + "&logout_redirect_uri=" + reqMap.get("logoutRedirectUrl");
        
        System.out.println("===== " + url);
        
    	retMap.put("url", url);
        
        return retMap;
    }
    
}
