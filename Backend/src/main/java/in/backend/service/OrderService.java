package in.backend.service;

import in.backend.entity.OrderEntity;
import in.backend.enums.PaymentStatus;
import in.backend.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // Create a new order
    public OrderEntity createOrder(Long bookingId, String razorpayOrderId, Double amount) {
        OrderEntity order = OrderEntity.builder()
                .bookingId(bookingId)
                .razorpayOrderId(razorpayOrderId)
                .amount(amount)
                .status(PaymentStatus.CREATED)
                .build(); // createdAt will be set automatically
        return orderRepository.save(order);
    }

    // Confirm payment by updating payment ID and status
    public OrderEntity confirmPayment(Long orderId, String razorpayPaymentId, PaymentStatus status) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        order.setRazorpayPaymentId(razorpayPaymentId);
        if (status != null) {
            order.setStatus(status);
        }
        return orderRepository.save(order);
    }

    // Fetch all orders
    public List<OrderEntity> getAllOrders() {
        return orderRepository.findAll();
    }

    // Fetch single order by ID
    public OrderEntity getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + id));
    }

    // Update order status (admin)
    public OrderEntity updateOrderStatus(Long id, PaymentStatus status) {
        OrderEntity order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + id));
        order.setStatus(status);
        return orderRepository.save(order);
    }
}
