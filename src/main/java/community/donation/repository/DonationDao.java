package community.donation.repository;

import mypage.repository.PointRecordRepository;
import org.springframework.stereotype.Repository;
import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class DonationDao {
    private DonationRepository donationRepository;
    public int getTotalDonation(){
        return donationRepository.getTotalDonation();
    }
}
