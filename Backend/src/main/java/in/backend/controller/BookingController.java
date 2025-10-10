package in.backend.controller;

import in.backend.dto.BookingDTO;
import in.backend.entity.Booking;
import in.backend.repository.BookingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // ✅ Get all bookings (converted to DTO)
    @GetMapping
    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(BookingDTO::new)
                .collect(Collectors.toList());
    }

    // ✅ Get single booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<BookingDTO> getBookingById(@PathVariable Long id) {
        return bookingRepository.findById(id)
                .map(b -> ResponseEntity.ok(new BookingDTO(b)))
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Create booking
    @PostMapping
    public ResponseEntity<BookingDTO> createBooking(@RequestBody Booking booking) {
        Booking saved = bookingRepository.save(booking);
        return ResponseEntity.ok(new BookingDTO(saved));
    }

    // Update booking
    @PutMapping("/{id}")
    public ResponseEntity<BookingDTO> updateBooking(@PathVariable Long id, @RequestBody Booking updatedBooking) {
        return bookingRepository.findById(id)
                .map(existing -> {
                    existing.setEventDate(updatedBooking.getEventDate());
                    existing.setEventTime(updatedBooking.getEventTime());
                    existing.setGuests(updatedBooking.getGuests());
                    existing.setVenue(updatedBooking.getVenue());
                    existing.setAddress(updatedBooking.getAddress());
                    existing.setNotes(updatedBooking.getNotes());
                    existing.setStatus(updatedBooking.getStatus());
                    existing.setFullName(updatedBooking.getFullName());
                    existing.setEmail(updatedBooking.getEmail());
                    existing.setPhone(updatedBooking.getPhone());
                    existing.setBookedService(updatedBooking.getBookedService());

                    Booking saved = bookingRepository.save(existing);
                    return ResponseEntity.ok(new BookingDTO(saved));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete booking
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        return bookingRepository.findById(id)
                .map(existing -> {
                    bookingRepository.delete(existing);
                    return ResponseEntity.noContent().<Void>build(); // explicitly Void
                })
                .orElseGet(() -> ResponseEntity.notFound().build()); // same type
    }

}
