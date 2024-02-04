package login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import login.repository.LoginDao;
import mypage.data.MemberDto;

@Service
public class LoginServiceImpl implements LoginService {
    private final LoginDao loginDao;

    @Autowired
    public LoginServiceImpl(LoginDao loginDao) {
        this.loginDao = loginDao;
    }

    @Override
    public MemberDto getLogin(String userid) {
        return loginDao.findByUserid(userid);
    }
}
