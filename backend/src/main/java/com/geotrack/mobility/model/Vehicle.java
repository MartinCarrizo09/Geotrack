package com.geotrack.mobility.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "vehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String licensePlate;
    
    @Column(nullable = false)
    private String brand;
    
    @Column(nullable = false)
    private String model;
    
    private Integer year;
    
    @Column(nullable = false)
    private String color;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VehicleType type;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VehicleStatus status = VehicleStatus.ACTIVE;
    
    @ManyToOne
    @JoinColumn(name = "driver_id")
    private User driver;
    
    @Column(name = "latitud_actual")
    private Double currentLatitude;
    
    @Column(name = "longitud_actual")
    private Double currentLongitude;
    
    @Transient
    private Double currentSpeed;
    
    @Column(columnDefinition = "TEXT")
    private String deviceId;
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    private LocalDateTime lastLocationUpdate;
    
    public enum VehicleType {
        CAR,
        TRUCK,
        MOTORCYCLE,
        VAN,
        BUS
    }
    
    public enum VehicleStatus {
        ACTIVE,
        INACTIVE,
        MAINTENANCE,
        OUT_OF_SERVICE
    }
}
