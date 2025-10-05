package in.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "services")
public class Services {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;  // Service title

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private Double price;

    private String image1;
    private String image2;
    private String image3;
    private String image4;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    public String getServiceTitle() {
        return this.name;
    }
}
