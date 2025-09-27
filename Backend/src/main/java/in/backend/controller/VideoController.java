package in.backend.controller;

import in.backend.entity.Video;
import in.backend.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@RestController
@RequestMapping("/api/videos")
@CrossOrigin(origins = "http://localhost:3000")
public class VideoController {

    private static final String UPLOAD_DIR = "uploads/videos/";

    @Autowired
    private VideoService videoService;

    // Add video
    @PostMapping("/add")
    public ResponseEntity<?> addVideo(
            @RequestParam("title") String title,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "url", required = false) String url
    ) {
        try {
            String videoUrl = null;

            if (file != null && !file.isEmpty()) {
                String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                File uploadDir = new File(UPLOAD_DIR);
                if (!uploadDir.exists()) uploadDir.mkdirs();

                Path path = Paths.get(UPLOAD_DIR + fileName);
                Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

                videoUrl = "http://localhost:8080/videos/" + fileName;
            } else if (url != null && !url.isEmpty()) {
                videoUrl = url;
            } else {
                return ResponseEntity.badRequest().body("Either file or URL must be provided");
            }

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

    // Get all videos
    @GetMapping
    public ResponseEntity<List<Video>> getAllVideos() {
        return ResponseEntity.ok(videoService.getAllVideos());
    }

    // Get video by ID
    @GetMapping("/{id}")
    public ResponseEntity<Video> getVideoById(@PathVariable Long id) {
        return videoService.getVideoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update video
    @PutMapping("/{id}")
    public ResponseEntity<Video> updateVideo(@PathVariable Long id, @RequestBody Video updatedVideo) {
        try {
            Video video = videoService.updateVideo(id, updatedVideo);
            return ResponseEntity.ok(video);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete video
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVideo(@PathVariable Long id) {
        try {
            videoService.deleteVideo(id);
            return ResponseEntity.ok().body("Video deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
