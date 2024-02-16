package community.donation.repository;

import mypage.repository.PointRecordRepository;
import org.springframework.stereotype.Repository;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Map;

@Repository
@AllArgsConstructor
public class DonationDao {
    private DonationRepository donationRepository;
    public int getTotalDonation(){
        return donationRepository.getTotalDonation();
    }

    public List<Map<String,Object>> getTop3Donor()
    {
        return donationRepository.getTop3Donor();

    }
}
