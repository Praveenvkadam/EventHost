package in.backend.repository;

import in.backend.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    // Fetch bookings by status
    List<Booking> findByStatus(String status);
}
