package in.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "employees")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(length = 15)
    private String phone;

    @Column(name = "event_assigned", nullable = false)
    private String assignedEvent = "Not Assigned"; // default value

    @Column(nullable = false)
    private String status = "Pending";

    @Column(nullable = false)
    private boolean completed = false; // default value
}
