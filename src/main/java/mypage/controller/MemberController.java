package mypage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import mypage.data.BadgeDto;
import mypage.repository.BadgeDao;
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
    @Autowired
    private final BadgeDao badgeDao;
    private String bucketName = "guest-hch";  // 버켓네임 지정
    private String folderName = "TODAC/profile";       // 저장할 폴더네임 지정
    private String uploadFilename;


    @PostMapping("/admin/memberlist")
    public Map<String,Object> memberList()
    {
    	Map<String, Object> map=new HashMap<>();
    	//List<MemberDto> user = memberDao.getAllMember();
    	List<MemberDto> user = memberDao.getAllUser();
    	map.put("user",user);
    	return map;
    }
    

    @PostMapping("/login/signupinsert")
    public Map<String, Object> insert(@RequestBody MemberDto dto) throws Exception {
    	Map<String, Object> retMap = new HashMap<String, Object>();
    	
        memberDao.insertMember(dto);

        //뉴비 뱃지 수여.
        BadgeDto badgeDto = new BadgeDto();
        dto = memberDao.getMemberByID(dto.getUserid());
        badgeDto.setMember(dto);
        badgeDto.setAchievename("뉴비");
        badgeDao.insertMembertoBadge(badgeDto);

        retMap.put("result", "success");
        //System.out.println(" =========================== : retMap : " + retMap);
        
        return retMap;
    }

    @PostMapping("/member/info")
    public MemberDto getMemberByID(@RequestParam("userid") String userid) throws Exception
    {
        return memberDao.getMemberByID(userid);
    }

    //서연 작성-받는 데이터값 usercode로 통일 시키려고 만들었씀
    @PostMapping("member/data")
    public MemberDto getMemberByData(@RequestParam("usercode") int usercode) throws Exception
    {
    	return memberDao.getMemberByData(usercode);
    }

    @DeleteMapping("/member/delete")
    public void delete(@RequestParam("usercode") int usercode)
    {
    	memberDao.deleteMember(usercode);
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
    public String memberinsert(@RequestBody MemberDto reqdto)
    {
        MemberDto dto = new MemberDto();
        dto = memberDao.getMemberByID(reqdto.getUserid());
        dto.setAddress(reqdto.getAddress());
        dto.setAddressplus(reqdto.getAddressplus());
        dto.setNickname(reqdto.getNickname());
        dto.setPhoto(reqdto.getPhoto());

        memberDao.insertMember(dto);
        uploadFilename=null;
        return "success";
    }

    @PostMapping("/equipbadge")
    public void equipBadge(@RequestBody MemberDto reqdto)
    {
        MemberDto dto = new MemberDto();
        dto = memberDao.getMemberByID(reqdto.getUserid());
        dto.setMybadge(reqdto.getMybadge());
        memberDao.insertMember(dto);
    }
}