package admin.controller;

import org.springframework.web.bind.annotation.RestController;

import admin.repository.AdminDao;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AdminController {
	private final AdminDao adminDao;

}
