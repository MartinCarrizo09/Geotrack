package com.geotrack.mobility.controller;

import com.geotrack.mobility.model.Alert;
import com.geotrack.mobility.service.AlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alerts")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AlertController {
    
    private final AlertService alertService;
    
    @GetMapping
    public ResponseEntity<List<Alert>> getAllAlerts() {
        return ResponseEntity.ok(alertService.getAllAlerts());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Alert> getAlertById(@PathVariable Long id) {
        return alertService.getAlertById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<Alert>> getAlertsByVehicle(@PathVariable Long vehicleId) {
        return ResponseEntity.ok(alertService.getAlertsByVehicle(vehicleId));
    }
    
    @GetMapping("/unresolved")
    public ResponseEntity<List<Alert>> getUnresolvedAlerts() {
        return ResponseEntity.ok(alertService.getUnresolvedAlerts());
    }
    
    @PostMapping
    public ResponseEntity<Alert> createAlert(@RequestBody Alert alert) {
        return ResponseEntity.ok(alertService.createAlert(alert));
    }
    
    @PutMapping("/{id}/resolve")
    public ResponseEntity<Alert> resolveAlert(
            @PathVariable Long id,
            @RequestParam Long resolvedByUserId) {
        return ResponseEntity.ok(alertService.resolveAlert(id, resolvedByUserId));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlert(@PathVariable Long id) {
        alertService.deleteAlert(id);
        return ResponseEntity.ok().build();
    }
}
