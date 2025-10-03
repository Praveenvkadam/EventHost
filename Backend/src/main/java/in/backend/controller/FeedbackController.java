package in.backend.controller;
import in.backend.entity.Feedback;
import in.backend.service.FeedbackService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:3000") // change to your React port
public class FeedbackController {

    private final FeedbackService service;

    public FeedbackController(FeedbackService service) {
        this.service = service;
    }

    @PostMapping
    public Feedback addFeedback(@RequestBody Feedback feedback) {
        return service.saveFeedback(feedback);
    }

    @GetMapping
    public List<Feedback> getFeedbacks() {
        return service.getAllFeedback();
    }
    
    @DeleteMapping("/{id}")
    public void deleteFeedback(@PathVariable Long id) {
        service.deleteFeedback(id);
    }
}

