package com.geotrack.mobility.service;

import com.geotrack.mobility.model.Alert;
import com.geotrack.mobility.repository.AlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AlertService {
    
    private final AlertRepository alertRepository;
    
    public List<Alert> getAllAlerts() {
        return alertRepository.findAll();
    }
    
    public Optional<Alert> getAlertById(Long id) {
        return alertRepository.findById(id);
    }
    
    public List<Alert> getAlertsByVehicle(Long vehicleId) {
        return alertRepository.findByVehicleId(vehicleId);
    }
    
    public List<Alert> getUnresolvedAlerts() {
        return alertRepository.findByResolvedFalseOrderByCreatedAtDesc();
    }
    
    @Transactional
    public Alert createAlert(Alert alert) {
        return alertRepository.save(alert);
    }
    
    @Transactional
    public Alert resolveAlert(Long id, Long resolvedByUserId) {
        Alert alert = alertRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Alert not found"));
        
        alert.setResolved(true);
        alert.setResolvedAt(LocalDateTime.now());
        
        return alertRepository.save(alert);
    }
    
    @Transactional
    public void deleteAlert(Long id) {
        alertRepository.deleteById(id);
    }
}
