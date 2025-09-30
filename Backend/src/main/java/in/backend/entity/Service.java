package in.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity   // ✅ Must add this annotation
@Table(name = "services")
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ✅ For auto increment id
    private Long id;

    private String name;
    private String description;
    private Double price;

    private String image1;
    private String image2;
    private String image3;
    private String image4;
}
