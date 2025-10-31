import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

function MapComponent({ vehicles = [], center = [4.6097, -74.0817], zoom = 12 }) {
  return (
    <div className="h-96 w-full rounded-lg overflow-hidden shadow-md">
      <MapContainer center={center} zoom={zoom} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {vehicles.map((vehicle) => (
          vehicle.currentLatitude && vehicle.currentLongitude && (
            <Marker
              key={vehicle.id}
              position={[vehicle.currentLatitude, vehicle.currentLongitude]}
              icon={defaultIcon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold">{vehicle.licensePlate}</h3>
                  <p className="text-sm">{vehicle.brand} {vehicle.model}</p>
                  <p className="text-sm">Velocidad: {vehicle.currentSpeed || 0} km/h</p>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  )
}

export default MapComponent
