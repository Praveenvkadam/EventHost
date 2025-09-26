package in.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import in.backend.entity.Video;
import in.backend.repository.VideoRepository;

@Service
public class VideoService {

    private final VideoRepository videoRepository;

    public VideoService(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    public Video addVideo(Video video) {
        return videoRepository.save(video);
    }

    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }
}
