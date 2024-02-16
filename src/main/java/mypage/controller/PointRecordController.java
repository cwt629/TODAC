package mypage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import mypage.data.PointRecordDto;
import mypage.repository.PointRecordDao;
import naver.storage.NcpObjectStorageService;

@RestController
@RequiredArgsConstructor
public class PointRecordController {
	private final PointRecordDao pointRecordDao;
	@Autowired
	private final NcpObjectStorageService storageService;
    private String bucketName = "guest-hch";  // 버켓네임 지정
    private String folderName = "TODAC";       // 저장할 폴더네임 지정
    
    @PostMapping("/admin/payment")
    public List<PointRecordDto> getMemberPayMent(@RequestParam("usercode") int usercode)
    {
    	return pointRecordDao.getMemberPayMent(usercode);
    }
    
    @PostMapping("/admin/point")
    public List<PointRecordDto> getMemberPoint(@RequestParam("usercode") int usercode)
    {
    	return pointRecordDao.getMemberPoint(usercode);
    }
    

}
