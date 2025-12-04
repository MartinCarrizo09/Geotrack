package com.geotrack.mobility.service;

import com.geotrack.mobility.model.Trip;
import com.geotrack.mobility.model.User;
import com.geotrack.mobility.model.Vehicle;
import com.geotrack.mobility.repository.TripRepository;
import com.geotrack.mobility.repository.UserRepository;
import com.geotrack.mobility.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TripService {
    
    private final TripRepository tripRepository;
    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;
    
    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }
    
    public Optional<Trip> getTripById(Long id) {
        return tripRepository.findById(id);
    }
    
    public List<Trip> getTripsByVehicle(Long vehicleId) {
        return tripRepository.findByVehicleId(vehicleId);
    }
    
    public List<Trip> getTripsByDriver(Long driverId) {
        return tripRepository.findByDriverId(driverId);
    }
    
    public List<Trip> getActivTrips() {
        return tripRepository.findByStatus(Trip.TripStatus.IN_PROGRESS);
    }
    
    @Transactional
    public Trip startTrip(Trip trip) {
        // Si el trip viene con vehicleId y driverId en lugar de objetos, cargarlos
        if (trip.getVehicle() != null && trip.getVehicle().getId() != null) {
            Vehicle vehicle = vehicleRepository.findById(trip.getVehicle().getId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
            trip.setVehicle(vehicle);
        }
        
        if (trip.getDriver() != null && trip.getDriver().getId() != null) {
            User driver = userRepository.findById(trip.getDriver().getId())
                .orElseThrow(() -> new RuntimeException("Driver not found"));
            trip.setDriver(driver);
        }
        
        trip.setStartTime(LocalDateTime.now());
        trip.setStatus(Trip.TripStatus.IN_PROGRESS);
        return tripRepository.save(trip);
    }
    
    @Transactional
    public Trip endTrip(Long id, Double endLat, Double endLon, String endAddress) {
        Trip trip = tripRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Trip not found"));
        
        trip.setEndTime(LocalDateTime.now());
        trip.setEndLatitude(endLat);
        trip.setEndLongitude(endLon);
        trip.setEndAddress(endAddress);
        trip.setStatus(Trip.TripStatus.COMPLETED);
        
        return tripRepository.save(trip);
    }
    
    @Transactional
    public void deleteTrip(Long id) {
        tripRepository.deleteById(id);
    }
}
