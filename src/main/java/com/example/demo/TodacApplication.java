package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"data.*","naver.storage","security.setting"})
public class TodacApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodacApplication.class, args);
	}

}
