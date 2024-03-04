package mypage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {
    @GetMapping(value = {"", "/login/callback", "/login/logoutcallback", "/user/point/success","/board/detail/*", "/user/chat" })
    public String accountRoute() {
        return "forward:/index.html";
    }
}
