package in.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import in.backend.entity.Video;
import in.backend.repository.VideoRepository;

@Service
public class VideoService {

    private final VideoRepository videoRepository;

    public VideoService(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    // Add new video
    public Video addVideo(Video video) {
        return videoRepository.save(video);
    }

    // Get all videos
    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    // Get video by ID
    public Optional<Video> getVideoById(Long id) {
        return videoRepository.findById(id);
    }

    // Update video (title or URL)
    public Video updateVideo(Long id, Video updatedVideo) {
        return videoRepository.findById(id).map(video -> {
            video.setTitle(updatedVideo.getTitle());
            video.setUrl(updatedVideo.getUrl());
            return videoRepository.save(video);
        }).orElseThrow(() -> new RuntimeException("Video not found with id " + id));
    }

    // Delete video
    public void deleteVideo(Long id) {
        if (videoRepository.existsById(id)) {
            videoRepository.deleteById(id);
        } else {
            throw new RuntimeException("Video not found with id " + id);
        }
    }
}
