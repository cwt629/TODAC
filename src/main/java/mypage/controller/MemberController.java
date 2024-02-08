package mypage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import mypage.data.MemberDto;
import mypage.repository.MemberDao;
import naver.storage.NcpObjectStorageService;

@RestController
@RequiredArgsConstructor
public class MemberController {
	@Autowired
	private final MemberDao memberDao;
    @Autowired
    private final NcpObjectStorageService storageService;
    private String bucketName = "guest-hch";  // 버켓네임 지정
    private String folderName = "TODAC";       // 저장할 폴더네임 지정


    @PostMapping("/admin/memberlist")
    public Map<String,Object> memberList()
    {
    	Map<String, Object> map=new HashMap<>();
    	List<MemberDto> user = memberDao.getAllMember();
    	map.put("user",user);
    	return map;
    }
    

    @PostMapping("/login/signupinsert")
    public Map<String, Object> insert(@RequestBody MemberDto dto) throws Exception {
    	Map<String, Object> retMap = new HashMap<String, Object>();
    	
        memberDao.insertMember(dto);
        
        retMap.put("result", "success");
        //System.out.println(" =========================== : retMap : " + retMap);
        
        return retMap;
    }

    @PostMapping("/member/info")
    public MemberDto getMemberByID(@RequestParam("userid") String userid)
    {
        return memberDao.getMemberByID(userid);
    }
    
    @DeleteMapping("/member/delete")
    public void delete(@RequestParam("userid") String userid)
    {
    	memberDao.deleteMember(userid);
    }
}