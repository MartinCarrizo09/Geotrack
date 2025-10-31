import { useState, useEffect } from 'react'
import { tripAPI } from '../services/api'

function Trips() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchTrips()
  }, [filter])

  const fetchTrips = async () => {
    try {
      setLoading(true)
      const response = filter === 'active'
        ? await tripAPI.getActive()
        : await tripAPI.getAll()
      setTrips(response.data)
    } catch (error) {
      console.error('Error fetching trips:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl text-gray-600">Cargando viajes...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestión de Viajes</h1>
        <button className="btn-primary">+ Iniciar Viaje</button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-200'
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'active' ? 'bg-primary-600 text-white' : 'bg-gray-200'
          }`}
        >
          En Curso
        </button>
      </div>

      {/* Trips List */}
      {trips.length === 0 ? (
        <div className="card text-center text-gray-500 py-12">
          No se encontraron viajes
        </div>
      ) : (
        <div className="space-y-4">
          {trips.map(trip => (
            <div key={trip.id} className="card">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-xl font-bold">
                      {trip.vehicle?.licensePlate || 'Vehículo'}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      trip.status === 'IN_PROGRESS' 
                        ? 'bg-green-100 text-green-800'
                        : trip.status === 'COMPLETED'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Conductor</p>
                      <p className="font-medium">{trip.driver?.fullName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Inicio</p>
                      <p className="font-medium">{new Date(trip.startTime).toLocaleString()}</p>
                    </div>
                    {trip.endTime && (
                      <div>
                        <p className="text-gray-600">Fin</p>
                        <p className="font-medium">{new Date(trip.endTime).toLocaleString()}</p>
                      </div>
                    )}
                    {trip.totalDistance && (
                      <div>
                        <p className="text-gray-600">Distancia Total</p>
                        <p className="font-medium">{trip.totalDistance.toFixed(2)} km</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="btn-secondary">Ver Detalles</button>
                  {trip.status === 'IN_PROGRESS' && (
                    <button className="btn-primary">Finalizar</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Trips
