package in.backend.controller;

import in.backend.entity.Booking;
import in.backend.repository.BookingRepository;
import in.backend.service.PdfEmailService;
import in.backend.service.PaymentService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private PdfEmailService pdfEmailService;

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/create-order")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestParam double amount) {
        try {
            JSONObject order = paymentService.createOrder(amount);
            return ResponseEntity.ok(order.toMap());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/key")
    public ResponseEntity<Map<String, String>> getKey() {
        return ResponseEntity.ok(Map.of("key", paymentService.getKeyId()));
    }

    @PostMapping("/confirm")
    public ResponseEntity<Map<String, String>> confirmPayment(@RequestBody Map<String, String> payload) {
        try {
            String paymentId = payload.get("paymentId");
            Long bookingId = Long.parseLong(payload.get("bookingId"));

            Booking booking = bookingRepository.findById(bookingId)
                    .orElseThrow(() -> new RuntimeException("Booking not found"));

            booking.setStatus("PAID");
            bookingRepository.save(booking);

            pdfEmailService.sendBookingReceipt(booking, paymentId);

            return ResponseEntity.ok(Map.of(
                    "message", "Payment confirmed and email sent",
                    "paymentId", paymentId
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                    "error", "Failed to confirm payment or send email: " + e.getMessage()
            ));
        }
    }
}