package game.controller;

import java.util.HashMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
public class GameController {
	
	@PostMapping("/game/insertpoint")
	public @ResponseBody HashMap<String, Object> insertPoint(@RequestParam HashMap<String, Object> reqMap) throws Exception {
		HashMap<String, Object> retMap = new HashMap<String, Object>();
		
		System.out.println(" ============================ reqMap : " + reqMap);
		
		int score = Integer.parseInt(reqMap.get("score").toString()); 
		
		return retMap;
	}
}
