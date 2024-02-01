package community.donation.controller;

import org.springframework.web.bind.annotation.RestController;

import community.donation.repository.DonationDao;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class DonationController {
	private final DonationDao donationDao;

}
