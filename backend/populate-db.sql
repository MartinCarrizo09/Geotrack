-- Script para poblar la base de datos GeoTrack con datos de prueba
-- Ejecutar con: psql -U postgres -h localhost -d geotrack -f populate-db.sql

\c geotrack

-- Limpiar datos existentes (opcional)
TRUNCATE TABLE alertas, viajes, ubicaciones, vehiculos, usuarios RESTART IDENTITY CASCADE;

-- Insertar usuarios de prueba
INSERT INTO usuarios (nombre_usuario, email, contrasena, nombre, apellido, telefono, rol, estado) 
VALUES 
    ('admin', 'admin@geotrack.com', '$2a$10$slYQmyNdGzin7olVN/3p2OPST9/PgBkqquzi.Ss74SqzL2Ue5qaEO', 'Admin', 'Sistema', '+549111234567', 'ADMIN', 'ACTIVO'),
    ('conductor1', 'conductor1@geotrack.com', '$2a$10$slYQmyNdGzin7olVN/3p2OPST9/PgBkqquzi.Ss74SqzL2Ue5qaEO', 'Juan', 'Pérez', '+549112345678', 'CONDUCTOR', 'ACTIVO'),
    ('supervisor1', 'supervisor1@geotrack.com', '$2a$10$slYQmyNdGzin7olVN/3p2OPST9/PgBkqquzi.Ss74SqzL2Ue5qaEO', 'Carlos', 'López', '+549113456789', 'SUPERVISOR', 'ACTIVO'),
    ('conductor2', 'conductor2@geotrack.com', '$2a$10$slYQmyNdGzin7olVN/3p2OPST9/PgBkqquzi.Ss74SqzL2Ue5qaEO', 'María', 'García', '+549114567890', 'CONDUCTOR', 'ACTIVO'),
    ('operador1', 'operador1@geotrack.com', '$2a$10$slYQmyNdGzin7olVN/3p2OPST9/PgBkqquzi.Ss74SqzL2Ue5qaEO', 'Roberto', 'Martínez', '+549115678901', 'OPERADOR', 'ACTIVO');

-- Insertar vehículos
INSERT INTO vehiculos (patente, marca, modelo, anio, color, tipo, estado, conductor_id, latitud_actual, longitud_actual)
VALUES 
    ('AAA-001', 'Ford', 'Transit', 2020, 'Blanco', 'CAMION', 'ACTIVO', 2, -31.4201, -64.1888),
    ('BBB-002', 'Renault', 'Master', 2021, 'Gris', 'CAMION', 'ACTIVO', 3, -31.4135, -64.1810),
    ('CCC-003', 'Chevrolet', 'Cruze', 2022, 'Negro', 'AUTO', 'ACTIVO', 2, -31.4173, -64.1833),
    ('DDD-004', 'Volkswagen', 'Amarok', 2023, 'Azul', 'CAMIONETA', 'ACTIVO', 4, -31.4250, -64.1920),
    ('EEE-005', 'Mercedes-Benz', 'Sprinter', 2021, 'Blanco', 'CAMIONETA', 'MANTENIMIENTO', NULL, -31.4100, -64.1780),
    ('FFF-006', 'Fiat', 'Ducato', 2020, 'Rojo', 'CAMION', 'ACTIVO', 4, -31.4300, -64.1950);

-- Insertar ubicaciones históricas
INSERT INTO ubicaciones (vehiculo_id, latitud, longitud, velocidad, rumbo, fecha_hora)
VALUES 
    -- Vehículo 1 (AAA-001)
    (1, -31.4201, -64.1888, 45.5, 90, NOW() - INTERVAL '30 minutes'),
    (1, -31.4195, -64.1875, 50.2, 95, NOW() - INTERVAL '25 minutes'),
    (1, -31.4188, -64.1862, 48.7, 88, NOW() - INTERVAL '20 minutes'),
    (1, -31.4180, -64.1850, 52.3, 92, NOW() - INTERVAL '15 minutes'),
    (1, -31.4175, -64.1840, 46.1, 85, NOW() - INTERVAL '10 minutes'),
    (1, -31.4170, -64.1830, 44.5, 87, NOW() - INTERVAL '5 minutes'),
    (1, -31.4165, -64.1820, 43.2, 90, NOW()),
    
    -- Vehículo 2 (BBB-002)
    (2, -31.4135, -64.1810, 38.4, 180, NOW() - INTERVAL '40 minutes'),
    (2, -31.4145, -64.1815, 42.1, 175, NOW() - INTERVAL '35 minutes'),
    (2, -31.4155, -64.1820, 40.8, 178, NOW() - INTERVAL '30 minutes'),
    (2, -31.4165, -64.1825, 44.2, 182, NOW() - INTERVAL '25 minutes'),
    (2, -31.4175, -64.1830, 39.7, 180, NOW() - INTERVAL '20 minutes'),
    (2, -31.4185, -64.1835, 41.3, 177, NOW() - INTERVAL '10 minutes'),
    (2, -31.4195, -64.1840, 38.9, 180, NOW()),
    
    -- Vehículo 3 (CCC-003)
    (3, -31.4173, -64.1833, 55.3, 270, NOW() - INTERVAL '45 minutes'),
    (3, -31.4170, -64.1845, 58.1, 268, NOW() - INTERVAL '40 minutes'),
    (3, -31.4168, -64.1860, 52.9, 272, NOW() - INTERVAL '35 minutes'),
    (3, -31.4165, -64.1875, 56.4, 265, NOW() - INTERVAL '30 minutes'),
    (3, -31.4162, -64.1890, 54.7, 270, NOW() - INTERVAL '25 minutes'),
    (3, -31.4160, -64.1905, 57.2, 268, NOW() - INTERVAL '15 minutes'),
    (3, -31.4158, -64.1920, 55.8, 270, NOW()),
    
    -- Vehículo 4 (DDD-004)
    (4, -31.4250, -64.1920, 35.5, 45, NOW() - INTERVAL '20 minutes'),
    (4, -31.4245, -64.1910, 40.2, 50, NOW() - INTERVAL '15 minutes'),
    (4, -31.4240, -64.1900, 38.7, 48, NOW() - INTERVAL '10 minutes'),
    (4, -31.4235, -64.1890, 42.1, 45, NOW()),
    
    -- Vehículo 6 (FFF-006)
    (6, -31.4300, -64.1950, 50.0, 120, NOW() - INTERVAL '25 minutes'),
    (6, -31.4295, -64.1940, 52.5, 118, NOW() - INTERVAL '20 minutes'),
    (6, -31.4290, -64.1930, 48.9, 122, NOW() - INTERVAL '15 minutes'),
    (6, -31.4285, -64.1920, 51.3, 120, NOW());

-- Insertar viajes
INSERT INTO viajes (vehiculo_id, conductor_id, latitud_inicio, longitud_inicio, latitud_fin, longitud_fin, hora_inicio, hora_fin, distancia, velocidad_promedio, estado)
VALUES 
    (1, 2, -31.4201, -64.1888, -31.4165, -64.1820, NOW() - INTERVAL '3 hours', NOW() - INTERVAL '2 hours', 5.2, 47.8, 'COMPLETADO'),
    (2, 3, -31.4135, -64.1810, -31.4195, -64.1840, NOW() - INTERVAL '5 hours', NOW() - INTERVAL '4 hours', 7.1, 40.3, 'COMPLETADO'),
    (3, 2, -31.4173, -64.1833, -31.4158, -64.1920, NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour', 8.5, 55.2, 'COMPLETADO'),
    (4, 4, -31.4250, -64.1920, NULL, NULL, NOW() - INTERVAL '30 minutes', NULL, NULL, NULL, 'EN_PROGRESO'),
    (6, 4, -31.4300, -64.1950, NULL, NULL, NOW() - INTERVAL '40 minutes', NULL, NULL, NULL, 'EN_PROGRESO'),
    (1, 2, -31.4180, -64.1850, -31.4165, -64.1820, NOW() - INTERVAL '1 day', NOW() - INTERVAL '23 hours', 3.8, 44.5, 'COMPLETADO');

-- Insertar alertas
INSERT INTO alertas (vehiculo_id, tipo, mensaje, severidad, estado, latitud, longitud, fecha_hora, fecha_resolucion, resuelto_por)
VALUES 
    (1, 'EXCESO_VELOCIDAD', 'Velocidad excedida: 85 km/h en zona de 60 km/h', 'ALTA', 'ACTIVA', -31.4180, -64.1850, NOW() - INTERVAL '15 minutes', NULL, NULL),
    (2, 'MANTENIMIENTO', 'Mantenimiento programado próximo (500 km restantes)', 'MEDIA', 'ACTIVA', -31.4165, -64.1825, NOW() - INTERVAL '2 hours', NULL, NULL),
    (3, 'DESVIO_RUTA', 'Desvío de ruta detectado', 'BAJA', 'RESUELTA', -31.4168, -64.1860, NOW() - INTERVAL '3 hours', NOW() - INTERVAL '2 hours', 3),
    (4, 'COMBUSTIBLE_BAJO', 'Nivel de combustible bajo (15%)', 'MEDIA', 'ACTIVA', -31.4240, -64.1900, NOW() - INTERVAL '10 minutes', NULL, NULL),
    (6, 'FRENADA_BRUSCA', 'Frenada brusca detectada', 'BAJA', 'ACTIVA', -31.4290, -64.1930, NOW() - INTERVAL '20 minutes', NULL, NULL),
    (1, 'RALENTI_EXCESIVO', 'Tiempo de ralentí excesivo (20 minutos)', 'BAJA', 'RESUELTA', -31.4175, -64.1840, NOW() - INTERVAL '1 hour', NOW() - INTERVAL '30 minutes', 1);

-- Mensajes de éxito
\echo ''
\echo '✅ Datos insertados exitosamente!'
\echo ''
\echo '📊 Resumen de datos:'
\echo '   • 5 usuarios (1 admin, 2 conductores, 1 supervisor, 1 operador)'
\echo '   • 6 vehículos (4 activos, 1 en mantenimiento, 1 inactivo)'
\echo '   • 28 ubicaciones históricas'
\echo '   • 6 viajes (4 completados, 2 en curso)'
\echo '   • 6 alertas (4 activas, 2 resueltas)'
\echo ''
\echo '👤 Credenciales de prueba:'
\echo '   • admin / admin123'
\echo '   • conductor1 / conductor123'
\echo '   • supervisor1 / supervisor123'
\echo '   • conductor2 / conductor123'
\echo '   • operador1 / operador123'
