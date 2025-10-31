import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Vehicle API
export const vehicleAPI = {
  getAll: () => api.get('/vehicles'),
  getById: (id) => api.get(`/vehicles/${id}`),
  getActive: () => api.get('/vehicles/active'),
  getWithLocation: () => api.get('/vehicles/with-location'),
  create: (vehicle) => api.post('/vehicles', vehicle),
  update: (id, vehicle) => api.put(`/vehicles/${id}`, vehicle),
  updateLocation: (id, latitude, longitude, speed) => 
    api.put(`/vehicles/${id}/location`, null, { params: { latitude, longitude, speed } }),
  delete: (id) => api.delete(`/vehicles/${id}`)
}

// Location API
export const locationAPI = {
  getByVehicle: (vehicleId) => api.get(`/locations/vehicle/${vehicleId}`),
  getByVehicleAndRange: (vehicleId, start, end) => 
    api.get(`/locations/vehicle/${vehicleId}/range`, { params: { start, end } }),
  record: (vehicleId, latitude, longitude, speed, heading) => 
    api.post('/locations/record', null, { params: { vehicleId, latitude, longitude, speed, heading } }),
  calculateDistance: (lat1, lon1, lat2, lon2) => 
    api.get('/locations/distance', { params: { lat1, lon1, lat2, lon2 } })
}

// Trip API
export const tripAPI = {
  getAll: () => api.get('/trips'),
  getById: (id) => api.get(`/trips/${id}`),
  getByVehicle: (vehicleId) => api.get(`/trips/vehicle/${vehicleId}`),
  getActive: () => api.get('/trips/active'),
  start: (trip) => api.post('/trips/start', trip),
  end: (id, endLatitude, endLongitude, endAddress) => 
    api.put(`/trips/${id}/end`, null, { params: { endLatitude, endLongitude, endAddress } }),
  delete: (id) => api.delete(`/trips/${id}`)
}

// Alert API
export const alertAPI = {
  getAll: () => api.get('/alerts'),
  getById: (id) => api.get(`/alerts/${id}`),
  getByVehicle: (vehicleId) => api.get(`/alerts/vehicle/${vehicleId}`),
  getUnresolved: () => api.get('/alerts/unresolved'),
  create: (alert) => api.post('/alerts', alert),
  resolve: (id, resolvedByUserId) => 
    api.put(`/alerts/${id}/resolve`, null, { params: { resolvedByUserId } }),
  delete: (id) => api.delete(`/alerts/${id}`)
}

export default api
