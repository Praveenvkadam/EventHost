package in.backend.controller;

import in.backend.dto.ServicesResponse;
import in.backend.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:5173") 
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    // ✅ Get all services
    @GetMapping
    public ResponseEntity<List<ServicesResponse>> getAllServices() {
        return ResponseEntity.ok(serviceService.getAllServices());
    }

    // ✅ Get service by ID
    @GetMapping("/{id}")
    public ResponseEntity<ServicesResponse> getServiceById(@PathVariable Long id) {
        ServicesResponse service = serviceService.getServiceById(id);
        return (service != null) ? ResponseEntity.ok(service) : ResponseEntity.notFound().build();
    }

    // ✅ Create new service
    @PostMapping
    public ResponseEntity<ServicesResponse> createService(@RequestBody ServicesResponse serviceResponse) {
        ServicesResponse created = serviceService.createService(serviceResponse);
        return ResponseEntity.ok(created);
    }

    // ✅ Update service
    @PutMapping("/{id}")
    public ResponseEntity<ServicesResponse> updateService(
            @PathVariable Long id,
            @RequestBody ServicesResponse serviceResponse) {
        ServicesResponse updated = serviceService.updateService(id, serviceResponse);
        return (updated != null) ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    // ✅ Delete service
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        serviceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }
}
