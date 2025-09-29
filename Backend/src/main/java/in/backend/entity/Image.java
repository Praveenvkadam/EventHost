package in.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @JsonFormat(pattern = "yyyy-MM-dd")  // ✅ Always return YYYY-MM-DD
    private LocalDate date;

    private String image1;
    private String image2;
    private String image3;
    private String image4;
}
