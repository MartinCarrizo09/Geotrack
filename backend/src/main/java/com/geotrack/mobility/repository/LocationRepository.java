package com.geotrack.mobility.repository;

import com.geotrack.mobility.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    List<Location> findByVehicleIdOrderByTimestampDesc(Long vehicleId);
    
    @Query("SELECT l FROM Location l WHERE l.vehicle.id = :vehicleId AND l.timestamp BETWEEN :startTime AND :endTime ORDER BY l.timestamp")
    List<Location> findByVehicleIdAndTimestampBetween(
        @Param("vehicleId") Long vehicleId,
        @Param("startTime") LocalDateTime startTime,
        @Param("endTime") LocalDateTime endTime
    );
}
