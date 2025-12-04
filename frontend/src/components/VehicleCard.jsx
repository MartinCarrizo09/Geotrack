function VehicleCard({ vehicle }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800'
      case 'INACTIVE': return 'bg-gray-100 text-gray-800'
      case 'MAINTENANCE': return 'bg-yellow-100 text-yellow-800'
      case 'OUT_OF_SERVICE': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 truncate">{vehicle.licensePlate}</h3>
          <p className="text-sm md:text-base text-gray-600 truncate">{vehicle.brand} {vehicle.model}</p>
        </div>
        <span className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap ml-2 ${getStatusColor(vehicle.status)}`}>
          {vehicle.status}
        </span>
      </div>
      
      <div className="space-y-2 text-xs md:text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Tipo:</span>
          <span className="font-medium">{vehicle.type}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Color:</span>
          <span className="font-medium">{vehicle.color}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Año:</span>
          <span className="font-medium">{vehicle.year}</span>
        </div>
        {vehicle.currentSpeed && (
          <div className="flex justify-between">
            <span className="text-gray-600">Velocidad actual:</span>
            <span className="font-medium">{vehicle.currentSpeed} km/h</span>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <button className="btn-primary flex-1 text-sm">Ver detalles</button>
        <button className="btn-secondary text-sm">Rastrear</button>
      </div>
    </div>
  )
}

export default VehicleCard
