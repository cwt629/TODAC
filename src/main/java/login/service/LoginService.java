package login.service;

import java.util.HashMap;

import mypage.data.MemberDto;

public interface LoginService {
	
	//db에 id가 있는지 확인
	MemberDto getUser(String userid);
	
	/**
	 * 카카오 로그인 토큰 발급
	 * 
	 * @param reqMap
	 * @return
	 * @throws Exception
	 */
	public HashMap<String, Object> getKaKaoAccessToken(HashMap<String, Object> reqMap) throws Exception;
	
	/**
	 * 네이버 로그인 토큰 발급
	 * 
	 * @param reqMap
	 * @return
	 * @throws Exception
	 */
	public HashMap<String, Object> getNaverToken(HashMap<String, Object> reqMap) throws Exception;
}
