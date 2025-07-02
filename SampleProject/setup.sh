#!/bin/bash

echo "🚀 UniList Library Test Project Setup"
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Create project directory
PROJECT_NAME="UniListTestProject"
echo "📁 Creating project directory: $PROJECT_NAME"

if [ -d "$PROJECT_NAME" ]; then
    echo "⚠️  Directory already exists. Removing..."
    rm -rf "$PROJECT_NAME"
fi

mkdir "$PROJECT_NAME"
cd "$PROJECT_NAME"

# Initialize Expo project
echo "📱 Initializing Expo project..."
npx create-expo-app@latest . --template blank-typescript --yes

# Install UniList library
echo "📦 Installing UniList library..."
npm install ../react-native-unilist

# Copy App.tsx
echo "📄 Copying App.tsx..."
cp ../App.tsx ./App.tsx

# Copy package.json
echo "📄 Copying package.json..."
cp ../package.json ./package.json

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "To start the app:"
echo "  cd $PROJECT_NAME"
echo "  npm start"
echo ""
echo "Then:"
echo "  - Press 'i' for iOS simulator"
echo "  - Press 'a' for Android emulator"
echo "  - Scan QR code with Expo Go app"
echo ""
echo "Features to test:"
echo "  🌙/☀️ Theme toggle"
echo "  🔍 Search functionality"
echo "  📱/📐/🎠/🧱 Different layouts"
echo "  Color scheme buttons"
echo "  Pagination and loading"
echo "" 