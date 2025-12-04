#!/bin/bash

echo ""
echo "🚀 GeoTrack Mobility - Starting Application"
echo ""
echo "📋 Prerequisites check:"
echo "  - Java 17+"
echo "  - Maven 3.9+"
echo "  - Node.js 18+"
echo "  - PostgreSQL running on localhost:5432"
echo "  - Database 'geotrack' created"
echo "  - PostgreSQL user: postgres / password: postgres"
echo ""

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ ERROR: Java is not installed or not in PATH"
    echo "   Please install Java 17 or higher"
    exit 1
fi

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "❌ ERROR: Maven is not installed or not in PATH"
    echo "   Please install Maven 3.9 or higher"
    exit 1
fi

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ ERROR: Node.js is not installed or not in PATH"
    echo "   Please install Node.js 18 or higher"
    exit 1
fi

echo "✅ All prerequisites found"
echo ""

# Create logs directory
mkdir -p backend/logs

# Start backend in background
echo "🔧 Starting backend (Spring Boot)..."
echo "   This may take 30-60 seconds on first run..."
cd backend
mvn clean spring-boot:run > logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "⏳ Waiting for backend to initialize..."
sleep 10

# Check if backend is running
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo "❌ ERROR: Backend failed to start"
    echo "   Check backend/logs/backend.log for details"
    exit 1
fi

# Start frontend
echo ""
echo "🎨 Starting frontend (React + Vite)..."
cd frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    echo "   This may take 1-2 minutes on first run..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ ERROR: Failed to install npm dependencies"
        kill $BACKEND_PID
        exit 1
    fi
fi

cd ..

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Application is starting!"
echo ""
echo "   🌐 Frontend: http://localhost:5173"
echo "   🔧 Backend:  http://localhost:8080/api"
echo "   📚 Swagger:  http://localhost:8080/api/swagger-ui.html"
echo ""
echo "   👤 Example credentials (create via frontend):"
echo "      Username: admin"
echo "      Password: password123"
echo ""
echo "   📝 Backend logs: backend/logs/backend.log"
echo ""
echo "   Press Ctrl+C to stop all services"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Start frontend in foreground
cd frontend
npm run dev

# Cleanup on exit
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID 2>/dev/null; exit" EXIT INT TERM
