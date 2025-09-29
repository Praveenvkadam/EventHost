package in.backend.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import in.backend.dto.ImageRequestd;
import in.backend.entity.Image;
import in.backend.repository.ImageRepository;

@Service
public class ImageService {

    private final ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    // Get all images
    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }

    // Get image by ID
    public Optional<Image> getImageById(Long id) {
        return imageRepository.findById(id);
    }

    // Add image
    public Image addImage(ImageRequestd request) {
        List<String> urls = request.getUrls();
        if (urls == null || urls.size() != 4) {
            throw new IllegalArgumentException("Exactly 4 image URLs required");
        }

        Image image = Image.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .date(request.getDate() != null ? request.getDate() : LocalDate.now()) // ✅
                .image1(urls.get(0))
                .image2(urls.get(1))
                .image3(urls.get(2))
                .image4(urls.get(3))
                .build();

        return imageRepository.save(image);
    }

    // Update image
    public Image updateImage(Long id, ImageRequestd request) {
        Image image = imageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Image not found"));

        List<String> urls = request.getUrls();
        if (urls == null || urls.size() != 4) {
            throw new IllegalArgumentException("Exactly 4 image URLs required");
        }

        image.setTitle(request.getTitle());
        image.setDescription(request.getDescription());
        image.setDate(request.getDate() != null ? request.getDate() : LocalDate.now()); // ✅
        image.setImage1(urls.get(0));
        image.setImage2(urls.get(1));
        image.setImage3(urls.get(2));
        image.setImage4(urls.get(3));

        return imageRepository.save(image);
    }

    // Delete image
    public void deleteImage(Long id) {
        imageRepository.deleteById(id);
    }
}
