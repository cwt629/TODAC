package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan({"chat.*","community.board.*","community.donation.*","login.*","admin.*","mypage.*", "game.*"
,"naver.storage","security.setting"})
@EntityScan({"*.data","*.*.data"})
@EnableJpaRepositories({"chat.repository","community.board.repository","community.donation.repository","game.repository","login.repository","admin.repository","mypage.repository"})
public class TodacApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodacApplication.class, args);
	}

}
