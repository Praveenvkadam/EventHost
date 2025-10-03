package in.backend.service;
import in.backend.entity.Feedback;
import in.backend.repository.FeedbackRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {
    private final FeedbackRepo repo;

    public FeedbackService(FeedbackRepo repo) {
        this.repo = repo;
    }

    public Feedback saveFeedback(Feedback feedback) {
        return repo.save(feedback);
    }

    public List<Feedback> getAllFeedback() {
        return repo.findAll();
    }
    
    public void deleteFeedback(Long id) {
        repo.deleteById(id);
    }
}

