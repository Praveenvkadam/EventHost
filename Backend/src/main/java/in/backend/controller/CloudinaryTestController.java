package in.backend.controller;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.io.File;
import java.util.Map;

@RestController
@RequestMapping("/api/test-cloudinary")
public class CloudinaryTestController {

    private final Cloudinary cloudinary;

    public CloudinaryTestController(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @GetMapping("/upload-sample")
    public ResponseEntity<String> uploadSample() {
        try {
            // Replace with a real local file path
            File sampleFile = new File("src/main/resources/static/sample.jpg");

            Map uploadResult = cloudinary.uploader().upload(sampleFile, ObjectUtils.emptyMap());

            // The URL of uploaded file
            String url = (String) uploadResult.get("secure_url");

            return ResponseEntity.ok("Upload successful! URL: " + url);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Upload failed: " + e.getMessage());
        }
    }
}

