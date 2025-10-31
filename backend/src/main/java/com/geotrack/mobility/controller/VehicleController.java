package com.geotrack.mobility.controller;

import com.geotrack.mobility.model.Vehicle;
import com.geotrack.mobility.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehicles")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class VehicleController {
    
    private final VehicleService vehicleService;
    
    @GetMapping
    public ResponseEntity<List<Vehicle>> getAllVehicles() {
        return ResponseEntity.ok(vehicleService.getAllVehicles());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Long id) {
        return vehicleService.getVehicleById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/license/{licensePlate}")
    public ResponseEntity<Vehicle> getVehicleByLicensePlate(@PathVariable String licensePlate) {
        return vehicleService.getVehicleByLicensePlate(licensePlate)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/driver/{driverId}")
    public ResponseEntity<List<Vehicle>> getVehiclesByDriver(@PathVariable Long driverId) {
        return ResponseEntity.ok(vehicleService.getVehiclesByDriver(driverId));
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<Vehicle>> getActiveVehicles() {
        return ResponseEntity.ok(vehicleService.getActiveVehicles());
    }
    
    @GetMapping("/with-location")
    public ResponseEntity<List<Vehicle>> getVehiclesWithLocation() {
        return ResponseEntity.ok(vehicleService.getVehiclesWithLocation());
    }
    
    @PostMapping
    public ResponseEntity<Vehicle> createVehicle(@RequestBody Vehicle vehicle) {
        return ResponseEntity.ok(vehicleService.createVehicle(vehicle));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable Long id, @RequestBody Vehicle vehicle) {
        return ResponseEntity.ok(vehicleService.updateVehicle(id, vehicle));
    }
    
    @PutMapping("/{id}/location")
    public ResponseEntity<Void> updateVehicleLocation(
            @PathVariable Long id,
            @RequestParam Double latitude,
            @RequestParam Double longitude,
            @RequestParam(required = false) Double speed) {
        vehicleService.updateVehicleLocation(id, latitude, longitude, speed);
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.ok().build();
    }
}
