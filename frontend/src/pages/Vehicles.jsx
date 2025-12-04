import { useState, useEffect } from 'react'
import { vehicleAPI } from '../services/api'
import VehicleCard from '../components/VehicleCard'

function Vehicles() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    licensePlate: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    type: 'CAR',
    status: 'ACTIVE'
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchVehicles()
  }, [filter])

  const fetchVehicles = async () => {
    try {
      setLoading(true)
      const response = filter === 'active' 
        ? await vehicleAPI.getActive()
        : await vehicleAPI.getAll()
      setVehicles(response.data)
    } catch (error) {
      console.error('Error fetching vehicles:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      await vehicleAPI.create(formData)
      setShowModal(false)
      setFormData({
        licensePlate: '',
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        color: '',
        type: 'CAR',
        status: 'ACTIVE'
      })
      fetchVehicles()
    } catch (error) {
      setError(error.response?.data?.message || 'Error al crear vehículo')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl text-gray-600">Cargando vehículos...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Gestión de Vehículos</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="btn-primary w-full sm:w-auto"
        >
          + Agregar Vehículo
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
          Activos
        </button>
      </div>

      {/* Vehicles Grid */}
      {vehicles.length === 0 ? (
        <div className="card text-center text-gray-500 py-12">
          No se encontraron vehículos
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {vehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}

      {/* Modal Agregar Vehículo */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 md:p-8 max-w-md w-full my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Nuevo Vehículo</h2>
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
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patente *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="ABC-123"
                  value={formData.licensePlate}
                  onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value.toUpperCase() })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marca *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Ford"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Modelo *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Transit"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Año *
                </label>
                <input
                  type="number"
                  className="input-field"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Blanco"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo *
                </label>
                <select
                  className="input-field"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                >
                  <option value="CAR">Auto</option>
                  <option value="TRUCK">Camión</option>
                  <option value="VAN">Camioneta</option>
                  <option value="MOTORCYCLE">Motocicleta</option>
                  <option value="BUS">Autobús</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado *
                </label>
                <select
                  className="input-field"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  required
                >
                  <option value="ACTIVE">Activo</option>
                  <option value="INACTIVE">Inactivo</option>
                  <option value="MAINTENANCE">Mantenimiento</option>
                  <option value="OUT_OF_SERVICE">Fuera de Servicio</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
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
                  Crear Vehículo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Vehicles
