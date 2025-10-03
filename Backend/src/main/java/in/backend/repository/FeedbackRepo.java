package in.backend.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import in.backend.entity.Feedback;

public interface FeedbackRepo extends JpaRepository<Feedback, Long> {
}

