import { useState, useEffect } from 'react'
import { userAPI } from '../services/api'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    role: 'CONDUCTOR',
    active: true
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [filter])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = filter === 'all'
        ? await userAPI.getAll()
        : await userAPI.getByRole(filter)
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      if (editingUser) {
        await userAPI.update(editingUser.id, formData)
      } else {
        await userAPI.create(formData)
      }
      setShowModal(false)
      setEditingUser(null)
      resetForm()
      fetchUsers()
    } catch (error) {
      setError(error.response?.data?.message || 'Error al guardar usuario')
    }
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({
      username: user.username,
      email: user.email,
      password: '',
      fullName: user.fullName,
      phoneNumber: user.phoneNumber || '',
      role: user.role,
      active: user.active
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await userAPI.delete(id)
        fetchUsers()
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      fullName: '',
      phoneNumber: '',
      role: 'CONDUCTOR',
      active: true
    })
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN': return 'bg-red-100 text-red-800'
      case 'SUPERVISOR': return 'bg-blue-100 text-blue-800'
      case 'CONDUCTOR': return 'bg-green-100 text-green-800'
      case 'OPERADOR': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleLabel = (role) => {
    const labels = {
      'ADMIN': 'Administrador',
      'SUPERVISOR': 'Supervisor',
      'CONDUCTOR': 'Conductor',
      'OPERADOR': 'Operador'
    }
    return labels[role] || role
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl text-gray-600">Cargando usuarios...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Gestión de Usuarios</h1>
        <button 
          onClick={() => {
            setEditingUser(null)
            resetForm()
            setShowModal(true)
          }}
          className="btn-primary w-full sm:w-auto"
        >
          + Agregar Usuario
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
          onClick={() => setFilter('CONDUCTOR')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-lg ${
            filter === 'CONDUCTOR' ? 'bg-primary-600 text-white' : 'bg-gray-200'
          }`}
        >
          Conductores
        </button>
        <button
          onClick={() => setFilter('SUPERVISOR')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-lg ${
            filter === 'SUPERVISOR' ? 'bg-primary-600 text-white' : 'bg-gray-200'
          }`}
        >
          Supervisores
        </button>
        <button
          onClick={() => setFilter('ADMIN')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-lg ${
            filter === 'ADMIN' ? 'bg-primary-600 text-white' : 'bg-gray-200'
          }`}
        >
          Admins
        </button>
      </div>

      {/* Users List */}
      {users.length === 0 ? (
        <div className="card text-center text-gray-500 py-12">
          No se encontraron usuarios
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {users.map(user => (
            <div key={user.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 truncate">
                    {user.fullName}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">@{user.username}</p>
                </div>
                <span className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap ml-2 ${getRoleColor(user.role)}`}>
                  {getRoleLabel(user.role)}
                </span>
              </div>
              
              <div className="space-y-2 text-xs md:text-sm mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600 truncate">{user.email}</span>
                </div>
                {user.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-600">{user.phoneNumber}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${user.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-gray-600">{user.active ? 'Activo' : 'Inactivo'}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(user)}
                  className="flex-1 btn-secondary text-sm"
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(user.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Agregar/Editar Usuario */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 md:p-8 max-w-md w-full my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold">
                {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
              </h2>
              <button 
                onClick={() => {
                  setShowModal(false)
                  setEditingUser(null)
                  setError('')
                  resetForm()
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
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Juan Pérez"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Usuario *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="juanperez"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  disabled={editingUser !== null}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="juan@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {editingUser ? 'Nueva Contraseña (dejar vacío para no cambiar)' : 'Contraseña *'}
                </label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required={!editingUser}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  className="input-field"
                  placeholder="+54 351 123-4567"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rol *
                </label>
                <select
                  className="input-field"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                >
                  <option value="CONDUCTOR">Conductor</option>
                  <option value="SUPERVISOR">Supervisor</option>
                  <option value="OPERADOR">Operador</option>
                  <option value="ADMIN">Administrador</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  />
                  <span className="text-sm font-medium text-gray-700">Usuario activo</span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingUser(null)
                    setError('')
                    resetForm()
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  {editingUser ? 'Actualizar' : 'Crear Usuario'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Users
