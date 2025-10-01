package in.backend.dto;

import java.time.LocalDateTime;

import in.backend.entity.OrderEntity;
import lombok.Data;

@Data
public class OrderDTO {
    private Long id;
    private Long bookingId;
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private Double amount;
    private String status;
    private LocalDateTime createdAt;

    public OrderDTO(OrderEntity order) {
        this.id = order.getId();
        this.bookingId = order.getBookingId();
        this.razorpayOrderId = order.getRazorpayOrderId();
        this.razorpayPaymentId = order.getRazorpayPaymentId();
        this.amount = order.getAmount();
        this.status = order.getStatus().name();
        this.createdAt = order.getCreatedAt();
    }
}

