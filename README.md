# 🚗 GeoTrack – Plataforma Full Stack para Monitoreo Vehicular

## 📘 Descripción general  
**GeoTrack** es una aplicación **full stack (Java + React)** diseñada para el registro, rastreo y análisis de vehículos en tiempo real.  
El sistema combina un **backend robusto en Spring Boot** con un **frontend moderno en React**, integrando servicios de geolocalización y mapas interactivos.  

Permite visualizar trayectos, calcular distancias, detectar alertas y administrar usuarios desde una interfaz web responsive o desde una app mobile desarrollada con React Native.

---

## ⚙️ Características principales  
- 📍 **Mapas interactivos** integrados con OpenStreetMap (Leaflet).  
- 🚘 **Rastreo en tiempo real** de vehículos o flotas.  
- 🧭 **Cálculo automático de rutas y distancias**.  
- 👥 **Gestión de usuarios y roles** (conductor, operador, supervisor, admin).  
- 📊 **Dashboard en React** con métricas de kilometraje, velocidad y alertas.  
- 🔒 **Autenticación JWT** entre backend y frontend.  
- 📱 **Diseño responsive** adaptable a dispositivos móviles.  
- ☁️ Arquitectura **RESTful** escalable.  

---

## 🧰 Tecnologías utilizadas  

### Backend (Java / Spring Boot)  
- **Java 17**  
- **Spring Boot 3.2.0**  
- Spring Web / Spring Data JPA / Spring Security  
- Hibernate ORM  
- PostgreSQL / SQLite  
- JWT (JSON Web Tokens)  
- Swagger / OpenAPI  
- Maven

### Frontend (React)  
- **React 18.3** + **Vite**  
- **React Router DOM** para navegación  
- **Axios** para consumo de API REST  
- **TailwindCSS** para UI moderna y responsive  
- **Leaflet** y **React-Leaflet** para mapas interactivos  
- **Heroicons** para iconografía  

---

## 🧩 Arquitectura del proyecto  

```
GeoTrack/
├── backend/
│   ├── src/main/java/com/geotrack/mobility/
│   │   ├── MobilityApplication.java    → Main application
│   │   ├── model/                      → Entidades JPA
│   │   │   ├── User.java
│   │   │   ├── Vehicle.java
│   │   │   ├── Location.java
│   │   │   ├── Trip.java
│   │   │   └── Alert.java
│   │   ├── repository/                 → Repositorios JPA
│   │   │   ├── UserRepository.java
│   │   │   ├── VehicleRepository.java
│   │   │   ├── LocationRepository.java
│   │   │   ├── TripRepository.java
│   │   │   └── AlertRepository.java
│   │   ├── service/                    → Lógica de negocio
│   │   │   ├── VehicleService.java
│   │   │   ├── LocationService.java
│   │   │   ├── TripService.java
│   │   │   └── AlertService.java
│   │   ├── controller/                 → REST Controllers
│   │   │   ├── VehicleController.java
│   │   │   ├── LocationController.java
│   │   │   ├── TripController.java
│   │   │   └── AlertController.java
│   │   └── config/                     → Configuración
│   │       └── SecurityConfig.java
│   ├── src/main/resources/
│   │   └── application.yml             → Configuración de la app
│   ├── pom.xml                         → Dependencias Maven
│   └── .gitignore
│
└── frontend/
    ├── src/
    │   ├── components/                 → Componentes reutilizables
    │   │   ├── Navbar.jsx
    │   │   ├── MapComponent.jsx
    │   │   └── VehicleCard.jsx
    │   ├── pages/                      → Páginas/Vistas
    │   │   ├── Home.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Vehicles.jsx
    │   │   ├── Trips.jsx
    │   │   ├── Alerts.jsx
    │   │   └── Login.jsx
    │   ├── services/                   → API Services
    │   │   └── api.js
    │   ├── App.jsx                     → App principal
    │   ├── main.jsx                    → Entry point
    │   └── index.css                   → Estilos globales
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── .gitignore
```

---

## 🚀 Instalación y configuración

### Requisitos previos
- **Java 17** o superior
- **Maven 3.8+**
- **Node.js 18+** y **npm**
- **PostgreSQL 14+** (o SQLite para desarrollo)

### 1. Clonar el repositorio
```bash
git clone https://github.com/Mtcarrixo12/Geotrack.git
cd Geotrack
```

### 2. Configurar Backend

#### Configurar base de datos
Edita `backend/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/geotrack
    username: TU_USUARIO
    password: TU_CONTRASEÑA
```

#### Compilar y ejecutar
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

El backend estará disponible en: `http://localhost:8080/api`

Swagger UI: `http://localhost:8080/api/swagger-ui.html`

### 3. Configurar Frontend

#### Instalar dependencias
```bash
cd frontend
npm install
```

#### Ejecutar en modo desarrollo
```bash
npm run dev
```

El frontend estará disponible en: `http://localhost:3000`

#### Build para producción
```bash
npm run build
```

---

## 📡 API Endpoints

### Vehículos
- `GET /api/vehicles` - Listar todos los vehículos
- `GET /api/vehicles/{id}` - Obtener vehículo por ID
- `GET /api/vehicles/active` - Listar vehículos activos
- `POST /api/vehicles` - Crear nuevo vehículo
- `PUT /api/vehicles/{id}` - Actualizar vehículo
- `PUT /api/vehicles/{id}/location` - Actualizar ubicación
- `DELETE /api/vehicles/{id}` - Eliminar vehículo

### Ubicaciones
- `GET /api/locations/vehicle/{vehicleId}` - Historial de ubicaciones
- `POST /api/locations/record` - Registrar nueva ubicación
- `GET /api/locations/distance` - Calcular distancia entre puntos

### Viajes
- `GET /api/trips` - Listar todos los viajes
- `GET /api/trips/active` - Viajes en curso
- `POST /api/trips/start` - Iniciar viaje
- `PUT /api/trips/{id}/end` - Finalizar viaje

### Alertas
- `GET /api/alerts` - Listar alertas
- `GET /api/alerts/unresolved` - Alertas pendientes
- `POST /api/alerts` - Crear alerta
- `PUT /api/alerts/{id}/resolve` - Resolver alerta

---

## 🗄️ Modelo de datos

### Entidades principales

**User** (Usuario)
- Roles: CONDUCTOR, OPERADOR, SUPERVISOR, ADMIN
- Gestión de autenticación y permisos

**Vehicle** (Vehículo)
- Información del vehículo (placa, marca, modelo)
- Ubicación actual en tiempo real
- Estado: ACTIVE, INACTIVE, MAINTENANCE, OUT_OF_SERVICE

**Location** (Ubicación)
- Coordenadas GPS (latitud, longitud)
- Velocidad, altitud, precisión
- Timestamp de captura

**Trip** (Viaje)
- Información de inicio y fin
- Distancia total, velocidad promedio
- Estado: IN_PROGRESS, COMPLETED, CANCELLED

**Alert** (Alerta)
- Tipos: OVERSPEED, GEOFENCE_EXIT, EMERGENCY, etc.
- Severidad: LOW, MEDIUM, HIGH, CRITICAL
- Estado de resolución

---

## 🎨 Características del Frontend

### Páginas disponibles

1. **Home** - Página de inicio con presentación
2. **Dashboard** - Panel principal con métricas y mapas
3. **Vehicles** - Gestión de vehículos
4. **Trips** - Gestión de viajes
5. **Alerts** - Gestión de alertas
6. **Login** - Autenticación de usuarios

### Componentes principales

- **MapComponent** - Mapa interactivo con Leaflet
- **VehicleCard** - Tarjeta de vehículo con información
- **Navbar** - Barra de navegación principal

---

## 🔒 Seguridad

- Autenticación mediante **JWT (JSON Web Tokens)**
- **Spring Security** configurado en el backend
- **CORS** habilitado para comunicación frontend-backend
- Encriptación de contraseñas con **BCrypt**

---

## 📝 Próximas características (Roadmap)

- [ ] Implementación completa de JWT en frontend
- [ ] WebSockets para actualización en tiempo real
- [ ] Geocercas (Geofencing) personalizables
- [ ] Reportes exportables (PDF/Excel)
- [ ] Integración con Google Maps API
- [ ] App móvil con React Native
- [ ] Notificaciones push con Firebase
- [ ] Sistema de permisos granular por rol

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

**Mtcarrixo12**  
GitHub: [@Mtcarrixo12](https://github.com/Mtcarrixo12)

---

## 🙏 Agradecimientos

- Spring Boot Team
- React Team
- Leaflet contributors
- TailwindCSS Team
- Comunidad Open Source

---

**GeoTrack** - Monitoreo Vehicular Inteligente 🚗📍
