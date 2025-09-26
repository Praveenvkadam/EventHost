package in.backend.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import in.backend.entity.Video;
import in.backend.service.VideoService;

@RestController
@RequestMapping("/api/videos")
@CrossOrigin(origins = "http://localhost:5173") // allow frontend
public class VideoController {

    private final VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @PostMapping("/add")
    public ResponseEntity<Video> addVideo(@RequestBody Video video) {
        Video savedVideo = videoService.addVideo(video);
        return ResponseEntity.ok(savedVideo);
    }

    @GetMapping
    public ResponseEntity<List<Video>> getAllVideos() {
        return ResponseEntity.ok(videoService.getAllVideos());
    }
}
