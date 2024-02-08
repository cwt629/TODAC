package com.example.demo.webcontroller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {
    @GetMapping(value = {"", "/login/callback", "/club", "/login" })
    public String accountRoute() {
        return "forward:/index.html";
    }
}
