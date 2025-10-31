import { useState, useEffect } from 'react'
import { alertAPI } from '../services/api'

function Alerts() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('unresolved')

  useEffect(() => {
    fetchAlerts()
  }, [filter])

  const fetchAlerts = async () => {
    try {
      setLoading(true)
      const response = filter === 'unresolved'
        ? await alertAPI.getUnresolved()
        : await alertAPI.getAll()
      setAlerts(response.data)
    } catch (error) {
      console.error('Error fetching alerts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleResolve = async (alertId) => {
    try {
      await alertAPI.resolve(alertId, 1) // User ID 1 por defecto
      fetchAlerts()
    } catch (error) {
      console.error('Error resolving alert:', error)
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL': return 'border-red-500 bg-red-50'
      case 'HIGH': return 'border-orange-500 bg-orange-50'
      case 'MEDIUM': return 'border-yellow-500 bg-yellow-50'
      case 'LOW': return 'border-blue-500 bg-blue-50'
      default: return 'border-gray-500 bg-gray-50'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl text-gray-600">Cargando alertas...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestión de Alertas</h1>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setFilter('unresolved')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'unresolved' ? 'bg-primary-600 text-white' : 'bg-gray-200'
          }`}
        >
          Pendientes
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-200'
          }`}
        >
          Todas
        </button>
      </div>

      {/* Alerts List */}
      {alerts.length === 0 ? (
        <div className="card text-center text-gray-500 py-12">
          No se encontraron alertas
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map(alert => (
            <div key={alert.id} className={`card border-l-4 ${getSeverityColor(alert.severity)}`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-xl font-bold">{alert.title}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white border">
                      {alert.severity}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white border">
                      {alert.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{alert.description}</p>
                  
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Vehículo</p>
                      <p className="font-medium">{alert.vehicle?.licensePlate || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Fecha</p>
                      <p className="font-medium">{new Date(alert.createdAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Estado</p>
                      <p className="font-medium">
                        {alert.resolved ? 'Resuelta' : 'Pendiente'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  {!alert.resolved && (
                    <button
                      onClick={() => handleResolve(alert.id)}
                      className="btn-primary"
                    >
                      Resolver
                    </button>
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

export default Alerts
