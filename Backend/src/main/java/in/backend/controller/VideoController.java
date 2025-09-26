package in.backend.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import in.backend.entity.Video;
import in.backend.service.VideoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/videos")
@CrossOrigin(origins = "http://localhost:5173")
public class VideoController {

    private final VideoService videoService;
    private final Cloudinary cloudinary;

    public VideoController(VideoService videoService, Cloudinary cloudinary) {
        this.videoService = videoService;
        this.cloudinary = cloudinary;
    }

    // Upload video to Cloudinary and save to DB
    @PostMapping("/upload")
    public ResponseEntity<?> uploadVideo(@RequestParam("file") MultipartFile file,
                                         @RequestParam("title") String title) {
        try {
            Map uploadResult = cloudinary.uploader().uploadLarge(file.getBytes(),
                    ObjectUtils.asMap("resource_type", "video")); // for video files

            String videoUrl = uploadResult.get("secure_url").toString();

            Video video = new Video();
            video.setTitle(title);
            video.setUrl(videoUrl);

            Video savedVideo = videoService.addVideo(video);

            return ResponseEntity.ok(savedVideo);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Video upload failed");
        }
    }

    @GetMapping
    public ResponseEntity<List<Video>> getAllVideos() {
        return ResponseEntity.ok(videoService.getAllVideos());
    }
}
