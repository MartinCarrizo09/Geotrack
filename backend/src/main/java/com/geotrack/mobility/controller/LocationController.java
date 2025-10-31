package com.geotrack.mobility.controller;

import com.geotrack.mobility.model.Location;
import com.geotrack.mobility.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/locations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class LocationController {
    
    private final LocationService locationService;
    
    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<Location>> getLocationsByVehicle(@PathVariable Long vehicleId) {
        return ResponseEntity.ok(locationService.getLocationsByVehicle(vehicleId));
    }
    
    @GetMapping("/vehicle/{vehicleId}/range")
    public ResponseEntity<List<Location>> getLocationsByVehicleAndTimeRange(
            @PathVariable Long vehicleId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(locationService.getLocationsByVehicleAndTimeRange(vehicleId, start, end));
    }
    
    @PostMapping("/record")
    public ResponseEntity<Location> recordLocation(
            @RequestParam Long vehicleId,
            @RequestParam Double latitude,
            @RequestParam Double longitude,
            @RequestParam(required = false) Double speed,
            @RequestParam(required = false) Double heading) {
        return ResponseEntity.ok(locationService.recordLocation(vehicleId, latitude, longitude, speed, heading));
    }
    
    @GetMapping("/distance")
    public ResponseEntity<Double> calculateDistance(
            @RequestParam Double lat1,
            @RequestParam Double lon1,
            @RequestParam Double lat2,
            @RequestParam Double lon2) {
        return ResponseEntity.ok(locationService.calculateDistance(lat1, lon1, lat2, lon2));
    }
}
