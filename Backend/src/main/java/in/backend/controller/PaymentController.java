package in.backend.controller;

import in.backend.entity.Booking;
import in.backend.entity.OrderEntity;
import in.backend.enums.PaymentStatus;
import in.backend.repository.BookingRepository;
import in.backend.service.OrderService;
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

    @Autowired
    private OrderService orderService;

    // Create Razorpay order
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

    // Return Razorpay key
    @GetMapping("/key")
    public ResponseEntity<Map<String, String>> getKey() {
        String key = paymentService.getKeyId();
        if (key == null || key.isEmpty()) {
            return ResponseEntity.status(500).body(Map.of("error", "Razorpay key not configured"));
        }
        return ResponseEntity.ok(Map.of("key", key));
    }

    // Confirm payment, save order, update booking
    @PostMapping("/confirm")
    public ResponseEntity<Map<String, String>> confirmPayment(@RequestBody Map<String, String> payload) {
        try {
            String paymentId = payload.get("paymentId");
            String razorpayOrderId = payload.get("razorpayOrderId"); // optional
            Long bookingId = Long.parseLong(payload.get("bookingId"));

            // Fetch booking
            Booking booking = bookingRepository.findById(bookingId)
                    .orElseThrow(() -> new RuntimeException("Booking not found"));

            // Update booking status
            booking.setStatus(PaymentStatus.PAID);
            bookingRepository.save(booking);

            // Calculate amount safely
            Double amount = booking.getBookedService() != null ? booking.getBookedService().getPrice() : 0.0;

            // Create order in database
            OrderEntity order = orderService.createOrder(booking.getId(), razorpayOrderId, amount);
            order.setRazorpayPaymentId(paymentId);
            order.setStatus(PaymentStatus.PAID);
            orderService.updateOrderStatus(order.getId(), PaymentStatus.PAID);

            // Send PDF receipt
            pdfEmailService.sendBookingReceipt(booking, paymentId);

            return ResponseEntity.ok(Map.of(
                    "message", "Payment confirmed, order created, and email sent",
                    "orderId", order.getId().toString(),
                    "paymentId", paymentId
            ));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                    "error", "Failed to confirm payment or create order: " + e.getMessage()
            ));
        }
    }
}
