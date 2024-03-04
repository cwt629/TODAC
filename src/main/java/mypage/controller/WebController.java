package mypage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {
    @GetMapping(value = {"",
            "/login/callback", "/login/logoutcallback","/login",
            "/user","/user/chat","/user/chat/loglist","/user/chat/logcontent","/user/chat/summary","/user/chat/diagnosis",
            "/user/chat/counsel","/user/chat/custom",
            "/user/community/","/user/community/donation","/user/community/game",
            "/board","/board/*" ,"/board/detail","/board/detail/*","/board/form","/board/updateform","/board/updateform/*",
            "/user/point","/user/point/charge","/user/point/checkout","/user/point/success","/user/point/fail",
            "/user/myboard","/user/donate","user/update","/user/badge","/user/inquiry","/user/inquiry/form",
            "/user/inquiry/detail","/user/inquiry/detail/*",
            "/user/faq",
            "/admin","/login/admin",
            "/admin/MemberManage","/admin/MemberManage/MemberProfile","/admin/MemberManage/MemberProfile/MemberPost",
            "/admin/MemberManage/MemberProfile/MemberComment","/admin/MemberManage/MemberProfile/MemberPayment",
            "/admin/MemberManage/MemberProfile/MemberPoint","/admin/MemberManage/MemberProfile/MemberChatSearch",
            "/admin/InquiryHistory","/admin/InquiryHistory/InquiryHistoryDetail","/admin/InquiryHistory/InquiryHistoryDetail/*"})
    public String accountRoute() {
        return "forward:/index.html";
    }
}
