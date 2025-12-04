import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Credenciales de prueba con roles
    const validUsers = {
      'admin': { password: 'admin123', role: 'ADMIN', fullName: 'Admin Sistema' },
      'conductor1': { password: 'conductor123', role: 'CONDUCTOR', fullName: 'Juan Pérez' },
      'conductor2': { password: 'conductor123', role: 'CONDUCTOR', fullName: 'María García' },
      'supervisor1': { password: 'supervisor123', role: 'SUPERVISOR', fullName: 'Carlos López' },
      'operador1': { password: 'operador123', role: 'OPERADOR', fullName: 'Roberto Martínez' }
    }

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500))

    const user = validUsers[formData.username]
    if (user && user.password === formData.password) {
      // Login exitoso
      localStorage.setItem('token', 'fake-jwt-token')
      localStorage.setItem('username', formData.username)
      localStorage.setItem('userRole', user.role)
      localStorage.setItem('fullName', user.fullName)
      setIsAuthenticated(true)
      navigate('/home')
    } else {
      setError('Usuario o contraseña incorrectos')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 md:py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            GeoTrack
          </h2>
          <p className="text-sm md:text-base text-gray-600">Inicia Sesión en Tu Cuenta</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuario
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Ingresa tu usuario"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                className="input-field"
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">Recordarme</span>
              </label>
              <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button 
              type="submit" 
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="mt-4 md:mt-6">
            <div className="bg-blue-50 border border-blue-200 rounded p-3 md:p-4">
              <p className="text-sm font-medium text-blue-900 mb-2">
                Credenciales de Prueba:
              </p>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• <strong>admin</strong> / admin123</li>
                <li>• <strong>conductor1</strong> / conductor123</li>
                <li>• <strong>supervisor1</strong> / supervisor123</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 md:mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                Regístrate aquí
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
