package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan({"chat.*","community.*","donation.*","smile.*","login.*","user.*","admin.*","member.*"
,"naver.storage","security.setting"})
@EntityScan("*.data")
@EnableJpaRepositories({"chat.repository","community.repository","donation.repository","smile.repository","login.repository","user.repository","admin.repository","member.repository"})
public class TodacApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodacApplication.class, args);
	}

}
