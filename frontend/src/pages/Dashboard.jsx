import { useState, useEffect } from 'react'
import { vehicleAPI, alertAPI, tripAPI } from '../services/api'
import MapComponent from '../components/MapComponent'

function Dashboard() {
  const [vehicles, setVehicles] = useState([])
  const [alerts, setAlerts] = useState([])
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard de Monitoreo</h1>
      
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
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
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Mapa de Vehículos</h2>
        <MapComponent vehicles={vehicles} />
      </div>

      {/* Recent Alerts */}
      <div className="grid md:grid-cols-2 gap-8">
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
                <div key={trip.id} className="card border-l-4 border-green-500">
                  <h3 className="font-bold">
                    {trip.vehicle?.licensePlate || 'Vehículo'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Conductor: {trip.driver?.fullName || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Inicio: {new Date(trip.startTime).toLocaleString()}
                  </p>
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
