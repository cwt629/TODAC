package login.service;

import mypage.data.MemberDto;

public interface LoginService {
	MemberDto getLogin(String userid);
}
