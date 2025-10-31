import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          GeoTrack Mobility
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Plataforma Full Stack para Monitoreo Vehicular en Tiempo Real
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/dashboard" className="btn-primary text-lg px-8 py-3">
            Ir al Dashboard
          </Link>
          <Link to="/vehicles" className="btn-secondary text-lg px-8 py-3">
            Ver Vehículos
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="card text-center">
          <div className="text-5xl mb-4">📍</div>
          <h3 className="text-xl font-bold mb-2">Rastreo en Tiempo Real</h3>
          <p className="text-gray-600">
            Monitorea la ubicación de tu flota vehicular en tiempo real con mapas interactivos
          </p>
        </div>
        
        <div className="card text-center">
          <div className="text-5xl mb-4">🧭</div>
          <h3 className="text-xl font-bold mb-2">Rutas y Distancias</h3>
          <p className="text-gray-600">
            Calcula automáticamente rutas óptimas y distancias recorridas
          </p>
        </div>
        
        <div className="card text-center">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-xl font-bold mb-2">Dashboard Analytics</h3>
          <p className="text-gray-600">
            Visualiza métricas de kilometraje, velocidad y alertas en un dashboard completo
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="card bg-primary-700 text-white">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">150+</div>
            <div className="text-primary-100">Vehículos Activos</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">50K+</div>
            <div className="text-primary-100">Km Recorridos</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">1.2K+</div>
            <div className="text-primary-100">Viajes Completados</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">99.9%</div>
            <div className="text-primary-100">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
