#!/bin/bash

# FractureNetAnalytics Startup Script
# This script helps you get the application running properly

echo "🚀 FractureNetAnalytics Setup & Startup Script"
echo "=============================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root directory."
    exit 1
fi

echo "📦 Step 1: Installing Frontend Dependencies..."
echo "----------------------------------------------"
if command -v pnpm &> /dev/null; then
    echo "Using pnpm..."
    pnpm install
else
    echo "Using npm..."
    npm install
fi

if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

echo "✅ Frontend dependencies installed"
echo ""

echo "🐍 Step 2: Installing Backend Dependencies..."
echo "----------------------------------------------"
cd backend

if [ ! -f "requirements.txt" ]; then
    echo "❌ Error: backend/requirements.txt not found"
    exit 1
fi

# Check if Python is available
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "❌ Error: Python is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Use python3 if available, otherwise python
PYTHON_CMD="python3"
if ! command -v python3 &> /dev/null; then
    PYTHON_CMD="python"
fi

echo "Using $PYTHON_CMD..."
$PYTHON_CMD -m pip install -r requirements.txt --user

if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

cd ..
echo "✅ Backend dependencies installed"
echo ""

echo "🎉 Installation Complete!"
echo "=============================================="
echo ""
echo "To start the application, open TWO terminal windows:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend"
echo "  python app.py"
echo ""
echo "Terminal 2 (Frontend):"
echo "  npm run dev"
echo ""
echo "Then visit: http://localhost:3000"
echo ""
echo "⚠️  IMPORTANT: You must start the Flask backend BEFORE using the website,"
echo "    otherwise predictions will fail with connection errors."
echo ""
