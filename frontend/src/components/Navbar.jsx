import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username') || 'Usuario'
  const userRole = localStorage.getItem('userRole') || 'CONDUCTOR'
  const fullName = localStorage.getItem('fullName') || username
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Definir qué puede ver cada rol
  const canViewVehicles = ['ADMIN', 'SUPERVISOR', 'OPERADOR'].includes(userRole)
  const canViewUsers = ['ADMIN', 'SUPERVISOR'].includes(userRole)
  const canViewAlerts = ['ADMIN', 'SUPERVISOR', 'OPERADOR'].includes(userRole)
  const canViewTrips = true // Todos pueden ver viajes
  const canViewDashboard = ['ADMIN', 'SUPERVISOR', 'OPERADOR'].includes(userRole)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('userRole')
    localStorage.removeItem('fullName')
    navigate('/login')
    window.location.reload()
  }

  return (
    <nav className="bg-primary-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/home" className="text-xl md:text-2xl font-bold">
              GeoTrack
            </Link>
          </div>
          
          <div className="hidden lg:flex space-x-4">
            <Link to="/home" className="hover:bg-primary-600 px-3 py-2 rounded-md">
              Inicio
            </Link>
            {canViewDashboard && (
              <Link to="/dashboard" className="hover:bg-primary-600 px-3 py-2 rounded-md">
                Dashboard
              </Link>
            )}
            {canViewVehicles && (
              <Link to="/vehicles" className="hover:bg-primary-600 px-3 py-2 rounded-md">
                Vehículos
              </Link>
            )}
            {canViewTrips && (
              <Link to="/trips" className="hover:bg-primary-600 px-3 py-2 rounded-md">
                Viajes
              </Link>
            )}
            {canViewAlerts && (
              <Link to="/alerts" className="hover:bg-primary-600 px-3 py-2 rounded-md">
                Alertas
              </Link>
            )}
            {canViewUsers && (
              <Link to="/users" className="hover:bg-primary-600 px-3 py-2 rounded-md">
                Usuarios
              </Link>
            )}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium">{fullName}</div>
              <div className="text-xs opacity-75">{userRole}</div>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-white text-primary-700 px-4 py-2 rounded-md font-medium hover:bg-gray-100"
            >
              Cerrar Sesión
            </button>
          </div>
          
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link to="/home" className="hover:bg-primary-600 px-3 py-2 rounded-md" onClick={() => setIsMenuOpen(false)}>
                Inicio
              </Link>
              {canViewDashboard && (
                <Link to="/dashboard" className="hover:bg-primary-600 px-3 py-2 rounded-md" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
              )}
              {canViewVehicles && (
                <Link to="/vehicles" className="hover:bg-primary-600 px-3 py-2 rounded-md" onClick={() => setIsMenuOpen(false)}>
                  Vehículos
                </Link>
              )}
              {canViewTrips && (
                <Link to="/trips" className="hover:bg-primary-600 px-3 py-2 rounded-md" onClick={() => setIsMenuOpen(false)}>
                  Viajes
                </Link>
              )}
              {canViewAlerts && (
                <Link to="/alerts" className="hover:bg-primary-600 px-3 py-2 rounded-md" onClick={() => setIsMenuOpen(false)}>
                  Alertas
                </Link>
              )}
              {canViewUsers && (
                <Link to="/users" className="hover:bg-primary-600 px-3 py-2 rounded-md" onClick={() => setIsMenuOpen(false)}>
                  Usuarios
                </Link>
              )}
              <div className="pt-2 border-t border-primary-600">
                <div className="px-3 mb-2">
                  <div className="text-sm font-medium">{fullName}</div>
                  <div className="text-xs opacity-75">{userRole}</div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full bg-white text-primary-700 px-3 py-2 rounded-md font-medium hover:bg-gray-100"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
