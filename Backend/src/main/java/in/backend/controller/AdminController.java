package in.backend.controller;

import in.backend.service.AdminService;
import in.backend.service.AdminService.DashboardStats;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard-stats")
    public DashboardStats getDashboardStats() {
        return adminService.getDashboardStats();
    }
}
