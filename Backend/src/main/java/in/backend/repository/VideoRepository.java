package in.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import in.backend.entity.Video;

public interface VideoRepository extends JpaRepository<Video, Long> {
}
