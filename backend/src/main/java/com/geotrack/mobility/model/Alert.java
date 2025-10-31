package com.geotrack.mobility.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "alerts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Alert {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AlertType type;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AlertSeverity severity;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private Double latitude;
    private Double longitude;
    
    @Column(nullable = false)
    private Boolean resolved = false;
    
    private LocalDateTime resolvedAt;
    
    @ManyToOne
    @JoinColumn(name = "resolved_by")
    private User resolvedBy;
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    public enum AlertType {
        OVERSPEED,
        GEOFENCE_EXIT,
        GEOFENCE_ENTER,
        LOW_FUEL,
        MAINTENANCE_DUE,
        EMERGENCY,
        IDLE_TIME_EXCEEDED,
        UNAUTHORIZED_MOVEMENT
    }
    
    public enum AlertSeverity {
        LOW,
        MEDIUM,
        HIGH,
        CRITICAL
    }
}
