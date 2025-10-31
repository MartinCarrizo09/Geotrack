package com.geotrack.mobility.repository;

import com.geotrack.mobility.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    Optional<Vehicle> findByLicensePlate(String licensePlate);
    List<Vehicle> findByDriverId(Long driverId);
    List<Vehicle> findByStatus(Vehicle.VehicleStatus status);
    
    @Query("SELECT v FROM Vehicle v WHERE v.currentLatitude IS NOT NULL AND v.currentLongitude IS NOT NULL")
    List<Vehicle> findAllWithLocation();
}
