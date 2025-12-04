import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import { Icon } from 'leaflet'
import { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'

const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const activeIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const highlightedIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [35, 57],
  iconAnchor: [17, 57],
})

const startIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

// Component to handle map centering
function MapController({ selectedTrip }) {
  const map = useMap()
  
  useEffect(() => {
    if (selectedTrip?.vehicle?.currentLatitude && selectedTrip?.vehicle?.currentLongitude) {
      map.flyTo([selectedTrip.vehicle.currentLatitude, selectedTrip.vehicle.currentLongitude], 15, {
        duration: 1.5
      })
    }
  }, [selectedTrip, map])
  
  return null
}

function MapComponent({ vehicles = [], trips = [], selectedTripId = null, center = [-31.4201, -64.1888], zoom = 13 }) {
  // Create a map of vehicle IDs that are in active trips
  const activeVehicleIds = new Set(trips.map(trip => trip.vehicle?.id).filter(Boolean))
  
  // Find the selected trip
  const selectedTrip = trips.find(trip => trip.id === selectedTripId)

  return (
    <div className="h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-md">
      <MapContainer center={center} zoom={zoom} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController selectedTrip={selectedTrip} />
        
        {/* Marcador de prueba - Centro de Córdoba */}
        <Marker
          position={[-31.4201, -64.1888]}
          icon={defaultIcon}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-sm">📍 Test Marker</h3>
              <p className="text-xs">Centro de Córdoba</p>
              <p className="text-xs">Si ves esto, el mapa funciona</p>
            </div>
          </Popup>
        </Marker>
        
        {/* Render active trips with routes */}
        {trips.map((trip) => {
          if (!trip.vehicle?.currentLatitude || !trip.vehicle?.currentLongitude) return null
          
          const hasStartLocation = trip.startLatitude && trip.startLongitude
          const currentPosition = [trip.vehicle.currentLatitude, trip.vehicle.currentLongitude]
          const isSelected = trip.id === selectedTripId
          
          return (
            <div key={`trip-${trip.id}`}>
              {/* Start location marker */}
              {hasStartLocation && (
                <Marker
                  position={[trip.startLatitude, trip.startLongitude]}
                  icon={startIcon}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-sm text-blue-600">Inicio de Viaje</h3>
                      <p className="text-xs">{trip.vehicle.licensePlate}</p>
                      <p className="text-xs">{new Date(trip.startTime).toLocaleString()}</p>
                      {trip.startAddress && <p className="text-xs mt-1">{trip.startAddress}</p>}
                    </div>
                  </Popup>
                </Marker>
              )}
              
              {/* Current position marker */}
              <Marker
                position={currentPosition}
                icon={isSelected ? highlightedIcon : activeIcon}
              >
                <Popup autoPan={isSelected}>
                  <div className="p-2">
                    <h3 className={`font-bold text-sm ${isSelected ? 'text-yellow-600' : 'text-green-600'}`}>
                      {isSelected ? '⭐ Viaje Seleccionado' : 'Viaje Activo'}
                    </h3>
                    <p className="text-xs font-semibold">{trip.vehicle.licensePlate}</p>
                    <p className="text-xs">{trip.vehicle.brand} {trip.vehicle.model}</p>
                    <p className="text-xs">Velocidad: {trip.vehicle.currentSpeed || 0} km/h</p>
                    <p className="text-xs mt-1">Conductor: {trip.driver?.fullName || 'N/A'}</p>
                    <p className="text-xs">Inicio: {new Date(trip.startTime).toLocaleTimeString()}</p>
                  </div>
                </Popup>
              </Marker>
              
              {/* Route line from start to current position */}
              {hasStartLocation && (
                <Polyline
                  positions={[
                    [trip.startLatitude, trip.startLongitude],
                    currentPosition
                  ]}
                  color={isSelected ? '#fbbf24' : 'green'}
                  weight={isSelected ? 5 : 3}
                  opacity={isSelected ? 0.9 : 0.7}
                  dashArray={isSelected ? '' : '10, 10'}
                />
              )}
            </div>
          )
        })}
        
        {/* Render other vehicles (not in active trips) */}
        {vehicles.map((vehicle) => {
          // Skip if vehicle is in an active trip
          if (activeVehicleIds.has(vehicle.id)) return null
          
          if (!vehicle.currentLatitude || !vehicle.currentLongitude) return null
          
          return (
            <Marker
              key={vehicle.id}
              position={[vehicle.currentLatitude, vehicle.currentLongitude]}
              icon={defaultIcon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-sm md:text-base">{vehicle.licensePlate}</h3>
                  <p className="text-xs md:text-sm">{vehicle.brand} {vehicle.model}</p>
                  <p className="text-xs md:text-sm">Velocidad: {vehicle.currentSpeed || 0} km/h</p>
                  <p className="text-xs text-gray-500 mt-1">Disponible</p>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}

export default MapComponent
