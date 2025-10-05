package in.backend.service;

import in.backend.dto.ServicesResponse;
import java.util.List;

public interface ServiceService {
    List<ServicesResponse> getAllServices();
    ServicesResponse getServiceById(Long id);
    ServicesResponse createService(ServicesResponse serviceResponse);
    ServicesResponse updateService(Long id, ServicesResponse serviceResponse);
    void deleteService(Long id);
}
