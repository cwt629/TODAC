package chat.controller;

import org.springframework.web.bind.annotation.RestController;

import chat.repository.ChatDao;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ChatController {
	private final ChatDao chatDao;

}
