package com.geotrack.mobility.repository;

import com.geotrack.mobility.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByVehicleId(Long vehicleId);
    List<Trip> findByDriverId(Long driverId);
    List<Trip> findByStatus(Trip.TripStatus status);
    List<Trip> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);
}
