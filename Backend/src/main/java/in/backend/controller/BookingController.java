package in.backend.controller;

import in.backend.dto.BookingDTO;
import in.backend.entity.Booking;
import in.backend.entity.Service;
import in.backend.repository.BookingRepository;
import in.backend.repository.ServiceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173") // frontend URL
public class BookingController {

    private final BookingRepository bookingRepository;
    private final ServiceRepository serviceRepository;

    public BookingController(BookingRepository bookingRepository, ServiceRepository serviceRepository) {
        this.bookingRepository = bookingRepository;
        this.serviceRepository = serviceRepository;
    }

    // ✅ Save booking form along with linked service
    @PostMapping
    public ResponseEntity<BookingDTO> saveBooking(@RequestBody Booking booking) {
        if (booking.getBookedService() != null && booking.getBookedService().getId() != null) {
            Service service = serviceRepository.findById(booking.getBookedService().getId()).orElse(null);
            booking.setBookedService(service);
        }
        booking.setStatus("pending"); // default status
        Booking savedBooking = bookingRepository.save(booking);
        return ResponseEntity.ok(new BookingDTO(savedBooking));
    }

    // ✅ Get all bookings (optionally filter by status)
    @GetMapping
    public ResponseEntity<List<BookingDTO>> getAllBookings(@RequestParam(required = false) String status) {
        List<Booking> bookings = (status != null)
                ? bookingRepository.findByStatus(status)
                : bookingRepository.findAll();

        List<BookingDTO> dtos = bookings.stream()
                .map(BookingDTO::new)
                .toList();

        return ResponseEntity.ok(dtos);
    }

    // ✅ Update booking
    @PutMapping("/{id}")
    public ResponseEntity<BookingDTO> updateBooking(@PathVariable Long id, @RequestBody Booking updatedBooking) {
        return bookingRepository.findById(id)
                .map(booking -> {
                    booking.setGuests(updatedBooking.getGuests());
                    booking.setEventDate(updatedBooking.getEventDate());
                    booking.setEventTime(updatedBooking.getEventTime());
                    booking.setVenue(updatedBooking.getVenue());
                    booking.setAddress(updatedBooking.getAddress());
                    booking.setNotes(updatedBooking.getNotes());
                    booking.setStatus(updatedBooking.getStatus());
                    Booking saved = bookingRepository.save(booking);
                    return ResponseEntity.ok(new BookingDTO(saved));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Delete / cancel booking
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        if (bookingRepository.existsById(id)) {
            bookingRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
