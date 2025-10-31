package com.geotrack.mobility.service;

import com.geotrack.mobility.model.Location;
import com.geotrack.mobility.model.Vehicle;
import com.geotrack.mobility.repository.LocationRepository;
import com.geotrack.mobility.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationService {
    
    private final LocationRepository locationRepository;
    private final VehicleRepository vehicleRepository;
    
    public List<Location> getLocationsByVehicle(Long vehicleId) {
        return locationRepository.findByVehicleIdOrderByTimestampDesc(vehicleId);
    }
    
    public List<Location> getLocationsByVehicleAndTimeRange(Long vehicleId, LocalDateTime start, LocalDateTime end) {
        return locationRepository.findByVehicleIdAndTimestampBetween(vehicleId, start, end);
    }
    
    @Transactional
    public Location recordLocation(Long vehicleId, Double latitude, Double longitude, Double speed, Double heading) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
            .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        
        Location location = new Location();
        location.setVehicle(vehicle);
        location.setLatitude(latitude);
        location.setLongitude(longitude);
        location.setSpeed(speed);
        location.setHeading(heading);
        
        // Update vehicle's current location
        vehicle.setCurrentLatitude(latitude);
        vehicle.setCurrentLongitude(longitude);
        vehicle.setCurrentSpeed(speed);
        vehicle.setLastLocationUpdate(LocalDateTime.now());
        vehicleRepository.save(vehicle);
        
        return locationRepository.save(location);
    }
    
    public double calculateDistance(Double lat1, Double lon1, Double lat2, Double lon2) {
        // Haversine formula to calculate distance between two coordinates
        final int R = 6371; // Radius of the earth in km
        
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        return R * c;
    }
}
