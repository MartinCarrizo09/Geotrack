# 🚗 GeoTrack - Sistema de Rastreo Vehicular

## 📋 Índice
1. [Descripción General](#descripción-general)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Base de Datos](#base-de-datos)
6. [Backend - API REST](#backend---api-rest)
7. [Frontend - Interfaz Web](#frontend---interfaz-web)
8. [Funcionalidades Principales](#funcionalidades-principales)
9. [Control de Acceso por Roles](#control-de-acceso-por-roles)
10. [Instalación y Configuración](#instalación-y-configuración)
11. [Guía de Uso](#guía-de-uso)

---

## 📖 Descripción General

**GeoTrack** es un sistema integral de rastreo y gestión vehicular diseñado para empresas de transporte y logística. Permite el monitoreo en tiempo real de flotas de vehículos, gestión de viajes, control de conductores y sistema de alertas.

### Objetivo
Proporcionar una solución completa para:
- **Rastreo GPS** de vehículos en tiempo real
- **Gestión de viajes** con inicio, fin y estadísticas
- **Control de conductores** y asignación de vehículos
- **Sistema de alertas** (exceso de velocidad, mantenimiento, etc.)
- **Análisis de datos** con dashboards interactivos

### Caso de Uso
Inspirado en el **RePAT** (Registro Provincial de Antecedentes de Tránsito) de Córdoba, el sistema puede extenderse para:
- Registro de infracciones de tránsito
- Sistema de puntos en licencias
- Gestión de multas y sanciones
- Control de vencimiento de licencias

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENTE WEB (React)                     │
│  ┌────────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │ Dashboard  │  │ Vehículos│  │  Viajes  │  │  Alertas │ │
│  └────────────┘  └──────────┘  └──────────┘  └──────────┘ │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTP/REST
                             │
┌────────────────────────────▼────────────────────────────────┐
│                  BACKEND (Spring Boot)                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              REST Controllers                          │ │
│  │  Vehicle │ Trip │ User │ Alert │ Location             │ │
│  └──────────┬─────────────────────────────────────────────┘ │
│             │                                                │
│  ┌──────────▼─────────────────────────────────────────────┐ │
│  │              Service Layer                             │ │
│  │  Lógica de negocio, validaciones, cálculos            │ │
│  └──────────┬─────────────────────────────────────────────┘ │
│             │                                                │
│  ┌──────────▼─────────────────────────────────────────────┐ │
│  │              Repository Layer (JPA)                    │ │
│  │  Acceso a datos, queries personalizadas               │ │
│  └──────────┬─────────────────────────────────────────────┘ │
└─────────────┼──────────────────────────────────────────────┘
              │ JDBC
┌─────────────▼─────────────────────────────────────────────┐
│                PostgreSQL Database                         │
│  ┌──────────┐  ┌────────┐  ┌────────┐  ┌────────────┐   │
│  │ usuarios │  │viajes  │  │alertas │  │ubicaciones │   │
│  └──────────┘  └────────┘  └────────┘  └────────────┘   │
│  ┌──────────┐                                             │
│  │vehiculos │                                             │
│  └──────────┘                                             │
└───────────────────────────────────────────────────────────┘
```

**Arquitectura de 3 capas:**
1. **Capa de Presentación**: React + Vite
2. **Capa de Lógica**: Spring Boot + Java 21
3. **Capa de Datos**: PostgreSQL 18

---

## 💻 Tecnologías Utilizadas

### Backend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Java** | 21 LTS | Lenguaje de programación |
| **Spring Boot** | 3.2.0 | Framework backend |
| **Spring Data JPA** | - | ORM y persistencia |
| **Hibernate** | - | Implementación JPA |
| **PostgreSQL** | 18 | Base de datos relacional |
| **Lombok** | - | Reducción de boilerplate |
| **Maven** | - | Gestor de dependencias |

### Frontend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.3 | Framework UI |
| **Vite** | 5.4.21 | Build tool y dev server |
| **React Router** | 6.x | Navegación SPA |
| **Axios** | - | Cliente HTTP |
| **Leaflet** | - | Mapas interactivos |
| **TailwindCSS** | - | Framework CSS |

---

## 📁 Estructura del Proyecto

```
GeoTrack/
│
├── backend/                          # Aplicación Spring Boot
│   ├── src/
│   │   └── main/
│   │       ├── java/com/geotrack/mobility/
│   │       │   ├── MobilityApplication.java        # Clase principal
│   │       │   ├── config/
│   │       │   │   └── SecurityConfig.java         # Configuración seguridad
│   │       │   ├── controller/                     # REST Controllers
│   │       │   │   ├── AlertController.java
│   │       │   │   ├── LocationController.java
│   │       │   │   ├── TripController.java
│   │       │   │   ├── UserController.java
│   │       │   │   └── VehicleController.java
│   │       │   ├── model/                          # Entidades JPA
│   │       │   │   ├── Alert.java
│   │       │   │   ├── Location.java
│   │       │   │   ├── Trip.java
│   │       │   │   ├── User.java
│   │       │   │   └── Vehicle.java
│   │       │   ├── repository/                     # Repositorios JPA
│   │       │   │   ├── AlertRepository.java
│   │       │   │   ├── LocationRepository.java
│   │       │   │   ├── TripRepository.java
│   │       │   │   ├── UserRepository.java
│   │       │   │   └── VehicleRepository.java
│   │       │   └── service/                        # Lógica de negocio
│   │       │       ├── AlertService.java
│   │       │       ├── LocationService.java
│   │       │       ├── TripService.java
│   │       │       └── VehicleService.java
│   │       └── resources/
│   │           └── application.yml                 # Configuración app
│   ├── create-db.sql                               # Script creación BD
│   ├── populate-db.sql                             # Datos de prueba
│   └── pom.xml                                     # Dependencias Maven
│
├── frontend/                         # Aplicación React
│   ├── src/
│   │   ├── components/                             # Componentes reutilizables
│   │   │   ├── MapComponent.jsx                    # Mapa con Leaflet
│   │   │   ├── Navbar.jsx                          # Barra de navegación
│   │   │   └── VehicleCard.jsx                     # Tarjeta de vehículo
│   │   ├── pages/                                  # Páginas principales
│   │   │   ├── Alerts.jsx                          # Gestión de alertas
│   │   │   ├── Dashboard.jsx                       # Panel principal
│   │   │   ├── Home.jsx                            # Página inicio
│   │   │   ├── Login.jsx                           # Autenticación
│   │   │   ├── Trips.jsx                           # Gestión de viajes
│   │   │   ├── Users.jsx                           # Gestión de usuarios
│   │   │   └── Vehicles.jsx                        # Gestión de vehículos
│   │   ├── services/
│   │   │   └── api.js                              # Cliente API REST
│   │   ├── App.jsx                                 # Componente raíz
│   │   ├── main.jsx                                # Entry point
│   │   └── index.css                               # Estilos globales
│   ├── package.json                                # Dependencias npm
│   ├── vite.config.js                              # Configuración Vite
│   └── tailwind.config.js                          # Configuración Tailwind
│
├── README.md                         # Documentación básica
├── DOCUMENTACION.md                  # Esta documentación
└── start.sh                          # Script de inicio (Linux/Mac)
```

---

## 🗄️ Base de Datos

### Modelo de Datos

```sql
usuarios
├── id (PK)
├── nombre_usuario
├── email
├── contrasena
├── nombre
├── apellido
├── telefono
├── rol (ADMIN, CONDUCTOR, SUPERVISOR, OPERADOR)
├── estado (ACTIVO, INACTIVO)
└── timestamps

vehiculos
├── id (PK)
├── patente (UNIQUE)
├── marca
├── modelo
├── anio
├── color
├── tipo (AUTO, CAMION, CAMIONETA, MOTO, BUS)
├── estado (ACTIVO, INACTIVO, MANTENIMIENTO)
├── conductor_id (FK → usuarios)
├── latitud_actual
├── longitud_actual
└── timestamps

viajes
├── id (PK)
├── vehiculo_id (FK → vehiculos)
├── conductor_id (FK → usuarios)
├── latitud_inicio
├── longitud_inicio
├── latitud_fin
├── longitud_fin
├── hora_inicio
├── hora_fin
├── distancia (km)
├── velocidad_promedio (km/h)
└── estado (EN_PROGRESO, COMPLETADO, CANCELADO)

ubicaciones (historial GPS)
├── id (PK)
├── vehiculo_id (FK → vehiculos)
├── latitud
├── longitud
├── altitud
├── velocidad
├── rumbo
├── precision
├── direccion
└── fecha_hora

alertas
├── id (PK)
├── vehiculo_id (FK → vehiculos)
├── tipo (EXCESO_VELOCIDAD, MANTENIMIENTO, etc.)
├── mensaje
├── severidad (BAJA, MEDIA, ALTA)
├── estado (ACTIVA, RESUELTA)
├── latitud
├── longitud
├── fecha_hora
├── fecha_resolucion
└── resuelto_por (FK → usuarios)
```

### Relaciones
- Un **usuario** puede tener múltiples **vehículos** asignados
- Un **vehículo** tiene múltiples **ubicaciones** (historial)
- Un **viaje** pertenece a un **vehículo** y un **conductor**
- Una **alerta** pertenece a un **vehículo**

### Índices Optimizados
```sql
-- Búsquedas frecuentes por conductor
CREATE INDEX idx_vehiculos_conductor_id ON vehiculos(conductor_id);

-- Historial de ubicaciones por vehículo
CREATE INDEX idx_ubicaciones_vehiculo_id ON ubicaciones(vehiculo_id);
CREATE INDEX idx_ubicaciones_fecha_hora ON ubicaciones(fecha_hora);

-- Consultas de viajes
CREATE INDEX idx_viajes_vehiculo_id ON viajes(vehiculo_id);
CREATE INDEX idx_viajes_conductor_id ON viajes(conductor_id);

-- Filtrado de alertas
CREATE INDEX idx_alertas_vehiculo_id ON alertas(vehiculo_id);
CREATE INDEX idx_alertas_estado ON alertas(estado);
```

---

## 🔧 Backend - API REST

### Configuración (`application.yml`)
```yaml
spring:
  application:
    name: mobility
  datasource:
    url: jdbc:postgresql://localhost:5432/geotrack
    username: postgres
    password: tpi
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
server:
  port: 8080
```

### Endpoints Principales

#### 🚗 Vehículos (`/api/vehicles`)
```
GET    /api/vehicles                    # Listar todos
GET    /api/vehicles/{id}               # Obtener por ID
GET    /api/vehicles/license/{plate}    # Buscar por patente
GET    /api/vehicles/driver/{driverId}  # Vehículos de un conductor
GET    /api/vehicles/active              # Solo activos
GET    /api/vehicles/with-location       # Con ubicación GPS
POST   /api/vehicles                     # Crear vehículo
PUT    /api/vehicles/{id}                # Actualizar vehículo
PUT    /api/vehicles/{id}/location       # Actualizar ubicación GPS
DELETE /api/vehicles/{id}                # Eliminar
```

#### 🛣️ Viajes (`/api/trips`)
```
GET    /api/trips                        # Listar todos
GET    /api/trips/{id}                   # Obtener por ID
GET    /api/trips/vehicle/{vehicleId}    # Viajes de un vehículo
GET    /api/trips/driver/{driverId}      # Viajes de un conductor
GET    /api/trips/active                 # Viajes en curso
POST   /api/trips                        # Iniciar viaje
PUT    /api/trips/{id}/end               # Finalizar viaje
DELETE /api/trips/{id}                   # Eliminar
```

#### 👥 Usuarios (`/api/users`)
```
GET    /api/users                        # Listar todos
GET    /api/users/{id}                   # Obtener por ID
GET    /api/users/role/{role}            # Filtrar por rol
POST   /api/users                        # Crear usuario
PUT    /api/users/{id}                   # Actualizar
DELETE /api/users/{id}                   # Eliminar
```

#### 🚨 Alertas (`/api/alerts`)
```
GET    /api/alerts                       # Listar todas
GET    /api/alerts/{id}                  # Obtener por ID
GET    /api/alerts/vehicle/{vehicleId}   # Alertas de un vehículo
GET    /api/alerts/unresolved            # Alertas sin resolver
POST   /api/alerts                       # Crear alerta
PUT    /api/alerts/{id}/resolve          # Resolver alerta
DELETE /api/alerts/{id}                  # Eliminar
```

#### 📍 Ubicaciones (`/api/locations`)
```
GET    /api/locations/vehicle/{vehicleId}           # Historial de vehículo
GET    /api/locations/vehicle/{vehicleId}/latest    # Última ubicación
POST   /api/locations                                # Registrar ubicación
```

### Modelos de Datos (Entities)

#### Vehicle.java
```java
@Entity
@Table(name = "vehiculos")
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String licensePlate;  // Patente
    
    private String brand;          // Marca
    private String model;          // Modelo
    private Integer year;          // Año
    private String color;          // Color
    
    @Enumerated(EnumType.STRING)
    private VehicleType type;      // AUTO, CAMION, etc.
    
    @Enumerated(EnumType.STRING)
    private VehicleStatus status;  // ACTIVO, MANTENIMIENTO, etc.
    
    @ManyToOne
    @JoinColumn(name = "driver_id")
    private User driver;           // Conductor asignado
    
    @Column(name = "latitud_actual")
    private Double currentLatitude;
    
    @Column(name = "longitud_actual")
    private Double currentLongitude;
    
    @Transient
    private Double currentSpeed;
}
```

#### Trip.java
```java
@Entity
@Table(name = "viajes")
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;
    
    @ManyToOne
    @JoinColumn(name = "driver_id")
    private User driver;
    
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    
    private Double startLatitude;
    private Double startLongitude;
    private Double endLatitude;
    private Double endLongitude;
    
    private Double totalDistance;    // km
    private Double averageSpeed;     // km/h
    private Double maxSpeed;         // km/h
    
    @Enumerated(EnumType.STRING)
    private TripStatus status;       // IN_PROGRESS, COMPLETED
    
    private String notes;
}
```

### Lógica de Negocio (Services)

#### VehicleService
- `getVehiclesWithLocation()`: Filtra vehículos con coordenadas GPS
- `updateVehicleLocation()`: Actualiza posición GPS en tiempo real
- `getActiveVehicles()`: Solo vehículos en estado ACTIVO

#### TripService
- `startTrip()`: Inicia viaje, valida vehículo disponible
- `endTrip()`: Finaliza viaje, calcula estadísticas
- `getActiveTrips()`: Viajes EN_PROGRESO con datos de vehículo/conductor

---

## 🎨 Frontend - Interfaz Web

### Estructura de Componentes

#### `App.jsx` - Enrutador Principal
```jsx
<BrowserRouter>
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<ProtectedRoute />}>
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/trips" element={<Trips />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/users" element={<Users />} />
    </Route>
  </Routes>
</BrowserRouter>
```

### Páginas Principales

#### 📊 Dashboard
**Funcionalidad:**
- Vista general del sistema
- Tarjetas con KPIs (vehículos activos, viajes en curso, alertas)
- Mapa interactivo con trackeo en tiempo real
- Lista de alertas recientes
- Lista de viajes activos

**Características:**
- Auto-refresh cada 30 segundos
- Click en viaje → navega al mapa y resalta
- Marcadores de colores:
  - 🔴 Rojo: Vehículos disponibles
  - 🟢 Verde: Viajes activos (posición actual)
  - 🔵 Azul: Punto de inicio de viaje
  - 🟡 Amarillo: Viaje seleccionado (resaltado)

#### 🚗 Vehículos
**Funcionalidad:**
- CRUD completo de vehículos
- Filtros por tipo y estado
- Asignación de conductores
- Vista en tarjetas responsivas

**Formulario:**
- Patente (único)
- Marca, modelo, año, color
- Tipo (Auto, Camión, Camioneta, Bus)
- Estado (Activo, Mantenimiento, Fuera de servicio)
- Conductor asignado

#### 🛣️ Viajes
**Funcionalidad:**
- Iniciar viajes
- Ver detalles completos
- Finalizar viajes
- Historial con filtros

**Iniciar Viaje:**
- Selección de vehículo
- Selección de conductor
- Coordenadas GPS inicio
- Notas opcionales

**Vista Detalles (Modal Responsive):**
- Información del vehículo
- Datos del conductor
- Estado y tiempos
- Ubicaciones (inicio/fin)
- Estadísticas (distancia, velocidades)
- Notas del viaje
- Botón "Finalizar Viaje"

#### 🚨 Alertas
**Funcionalidad:**
- Lista de alertas
- Filtros por severidad y estado
- Resolver alertas
- Ver historial

**Tipos de Alertas:**
- Exceso de velocidad
- Mantenimiento programado
- Desvío de ruta
- Combustible bajo
- Frenada brusca
- Ralentí excesivo

#### 👥 Usuarios
**Funcionalidad:**
- CRUD de usuarios/conductores
- Filtros por rol
- Activar/Desactivar usuarios

**Roles:**
- ADMIN: Acceso total
- SUPERVISOR: Gestión operativa
- CONDUCTOR: Solo viajes
- OPERADOR: Monitoreo y alertas

### Componentes Reutilizables

#### `MapComponent.jsx`
**Props:**
- `vehicles`: Array de vehículos con ubicación
- `trips`: Array de viajes activos
- `selectedTripId`: ID del viaje a resaltar
- `center`: Coordenadas del centro del mapa
- `zoom`: Nivel de zoom inicial

**Características:**
- Integración con Leaflet
- Marcadores dinámicos según estado
- Popups informativos
- Líneas de ruta (inicio → actual)
- Auto-centrado en viaje seleccionado

#### `Navbar.jsx`
**Características:**
- Navegación responsiva
- Menú hamburguesa en móvil
- Filtrado de rutas por rol
- Display de usuario y rol
- Botón de logout

### Servicios API (`api.js`)

```javascript
const API_URL = 'http://localhost:8080/api'

export const vehicleAPI = {
  getAll: () => axios.get(`${API_URL}/vehicles`),
  getWithLocation: () => axios.get(`${API_URL}/vehicles/with-location`),
  create: (data) => axios.post(`${API_URL}/vehicles`, data),
  // ...
}

export const tripAPI = {
  getActive: () => axios.get(`${API_URL}/trips/active`),
  start: (data) => axios.post(`${API_URL}/trips`, data),
  end: (id) => axios.put(`${API_URL}/trips/${id}/end`),
  // ...
}
```

### Estilos (TailwindCSS)

**Clases Personalizadas:**
```css
.btn-primary {
  @apply bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md;
}

.card {
  @apply bg-white p-6 rounded-lg shadow-md;
}

.input-field {
  @apply w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2;
}
```

**Breakpoints Responsivos:**
- `sm`: 640px (móvil grande)
- `md`: 768px (tablet)
- `lg`: 1024px (laptop)
- `xl`: 1280px (desktop)

---

## ⚙️ Funcionalidades Principales

### 1. Rastreo en Tiempo Real
- **Actualización GPS**: Cada vehículo reporta latitud/longitud
- **Visualización en Mapa**: Marcadores Leaflet actualizados
- **Auto-refresh**: Dashboard se actualiza cada 30 segundos
- **Historial**: Tabla `ubicaciones` guarda trayectoria completa

### 2. Gestión de Viajes
- **Inicio**: Selecciona vehículo, conductor, punto de partida
- **Tracking**: Monitorea posición actual vs inicio
- **Finalización**: Registra punto final y calcula:
  - Distancia total recorrida
  - Velocidad promedio
  - Velocidad máxima
  - Duración del viaje

### 3. Sistema de Alertas
**Alertas Automáticas:**
- Exceso de velocidad (comparación con límites)
- Mantenimiento preventivo (basado en km)
- Desvío de ruta (comparación con ruta planificada)
- Combustible bajo
- Comportamiento de conducción (frenadas bruscas)

**Gestión:**
- Dashboard muestra alertas activas
- Notificaciones por severidad
- Resolución con usuario responsable
- Historial de alertas resueltas

### 4. Analytics y Reportes
- Total de vehículos activos
- Viajes en curso
- Alertas pendientes
- Velocidad promedio de flota
- Gráficos de tendencias (futuro)

---

## 🔐 Control de Acceso por Roles

### Permisos por Rol

| Funcionalidad | ADMIN | SUPERVISOR | OPERADOR | CONDUCTOR |
|---------------|-------|------------|----------|-----------|
| **Dashboard** | ✅ | ✅ | ✅ | ❌ |
| **Ver Vehículos** | ✅ | ✅ | ✅ | ❌ |
| **Crear/Editar Vehículos** | ✅ | ✅ | ✅ | ❌ |
| **Ver Viajes** | ✅ | ✅ | ✅ | ✅ |
| **Crear Viajes** | ✅ | ✅ | ✅ | ✅ |
| **Finalizar Viajes** | ✅ | ✅ | ✅ | ✅ |
| **Ver Alertas** | ✅ | ✅ | ✅ | ❌ |
| **Resolver Alertas** | ✅ | ✅ | ✅ | ❌ |
| **Gestión Usuarios** | ✅ | ✅ | ❌ | ❌ |
| **Crear Usuarios** | ✅ | ✅ | ❌ | ❌ |

### Implementación

#### Frontend (Navbar.jsx)
```javascript
const userRole = localStorage.getItem('userRole')

const canViewDashboard = ['ADMIN', 'SUPERVISOR', 'OPERADOR'].includes(userRole)
const canViewVehicles = ['ADMIN', 'SUPERVISOR', 'OPERADOR'].includes(userRole)
const canViewUsers = ['ADMIN', 'SUPERVISOR'].includes(userRole)
const canViewAlerts = ['ADMIN', 'SUPERVISOR', 'OPERADOR'].includes(userRole)
const canViewTrips = true // Todos pueden ver viajes
```

#### Backend (SecurityConfig.java)
```java
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors().and().csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/**").permitAll()
                .anyRequest().authenticated()
            );
        return http.build();
    }
}
```

### Credenciales de Prueba

| Usuario | Contraseña | Rol | Nombre Completo |
|---------|------------|-----|-----------------|
| `admin` | `admin123` | ADMIN | Admin Sistema |
| `supervisor1` | `supervisor123` | SUPERVISOR | Carlos López |
| `conductor1` | `conductor123` | CONDUCTOR | Juan Pérez |
| `conductor2` | `conductor123` | CONDUCTOR | María García |
| `operador1` | `operador123` | OPERADOR | Roberto Martínez |

---

## 🚀 Instalación y Configuración

### Prerrequisitos
- ☕ **Java JDK 21** ([Descargar](https://www.oracle.com/java/technologies/downloads/#java21))
- 🐘 **PostgreSQL 18** ([Descargar](https://www.postgresql.org/download/))
- 📦 **Node.js 18+** ([Descargar](https://nodejs.org/))
- 🔧 **Maven** (incluido en IDE)

### Paso 1: Clonar Repositorio
```bash
git clone https://github.com/MartinCarrizo09/Geotrack.git
cd Geotrack
```

### Paso 2: Configurar Base de Datos

#### Crear Base de Datos
```bash
# Opción 1: Usando psql
psql -U postgres

# Opción 2: Usando scripts SQL
cd backend
psql -U postgres -f create-db.sql
psql -U postgres -d geotrack -f populate-db.sql
```

#### Configurar Credenciales
Editar `backend/src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/geotrack
    username: postgres
    password: TU_PASSWORD_AQUI
```

### Paso 3: Iniciar Backend

#### Opción A: Maven
```bash
cd backend
mvn spring-boot:run
```

#### Opción B: IDE (IntelliJ/Eclipse)
1. Abrir proyecto `backend`
2. Ejecutar `MobilityApplication.java`
3. Esperar inicialización en `http://localhost:8080`

### Paso 4: Iniciar Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicación disponible en `http://localhost:3000`

### Verificar Instalación

1. **Backend**: Acceder a `http://localhost:8080/api/vehicles`
2. **Frontend**: Abrir `http://localhost:3000`
3. **Login**: Usar `admin` / `admin123`
4. **Dashboard**: Verificar mapa con marcadores

---

## 📱 Guía de Uso

### 1. Iniciar Sesión
1. Abrir `http://localhost:3000`
2. Ingresar credenciales (ej: `admin` / `admin123`)
3. Navegar al Dashboard

### 2. Monitorear Flota (Dashboard)
- **Vista General**: KPIs en tarjetas superiores
- **Mapa**: Ver vehículos y viajes activos
- **Alertas**: Revisar pendientes en panel derecho
- **Viajes Activos**: Click en viaje → resalta en mapa

### 3. Gestionar Vehículos
1. Ir a **Vehículos**
2. Click **+ Nuevo Vehículo**
3. Completar formulario:
   - Patente única (ej: ABC-123)
   - Marca, modelo, año
   - Tipo de vehículo
   - Asignar conductor
4. **Guardar**

### 4. Crear Viaje
1. Ir a **Viajes**
2. Click **+ Nuevo Viaje**
3. Seleccionar:
   - Vehículo disponible
   - Conductor asignado
   - Coordenadas inicio (ej: -31.4201, -64.1888)
4. **Iniciar Viaje**
5. El viaje aparece en mapa con marcador verde

### 5. Ver Detalles de Viaje
1. En lista de viajes, click **Ver Detalles**
2. Modal muestra:
   - Info vehículo y conductor
   - Punto de inicio (mapa)
   - Estadísticas (si finalizado)
   - Notas
3. **Finalizar Viaje** (si está activo)

### 6. Gestionar Alertas
1. Ir a **Alertas**
2. Ver alertas por severidad:
   - 🔴 Alta: Rojo
   - 🟡 Media: Amarillo
   - 🟢 Baja: Verde
3. Click **Resolver** para marcar como atendida

### 7. Administrar Usuarios (Admin/Supervisor)
1. Ir a **Usuarios**
2. Filtrar por rol (Conductores, Supervisores, etc.)
3. **+ Nuevo Usuario**:
   - Nombre de usuario único
   - Email
   - Contraseña
   - Nombre completo
   - Teléfono
   - Rol
4. **Guardar**

### 8. Trackear Viaje en Tiempo Real
1. En **Dashboard**, localizar viaje activo
2. Click en tarjeta del viaje
3. Mapa centra y resalta con marcador amarillo
4. Línea muestra ruta desde inicio

---

## 🎯 Casos de Uso Adicionales

### Escenario 1: Empresa de Transporte de Carga
**Problema**: Necesitan saber ubicación exacta de 50 camiones en ruta.

**Solución con GeoTrack**:
1. Registrar 50 vehículos con GPS
2. Asignar conductores a cada camión
3. Iniciar viaje al comenzar ruta
4. Dashboard muestra todos en mapa en tiempo real
5. Alertas si se desvían o exceden velocidad
6. Finalizar viaje al llegar a destino

### Escenario 2: Flota de Taxis
**Problema**: Optimizar asignación de taxis cercanos.

**Solución**:
1. Actualizar ubicación GPS cada 10 segundos
2. Dashboard muestra taxis disponibles (sin viaje activo)
3. Sistema de alertas para mantenimiento preventivo
4. Historial de viajes por conductor
5. Estadísticas de rendimiento

### Escenario 3: Control de Infracciones (RePAT)
**Extensión del Sistema**:
1. **Nuevas Tablas**:
   - `infracciones`: tipo, fecha, lugar, estado
   - `licencias`: número, categoría, vencimiento, puntos
2. **Alertas Automáticas**:
   - Exceso de velocidad → crear infracción
   - Acumulación de puntos → suspensión
3. **Dashboard**: Módulo de infracciones
4. **Reportes**: Conductores con más infracciones

---

## 📈 Mejoras Futuras

### Corto Plazo
- [ ] Notificaciones push en tiempo real
- [ ] Exportar reportes a PDF/Excel
- [ ] Filtros avanzados en todas las páginas
- [ ] Búsqueda global

### Mediano Plazo
- [ ] App móvil (React Native)
- [ ] Integración con APIs de mapas (Google Maps)
- [ ] Geocodificación inversa (coordenadas → dirección)
- [ ] Rutas planificadas vs reales
- [ ] WebSockets para updates en tiempo real

### Largo Plazo
- [ ] Machine Learning para predecir mantenimientos
- [ ] Análisis de comportamiento de conducción
- [ ] Integración con sistemas de telemetría vehicular
- [ ] API pública para terceros
- [ ] Sistema de facturación automática

---

## 🐛 Troubleshooting

### Error: Backend no inicia
**Causa**: PostgreSQL no está corriendo o credenciales incorrectas.

**Solución**:
```bash
# Verificar PostgreSQL
sudo systemctl status postgresql

# Verificar conexión
psql -U postgres -d geotrack -c "SELECT 1"
```

### Error: Frontend no muestra datos
**Causa**: CORS o backend no disponible.

**Solución**:
1. Verificar backend en `http://localhost:8080/api/vehicles`
2. Revisar consola del navegador (F12)
3. Verificar `SecurityConfig.java` tiene CORS habilitado

### Error: Mapa no carga
**Causa**: Leaflet CSS no importado o red lenta.

**Solución**:
```jsx
// Verificar en MapComponent.jsx
import 'leaflet/dist/leaflet.css'
```

### Error: Vehículos sin ubicación
**Causa**: Columnas `latitud_actual` y `longitud_actual` en NULL.

**Solución**:
```sql
UPDATE vehiculos 
SET latitud_actual = -31.4201, 
    longitud_actual = -64.1888 
WHERE id = 1;
```

---

## 📞 Contacto y Soporte

**Desarrollador**: Martín Carrizo  
**GitHub**: [@MartinCarrizo09](https://github.com/MartinCarrizo09)  
**Proyecto**: [GeoTrack Repository](https://github.com/MartinCarrizo09/Geotrack)

---

## 📄 Licencia

Este proyecto fue desarrollado como proyecto académico para la Universidad Tecnológica Nacional - Facultad Regional Córdoba.

---

## 🙏 Agradecimientos

- **Profesor/Tutor**: [Nombre del Profesor]
- **UTN FRC**: Por el apoyo y recursos
- **RePAT Córdoba**: Inspiración del sistema real

---

## 📚 Referencias

1. [Spring Boot Documentation](https://spring.io/projects/spring-boot)
2. [React Documentation](https://react.dev/)
3. [Leaflet Documentation](https://leafletjs.com/)
4. [PostgreSQL Documentation](https://www.postgresql.org/docs/)
5. [TailwindCSS Documentation](https://tailwindcss.com/docs)

---

**Última Actualización**: Diciembre 3, 2025  
**Versión**: 1.0.0
