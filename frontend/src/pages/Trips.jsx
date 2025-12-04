import { useState, useEffect } from 'react'
import { tripAPI, vehicleAPI, userAPI } from '../services/api'

function Trips() {
  const [trips, setTrips] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [drivers, setDrivers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [formData, setFormData] = useState({
    vehicleId: '',
    driverId: '',
    startLatitude: -31.4201,
    startLongitude: -64.1888,
    notes: ''
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTrips()
    fetchVehicles()
    fetchDrivers()
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

  const fetchVehicles = async () => {
    try {
      const response = await vehicleAPI.getActive()
      setVehicles(response.data)
    } catch (error) {
      console.error('Error fetching vehicles:', error)
    }
  }

  const fetchDrivers = async () => {
    try {
      const response = await userAPI.getAll()
      // Filtrar solo conductores y supervisores
      const availableDrivers = response.data.filter(
        user => user.role === 'CONDUCTOR' || user.role === 'SUPERVISOR'
      )
      setDrivers(availableDrivers)
    } catch (error) {
      console.error('Error fetching drivers:', error)
      // Fallback a datos mock si falla
      setDrivers([
        { id: 2, fullName: 'Juan Pérez' },
        { id: 3, fullName: 'María González' },
        { id: 4, fullName: 'Carlos Rodríguez' }
      ])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!formData.vehicleId || !formData.driverId) {
      setError('Por favor selecciona un vehículo y un conductor')
      return
    }

    try {
      await tripAPI.create({
        vehicle: { id: parseInt(formData.vehicleId) },
        driver: { id: parseInt(formData.driverId) },
        startLatitude: formData.startLatitude,
        startLongitude: formData.startLongitude,
        notes: formData.notes,
        startTime: new Date().toISOString(),
        status: 'IN_PROGRESS'
      })
      setShowModal(false)
      setFormData({
        vehicleId: '',
        driverId: '',
        startLatitude: -31.4201,
        startLongitude: -64.1888,
        notes: ''
      })
      fetchTrips()
    } catch (error) {
      setError(error.response?.data?.message || 'Error al iniciar viaje')
    }
  }

  const handleViewDetails = (trip) => {
    setSelectedTrip(trip)
    setShowDetailsModal(true)
  }

  const handleEndTrip = async (tripId) => {
    if (!window.confirm('¿Estás seguro de finalizar este viaje?')) {
      return
    }

    try {
      await tripAPI.end(tripId, -31.4201, -64.1888, 'Córdoba, Argentina')
      fetchTrips()
    } catch (error) {
      console.error('Error ending trip:', error)
      alert('Error al finalizar el viaje')
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
    <div className="container mx-auto px-4 py-4 md:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Gestión de Viajes</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="btn-primary w-full sm:w-auto"
        >
          + Iniciar Viaje
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2 md:gap-4">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-lg ${
            filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-200'
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-lg ${
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
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                <div className="flex-1 w-full">
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-3">
                    <h3 className="text-lg md:text-xl font-bold">
                      {trip.vehicle?.licensePlate || 'Vehículo'}
                    </h3>
                    <span className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap ${
                      trip.status === 'IN_PROGRESS' 
                        ? 'bg-green-100 text-green-800'
                        : trip.status === 'COMPLETED'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {trip.status === 'IN_PROGRESS' ? 'En Curso' : trip.status === 'COMPLETED' ? 'Completado' : trip.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
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
                
                <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                  <button 
                    onClick={() => handleViewDetails(trip)}
                    className="btn-secondary text-sm whitespace-nowrap"
                  >
                    Ver Detalles
                  </button>
                  {trip.status === 'IN_PROGRESS' && (
                    <button 
                      onClick={() => handleEndTrip(trip.id)}
                      className="btn-primary text-sm whitespace-nowrap"
                    >
                      Finalizar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Iniciar Viaje */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 md:p-8 max-w-md w-full my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Iniciar Nuevo Viaje</h2>
              <button 
                onClick={() => {
                  setShowModal(false)
                  setError('')
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ✕
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehículo *
                </label>
                <select
                  className="input-field"
                  value={formData.vehicleId}
                  onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                  required
                >
                  <option value="">Selecciona un vehículo</option>
                  {vehicles.map(vehicle => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.licensePlate} - {vehicle.brand} {vehicle.model}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conductor *
                </label>
                <select
                  className="input-field"
                  value={formData.driverId}
                  onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
                  required
                >
                  <option value="">Selecciona un conductor</option>
                  {drivers.map(driver => (
                    <option key={driver.id} value={driver.id}>
                      {driver.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Latitud Inicial
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    className="input-field"
                    value={formData.startLatitude}
                    onChange={(e) => setFormData({ ...formData, startLatitude: parseFloat(e.target.value) })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Longitud Inicial
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    className="input-field"
                    value={formData.startLongitude}
                    onChange={(e) => setFormData({ ...formData, startLongitude: parseFloat(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notas (opcional)
                </label>
                <textarea
                  className="input-field"
                  rows="3"
                  placeholder="Agregar notas sobre el viaje..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setError('')
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  Iniciar Viaje
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Ver Detalles */}
      {showDetailsModal && selectedTrip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 md:p-6 lg:p-8 max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Detalles del Viaje</h2>
              <button 
                onClick={() => {
                  setShowDetailsModal(false)
                  setSelectedTrip(null)
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 md:space-y-6">
              {/* Información del Vehículo */}
              <div className="border-b pb-3 md:pb-4">
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-primary-600">Vehículo</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Patente</p>
                    <p className="font-medium text-lg">{selectedTrip.vehicle?.licensePlate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Vehículo</p>
                    <p className="font-medium">{selectedTrip.vehicle?.brand} {selectedTrip.vehicle?.model}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Tipo</p>
                    <p className="font-medium">{selectedTrip.vehicle?.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Color</p>
                    <p className="font-medium">{selectedTrip.vehicle?.color}</p>
                  </div>
                </div>
              </div>

              {/* Información del Conductor */}
              <div className="border-b pb-3 md:pb-4">
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-primary-600">Conductor</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Nombre</p>
                    <p className="font-medium">{selectedTrip.driver?.fullName || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Usuario</p>
                    <p className="font-medium">@{selectedTrip.driver?.username || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-medium">{selectedTrip.driver?.email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Teléfono</p>
                    <p className="font-medium">{selectedTrip.driver?.phoneNumber || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Información del Viaje */}
              <div className="border-b pb-3 md:pb-4">
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-primary-600">Información del Viaje</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Estado</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      selectedTrip.status === 'IN_PROGRESS' 
                        ? 'bg-green-100 text-green-800'
                        : selectedTrip.status === 'COMPLETED'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedTrip.status === 'IN_PROGRESS' ? 'En Curso' : selectedTrip.status === 'COMPLETED' ? 'Completado' : selectedTrip.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-600">Fecha de Inicio</p>
                    <p className="font-medium">{new Date(selectedTrip.startTime).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Hora de Inicio</p>
                    <p className="font-medium">{new Date(selectedTrip.startTime).toLocaleTimeString()}</p>
                  </div>
                  {selectedTrip.endTime && (
                    <>
                      <div>
                        <p className="text-gray-600">Fecha de Fin</p>
                        <p className="font-medium">{new Date(selectedTrip.endTime).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Hora de Fin</p>
                        <p className="font-medium">{new Date(selectedTrip.endTime).toLocaleTimeString()}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Ubicaciones */}
              <div className="border-b pb-3 md:pb-4">
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-primary-600">Ubicaciones</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-sm">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-600 font-medium mb-2">📍 Punto de Inicio</p>
                    <p className="text-xs text-gray-500">Lat: {selectedTrip.startLatitude?.toFixed(4) || 'N/A'}</p>
                    <p className="text-xs text-gray-500">Lon: {selectedTrip.startLongitude?.toFixed(4) || 'N/A'}</p>
                    {selectedTrip.startAddress && (
                      <p className="text-xs mt-1">{selectedTrip.startAddress}</p>
                    )}
                  </div>
                  {selectedTrip.endLatitude && selectedTrip.endLongitude && (
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-gray-600 font-medium mb-2">🏁 Punto de Fin</p>
                      <p className="text-xs text-gray-500">Lat: {selectedTrip.endLatitude.toFixed(4)}</p>
                      <p className="text-xs text-gray-500">Lon: {selectedTrip.endLongitude.toFixed(4)}</p>
                      {selectedTrip.endAddress && (
                        <p className="text-xs mt-1">{selectedTrip.endAddress}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Estadísticas */}
              {(selectedTrip.totalDistance || selectedTrip.averageSpeed || selectedTrip.maxSpeed) && (
                <div className="border-b pb-3 md:pb-4">
                  <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-primary-600">Estadísticas</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 text-sm">
                    {selectedTrip.totalDistance && (
                      <div className="text-center bg-blue-50 p-3 rounded">
                        <p className="text-gray-600 text-xs mb-1">Distancia Total</p>
                        <p className="font-bold text-lg text-blue-600">{selectedTrip.totalDistance.toFixed(2)} km</p>
                      </div>
                    )}
                    {selectedTrip.averageSpeed && (
                      <div className="text-center bg-green-50 p-3 rounded">
                        <p className="text-gray-600 text-xs mb-1">Vel. Promedio</p>
                        <p className="font-bold text-lg text-green-600">{selectedTrip.averageSpeed.toFixed(0)} km/h</p>
                      </div>
                    )}
                    {selectedTrip.maxSpeed && (
                      <div className="text-center bg-red-50 p-3 rounded">
                        <p className="text-gray-600 text-xs mb-1">Vel. Máxima</p>
                        <p className="font-bold text-lg text-red-600">{selectedTrip.maxSpeed.toFixed(0)} km/h</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Notas */}
              {selectedTrip.notes && (
                <div>
                  <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-primary-600">Notas</h3>
                  <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                    <p className="text-sm text-gray-700">{selectedTrip.notes}</p>
                  </div>
                </div>
              )}

              {/* Botones de acción */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowDetailsModal(false)
                    setSelectedTrip(null)
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cerrar
                </button>
                {selectedTrip.status === 'IN_PROGRESS' && (
                  <button
                    onClick={() => {
                      handleEndTrip(selectedTrip.id)
                      setShowDetailsModal(false)
                      setSelectedTrip(null)
                    }}
                    className="flex-1 btn-primary"
                  >
                    Finalizar Viaje
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Trips
