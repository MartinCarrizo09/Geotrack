package com.geotrack.mobility.service;

import com.geotrack.mobility.model.Vehicle;
import com.geotrack.mobility.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VehicleService {
    
    private final VehicleRepository vehicleRepository;
    
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }
    
    public Optional<Vehicle> getVehicleById(Long id) {
        return vehicleRepository.findById(id);
    }
    
    public Optional<Vehicle> getVehicleByLicensePlate(String licensePlate) {
        return vehicleRepository.findByLicensePlate(licensePlate);
    }
    
    public List<Vehicle> getVehiclesByDriver(Long driverId) {
        return vehicleRepository.findByDriverId(driverId);
    }
    
    public List<Vehicle> getActiveVehicles() {
        return vehicleRepository.findByStatus(Vehicle.VehicleStatus.ACTIVE);
    }
    
    public List<Vehicle> getVehiclesWithLocation() {
        return vehicleRepository.findAllWithLocation();
    }
    
    @Transactional
    public Vehicle createVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }
    
    @Transactional
    public Vehicle updateVehicle(Long id, Vehicle vehicleDetails) {
        Vehicle vehicle = vehicleRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        
        vehicle.setLicensePlate(vehicleDetails.getLicensePlate());
        vehicle.setBrand(vehicleDetails.getBrand());
        vehicle.setModel(vehicleDetails.getModel());
        vehicle.setYear(vehicleDetails.getYear());
        vehicle.setColor(vehicleDetails.getColor());
        vehicle.setType(vehicleDetails.getType());
        vehicle.setStatus(vehicleDetails.getStatus());
        vehicle.setDriver(vehicleDetails.getDriver());
        
        return vehicleRepository.save(vehicle);
    }
    
    @Transactional
    public void updateVehicleLocation(Long id, Double latitude, Double longitude, Double speed) {
        Vehicle vehicle = vehicleRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        
        vehicle.setCurrentLatitude(latitude);
        vehicle.setCurrentLongitude(longitude);
        vehicle.setCurrentSpeed(speed);
        vehicle.setLastLocationUpdate(LocalDateTime.now());
        
        vehicleRepository.save(vehicle);
    }
    
    @Transactional
    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }
}
