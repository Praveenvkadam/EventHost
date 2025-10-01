package in.backend.controller;

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

    // Create Razorpay order
    @GetMapping("/create-order")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestParam double amount) {
        try {
            JSONObject order = paymentService.createOrder(amount);
            return ResponseEntity.ok(order.toMap());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(500)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Get Razorpay key
    @GetMapping("/key")
    public ResponseEntity<Map<String, String>> getKey() {
        return ResponseEntity.ok(Map.of("key", paymentService.getKeyId()));
    }
}
