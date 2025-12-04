package com.geotrack.mobility.controller;

import com.geotrack.mobility.model.Trip;
import com.geotrack.mobility.service.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trips")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TripController {
    
    private final TripService tripService;
    
    @GetMapping
    public ResponseEntity<List<Trip>> getAllTrips() {
        return ResponseEntity.ok(tripService.getAllTrips());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Trip> getTripById(@PathVariable Long id) {
        return tripService.getTripById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<Trip>> getTripsByVehicle(@PathVariable Long vehicleId) {
        return ResponseEntity.ok(tripService.getTripsByVehicle(vehicleId));
    }
    
    @GetMapping("/driver/{driverId}")
    public ResponseEntity<List<Trip>> getTripsByDriver(@PathVariable Long driverId) {
        return ResponseEntity.ok(tripService.getTripsByDriver(driverId));
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<Trip>> getActiveTrips() {
        return ResponseEntity.ok(tripService.getActivTrips());
    }
    
    @PostMapping
    public ResponseEntity<Trip> createTrip(@RequestBody Trip trip) {
        return ResponseEntity.ok(tripService.startTrip(trip));
    }
    
    @PostMapping("/start")
    public ResponseEntity<Trip> startTrip(@RequestBody Trip trip) {
        return ResponseEntity.ok(tripService.startTrip(trip));
    }
    
    @PutMapping("/{id}/end")
    public ResponseEntity<Trip> endTrip(
            @PathVariable Long id,
            @RequestParam Double endLatitude,
            @RequestParam Double endLongitude,
            @RequestParam(required = false) String endAddress) {
        return ResponseEntity.ok(tripService.endTrip(id, endLatitude, endLongitude, endAddress));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable Long id) {
        tripService.deleteTrip(id);
        return ResponseEntity.ok().build();
    }
}
