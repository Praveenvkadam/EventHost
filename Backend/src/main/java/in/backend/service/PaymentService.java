package in.backend.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {

    private final String keyId = "rzp_test_RO95WFvJSfHfxv";
    private final String keySecret = "q1qTSYr3d5lHS2MoCkGhUSMT";

    public JSONObject createOrder(double amount) throws RazorpayException {
        // Initialize Razorpay client
        RazorpayClient client = new RazorpayClient(keyId, keySecret);

        // Build order options
        Map<String, Object> optionsMap = new HashMap<>();
        optionsMap.put("amount", Math.round(amount * 100)); // in paise
        optionsMap.put("currency", "INR");
        optionsMap.put("receipt", "txn_" + System.currentTimeMillis());
        optionsMap.put("payment_capture", 1);

        JSONObject options = new JSONObject(optionsMap);

        // Create order
        Order order = client.orders.create(options);

        // Safely convert values to correct types
        String orderId = order.get("id").toString();
        long orderAmount;
        Object amountObj = order.get("amount");

        if (amountObj instanceof Number) {
            orderAmount = ((Number) amountObj).longValue();
        } else {
            orderAmount = Long.parseLong(amountObj.toString());
        }

        String currency = order.get("currency").toString();

        // Build response JSON
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("id", orderId);
        responseMap.put("amount", orderAmount);
        responseMap.put("currency", currency);

        return new JSONObject(responseMap);
    }

    public String getKeyId() {
        return keyId;
    }
}
