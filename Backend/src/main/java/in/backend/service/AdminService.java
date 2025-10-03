package in.backend.service;

import in.backend.repository.UserRepository;
import in.backend.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepo;
    private final OrderRepository orderRepo;

    public DashboardStats getDashboardStats() {
        // Total customers
        long totalCustomers = userRepo.count();

        // Total orders in current month
        YearMonth currentMonth = YearMonth.now();
        LocalDateTime startOfMonth = currentMonth.atDay(1).atStartOfDay();
        LocalDateTime endOfMonth = currentMonth.atEndOfMonth().atTime(LocalTime.MAX);

        long totalOrdersThisMonth = orderRepo.countByCreatedAtBetween(startOfMonth, endOfMonth);

        return new DashboardStats(totalCustomers, totalOrdersThisMonth);
    }

    // DTO for dashboard
    public record DashboardStats(long totalCustomers, long totalOrdersThisMonth) {}
}
