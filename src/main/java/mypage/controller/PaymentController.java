package mypage.controller;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import mypage.repository.MypageDao;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class PaymentController {

//	@Value("${iamport.key}")
//	private String restApiKey;
//	@Value("${iamport.secret}")
//	private String restApiSecret;

	private IamportClient iamportClient;

	@PostConstruct
	public void init() {
		this.iamportClient = new IamportClient("7035336281076508", "10NMa46OKhzUMcRzvzIeUBlk9xkX8TMsPT8xNbr8GCvAO7Cg5KLmSvzujHnIA0YMaTk36ArKik3Rvot2");
	}

	@PostMapping("/verifyIamport/{imp_uid}")
	public IamportResponse<Payment> paymentByImpUid(@PathVariable("imp_uid") String imp_uid) throws IamportResponseException, IOException {
        try {
            return iamportClient.paymentByImpUid(imp_uid);
        } catch (IamportResponseException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
