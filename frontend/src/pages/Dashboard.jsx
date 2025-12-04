import { useState, useEffect, useRef } from 'react'
import { vehicleAPI, alertAPI, tripAPI } from '../services/api'
import MapComponent from '../components/MapComponent'

function Dashboard() {
  const [vehicles, setVehicles] = useState([])
  const [alerts, setAlerts] = useState([])
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTripId, setSelectedTripId] = useState(null)
  const mapRef = useRef(null)

  useEffect(() => {
    fetchData()
    
    // Auto-refresh every 30 seconds (opcional, puedes comentar si no lo quieres)
    const interval = setInterval(() => {
      fetchData()
    }, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      const [vehiclesRes, alertsRes, tripsRes] = await Promise.all([
        vehicleAPI.getWithLocation(),
        alertAPI.getUnresolved(),
        tripAPI.getActive()
      ])
      
      setVehicles(vehiclesRes.data)
      setAlerts(alertsRes.data)
      setTrips(tripsRes.data)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl text-gray-600">Cargando dashboard...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Dashboard de Monitoreo</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
        <div className="card">
          <div className="text-sm text-gray-600 mb-1">Vehículos Activos</div>
          <div className="text-3xl font-bold text-primary-600">{vehicles.length}</div>
        </div>
        
        <div className="card">
          <div className="text-sm text-gray-600 mb-1">Viajes en Curso</div>
          <div className="text-3xl font-bold text-green-600">{trips.length}</div>
        </div>
        
        <div className="card">
          <div className="text-sm text-gray-600 mb-1">Alertas Pendientes</div>
          <div className="text-3xl font-bold text-red-600">{alerts.length}</div>
        </div>
        
        <div className="card">
          <div className="text-sm text-gray-600 mb-1">Velocidad Promedio</div>
          <div className="text-3xl font-bold text-blue-600">
            {vehicles.length > 0 
              ? Math.round(vehicles.reduce((sum, v) => sum + (v.currentSpeed || 0), 0) / vehicles.length)
              : 0} km/h
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="mb-8" ref={mapRef}>
        <h2 className="text-2xl font-bold mb-4">Mapa de Vehículos</h2>
        <div className="mb-2 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
            <span>Inicio de viaje</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            <span>Viaje activo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-500 rounded-full"></div>
            <span>Vehículo disponible</span>
          </div>
        </div>
        <MapComponent vehicles={vehicles} trips={trips} selectedTripId={selectedTripId} />
      </div>

      {/* Recent Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Alertas Recientes</h2>
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <div className="card text-center text-gray-500">
                No hay alertas pendientes
              </div>
            ) : (
              alerts.slice(0, 5).map(alert => (
                <div key={alert.id} className="card border-l-4 border-red-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{alert.title}</h3>
                      <p className="text-sm text-gray-600">{alert.description}</p>
                    </div>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                      {alert.severity}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Viajes Activos</h2>
          <div className="space-y-3">
            {trips.length === 0 ? (
              <div className="card text-center text-gray-500">
                No hay viajes activos
              </div>
            ) : (
              trips.slice(0, 5).map(trip => (
                <div 
                  key={trip.id} 
                  className="card border-l-4 border-green-500 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => {
                    setSelectedTripId(trip.id)
                    mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }}
                >
                  <h3 className="font-bold">
                    {trip.vehicle?.licensePlate || 'Vehículo'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Conductor: {trip.driver?.fullName || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Inicio: {new Date(trip.startTime).toLocaleString()}
                  </p>
                  <p className="text-xs text-primary-600 mt-1">👆 Click para ver en el mapa</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
