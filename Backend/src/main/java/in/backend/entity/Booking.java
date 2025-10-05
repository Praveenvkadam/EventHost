package in.backend.entity;

import in.backend.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String email;
    private String phone;
    private String eventDate;
    private String eventTime;
    private Integer guests;

    @Column(length = 1000)
    private String address;

    private String venue;

    @Column(length = 2000)
    private String notes;

    // Enum instead of String for status
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus status = PaymentStatus.PENDING;

    // Link to the booked service/event
    @ManyToOne
    @JoinColumn(name = "service_id")
    private Services bookedService;
}
