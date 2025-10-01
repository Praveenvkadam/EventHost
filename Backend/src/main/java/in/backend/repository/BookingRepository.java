package in.backend.repository;

import in.backend.entity.Booking;
import in.backend.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Fetch bookings by enum status
    List<Booking> findByStatus(PaymentStatus status);

    // Optional: fetch bookings by service ID
    List<Booking> findByBookedServiceId(Long serviceId);

    // Optional: fetch bookings by user email
    List<Booking> findByEmail(String email);
}
