package in.backend.service;

import in.backend.entity.Booking;
import in.backend.enums.PaymentStatus;
import in.backend.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // Save a new booking
    public Booking saveBooking(Booking booking) {
        if (booking == null) throw new IllegalArgumentException("Booking cannot be null");
        return bookingRepository.save(booking);
    }

    // Get all bookings
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Get bookings by status
    public List<Booking> getBookingsByStatus(PaymentStatus status) {
        if (status == null) throw new IllegalArgumentException("Booking status cannot be null");
        return bookingRepository.findByStatus(status);
    }

    // Get booking by ID
    public Optional<Booking> getBookingById(Long id) {
        if (id == null) return Optional.empty();
        return bookingRepository.findById(id);
    }

    // Update booking
    public Booking updateBooking(Booking booking) {
        if (booking == null || booking.getId() == null)
            throw new IllegalArgumentException("Booking or booking ID cannot be null");
        return bookingRepository.save(booking);
    }

    // Delete booking by ID
    public void deleteBooking(Long id) {
        if (id == null) throw new IllegalArgumentException("Booking ID cannot be null");
        bookingRepository.deleteById(id);
    }

    // Update booking status
    public Booking updateBookingStatus(Long id, PaymentStatus status) {
        if (status == null) throw new IllegalArgumentException("Booking status cannot be null");

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found with ID: " + id));

        booking.setStatus(status);
        return bookingRepository.save(booking);
    }
}
