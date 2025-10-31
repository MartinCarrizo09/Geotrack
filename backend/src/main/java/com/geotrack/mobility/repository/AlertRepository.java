package com.geotrack.mobility.repository;

import com.geotrack.mobility.model.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {
    List<Alert> findByVehicleId(Long vehicleId);
    List<Alert> findByResolved(Boolean resolved);
    List<Alert> findByType(Alert.AlertType type);
    List<Alert> findBySeverity(Alert.AlertSeverity severity);
    List<Alert> findByResolvedFalseOrderByCreatedAtDesc();
}
