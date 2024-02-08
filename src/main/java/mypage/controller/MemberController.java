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
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class MemberController {
	@Autowired
	private final MemberDao memberDao;
    @Autowired
    private final NcpObjectStorageService storageService;
    private String bucketName = "guest-hch";  // 버켓네임 지정
    private String folderName = "TODAC";       // 저장할 폴더네임 지정
    private String uploadFilename;


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

    @PostMapping("/member/nicknamecheck")
    public int nickNameCheck(@RequestParam("nickname") String nickname){
        int count = memberDao.nickNameCheck(nickname);
        return count;
    }

    //가입시 먼저 사진 저장
    @PostMapping("/member/upload")
    public String uploadFile(@RequestParam("upload") MultipartFile upload)
    {
        uploadFilename=storageService.uploadFile(bucketName, folderName, upload);
        return uploadFilename;
    }

    @PostMapping("/member/insert")
    public String memberinsert(@RequestBody MemberDto dto)
    {

        //업로드된 사진
        String cloudimgurl = "https://kr.object.ncloudstorage.com/guest-hch/TODAC/";
        dto.setPhoto(cloudimgurl+uploadFilename);

        memberDao.insertMember(dto);
        uploadFilename=null;
        return "success";
    }

}