package in.backend.controller;

import in.backend.dto.ServicesResponse;
import in.backend.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    // Public GET
    @GetMapping
    public ResponseEntity<List<ServicesResponse>> getAllServices() {
        return ResponseEntity.ok(serviceService.getAllServices());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServicesResponse> getServiceById(@PathVariable Long id) {
        ServicesResponse service = serviceService.getServiceById(id);
        return service != null ? ResponseEntity.ok(service) : ResponseEntity.notFound().build();
    }

    // Admin POST
    @PostMapping
    public ResponseEntity<ServicesResponse> createService(
            @RequestBody ServicesResponse dto,
            Authentication auth) {

        if (auth == null || !auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok(serviceService.createService(dto));
    }

    // Admin PUT
    @PutMapping("/{id}")
    public ResponseEntity<ServicesResponse> updateService(
            @PathVariable Long id,
            @RequestBody ServicesResponse dto,
            Authentication auth) {

        if (auth == null || !auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        ServicesResponse updated = serviceService.updateService(id, dto);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    // Admin DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id, Authentication auth) {
        if (auth == null || !auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        serviceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }
}
