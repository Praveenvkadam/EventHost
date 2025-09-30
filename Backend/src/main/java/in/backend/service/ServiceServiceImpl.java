package in.backend.service;

import in.backend.dto.ServicesResponse;
import in.backend.entity.Service;
import in.backend.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
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
    public ServicesResponse createService(ServicesResponse serviceResponse) {
        Service service = mapToEntity(serviceResponse);
        Service saved = serviceRepository.save(service);
        return mapToDto(saved);
    }

    @Override
    public ServicesResponse updateService(Long id, ServicesResponse serviceResponse) {
        return serviceRepository.findById(id).map(existing -> {
            existing.setName(serviceResponse.getTitle());
            existing.setDescription(serviceResponse.getDescription());
            existing.setPrice(serviceResponse.getPrice());
            existing.setImage1(serviceResponse.getImage1());
            existing.setImage2(serviceResponse.getImage2());
            existing.setImage3(serviceResponse.getImage3());
            existing.setImage4(serviceResponse.getImage4());
            Service updated = serviceRepository.save(existing);
            return mapToDto(updated);
        }).orElse(null);
    }

    @Override
    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }

    // ✅ Private helper method for mapping Service → DTO
    private ServicesResponse mapToDto(Service service) {
        if (service == null) return null;

        ServicesResponse dto = new ServicesResponse();
        dto.setId(service.getId());
        dto.setTitle(service.getName());
        dto.setDescription(service.getDescription());
        dto.setPrice(service.getPrice());
        dto.setImage1(service.getImage1());
        dto.setImage2(service.getImage2());
        dto.setImage3(service.getImage3());
        dto.setImage4(service.getImage4());
        dto.setUrlsFromImages(); // populate urls list if method exists in DTO
        return dto;
    }

    // ✅ Private helper method for mapping DTO → Service
    private Service mapToEntity(ServicesResponse dto) {
        if (dto == null) return null;

        Service service = new Service();
        service.setId(dto.getId());
        service.setName(dto.getTitle());
        service.setDescription(dto.getDescription());
        service.setPrice(dto.getPrice());
        service.setImage1(dto.getImage1());
        service.setImage2(dto.getImage2());
        service.setImage3(dto.getImage3());
        service.setImage4(dto.getImage4());
        return service;
    }
}
