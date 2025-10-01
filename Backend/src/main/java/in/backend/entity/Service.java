package in.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "services")
public class Service {

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

    // Convenience method
    public String getServiceTitle() {
        return this.name;
    }
}
