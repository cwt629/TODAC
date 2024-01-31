package community.facemotion.controller;

import org.springframework.web.bind.annotation.RestController;

import community.facemotion.repository.FaceMotionDao;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class FaceMotionController {
	private final FaceMotionDao smileDao;

}
