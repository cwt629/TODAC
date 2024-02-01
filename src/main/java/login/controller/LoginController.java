package login.controller;

import org.springframework.web.bind.annotation.RestController;

import login.repository.LoginDao;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class LoginController {
	private final LoginDao loginDao;

}
