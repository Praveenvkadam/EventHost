package in.backend.service;

import in.backend.dto.ServicesResponse;
import in.backend.entity.Services;  // <-- match the new entity name
import in.backend.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceServiceImpl implements ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    @Override
    public List<ServicesResponse> getAllServices() {
        return serviceRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ServicesResponse getServiceById(Long id) {
        return serviceRepository.findById(id)
                .map(this::mapToDto)
                .orElse(null);
    }

    @Override
    public ServicesResponse createService(ServicesResponse dto) {
        Services entity = mapToEntity(dto);
        Services saved = serviceRepository.save(entity);
        return mapToDto(saved);
    }

    @Override
    public ServicesResponse updateService(Long id, ServicesResponse dto) {
        return serviceRepository.findById(id).map(existing -> {
            existing.setName(dto.getTitle());
            existing.setDescription(dto.getDescription());
            existing.setPrice(dto.getPrice());
            existing.setImage1(dto.getImage1());
            existing.setImage2(dto.getImage2());
            existing.setImage3(dto.getImage3());
            existing.setImage4(dto.getImage4());
            Services updated = serviceRepository.save(existing);
            return mapToDto(updated);
        }).orElse(null);
    }

    @Override
    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }

    private ServicesResponse mapToDto(Services s) {
        ServicesResponse dto = new ServicesResponse();
        dto.setId(s.getId());
        dto.setTitle(s.getName());
        dto.setDescription(s.getDescription());
        dto.setPrice(s.getPrice());
        dto.setImage1(s.getImage1());
        dto.setImage2(s.getImage2());
        dto.setImage3(s.getImage3());
        dto.setImage4(s.getImage4());
        dto.setCreatedAt(s.getCreatedAt());
        dto.setUrlsFromImages();
        return dto;
    }

    private Services mapToEntity(ServicesResponse dto) {
        Services s = new Services();
        s.setName(dto.getTitle());
        s.setDescription(dto.getDescription());
        s.setPrice(dto.getPrice());
        s.setImage1(dto.getImage1());
        s.setImage2(dto.getImage2());
        s.setImage3(dto.getImage3());
        s.setImage4(dto.getImage4());
        return s;
    }
}
