import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-primary-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              🚗 GeoTrack Mobility
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:bg-primary-600 px-3 py-2 rounded-md">
              Inicio
            </Link>
            <Link to="/dashboard" className="hover:bg-primary-600 px-3 py-2 rounded-md">
              Dashboard
            </Link>
            <Link to="/vehicles" className="hover:bg-primary-600 px-3 py-2 rounded-md">
              Vehículos
            </Link>
            <Link to="/trips" className="hover:bg-primary-600 px-3 py-2 rounded-md">
              Viajes
            </Link>
            <Link to="/alerts" className="hover:bg-primary-600 px-3 py-2 rounded-md">
              Alertas
            </Link>
          </div>
          
          <div>
            <Link to="/login" className="bg-white text-primary-700 px-4 py-2 rounded-md font-medium hover:bg-gray-100">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
