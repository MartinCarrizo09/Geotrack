-- Script de creación de base de datos GeoTrack
-- Ejecutar con: psql -U postgres -h localhost -f create-db.sql

-- Crear base de datos
CREATE DATABASE geotrack
    WITH
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    LOCALE = 'es_ES.UTF-8'
    TEMPLATE = 'template0';

-- Conectar a la base de datos
\c geotrack

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGSERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    telefono VARCHAR(20),
    rol VARCHAR(20) NOT NULL DEFAULT 'CONDUCTOR',
    estado VARCHAR(20) DEFAULT 'ACTIVO',
    ultimo_acceso TIMESTAMP,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de vehículos
CREATE TABLE IF NOT EXISTS vehiculos (
    id BIGSERIAL PRIMARY KEY,
    patente VARCHAR(20) UNIQUE NOT NULL,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    anio INT,
    color VARCHAR(30),
    tipo VARCHAR(20) NOT NULL,
    estado VARCHAR(20) DEFAULT 'ACTIVO',
    conductor_id BIGINT REFERENCES usuarios(id) ON DELETE SET NULL,
    latitud_actual DECIMAL(10, 8),
    longitud_actual DECIMAL(11, 8),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de ubicaciones
CREATE TABLE IF NOT EXISTS ubicaciones (
    id BIGSERIAL PRIMARY KEY,
    vehiculo_id BIGINT NOT NULL REFERENCES vehiculos(id) ON DELETE CASCADE,
    latitud DECIMAL(10, 8) NOT NULL,
    longitud DECIMAL(11, 8) NOT NULL,
    altitud DECIMAL(10, 2),
    velocidad DECIMAL(6, 2),
    rumbo DECIMAL(6, 2),
    precision DECIMAL(6, 2),
    direccion TEXT,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de viajes
CREATE TABLE IF NOT EXISTS viajes (
    id BIGSERIAL PRIMARY KEY,
    vehiculo_id BIGINT NOT NULL REFERENCES vehiculos(id) ON DELETE CASCADE,
    conductor_id BIGINT REFERENCES usuarios(id) ON DELETE SET NULL,
    latitud_inicio DECIMAL(10, 8),
    longitud_inicio DECIMAL(11, 8),
    latitud_fin DECIMAL(10, 8),
    longitud_fin DECIMAL(11, 8),
    hora_inicio TIMESTAMP NOT NULL,
    hora_fin TIMESTAMP,
    distancia DECIMAL(10, 2),
    velocidad_promedio DECIMAL(6, 2),
    estado VARCHAR(20) DEFAULT 'EN_PROGRESO',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de alertas
CREATE TABLE IF NOT EXISTS alertas (
    id BIGSERIAL PRIMARY KEY,
    vehiculo_id BIGINT NOT NULL REFERENCES vehiculos(id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL,
    mensaje TEXT,
    severidad VARCHAR(20),
    estado VARCHAR(20) DEFAULT 'ACTIVA',
    latitud DECIMAL(10, 8),
    longitud DECIMAL(11, 8),
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_resolucion TIMESTAMP,
    resuelto_por BIGINT REFERENCES usuarios(id) ON DELETE SET NULL
);

-- Crear índices para optimización
CREATE INDEX idx_vehiculos_conductor_id ON vehiculos(conductor_id);
CREATE INDEX idx_ubicaciones_vehiculo_id ON ubicaciones(vehiculo_id);
CREATE INDEX idx_ubicaciones_fecha_hora ON ubicaciones(fecha_hora);
CREATE INDEX idx_viajes_vehiculo_id ON viajes(vehiculo_id);
CREATE INDEX idx_viajes_conductor_id ON viajes(conductor_id);
CREATE INDEX idx_alertas_vehiculo_id ON alertas(vehiculo_id);
CREATE INDEX idx_alertas_estado ON alertas(estado);

-- Mensajes de éxito
\echo ''
\echo '✅ Base de datos GeoTrack creada exitosamente!'
\echo '✅ Tablas creadas: usuarios, vehiculos, ubicaciones, viajes, alertas'
\echo '✅ Índices creados para optimización'
\echo ''
\echo 'Siguiente paso: ejecutar populate-db.sql para insertar datos de prueba'
