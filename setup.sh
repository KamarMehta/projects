#!/bin/bash

# 🏕️ Mammoth Lakes Trip Planner - Setup Script

echo "🚀 Welcome to Mammoth Lakes Trip Planner Setup!"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node -v &> /dev/null
then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 16+ from https://nodejs.org${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js version: $(node -v)${NC}"
echo ""

# Install frontend dependencies
echo -e "${YELLOW}📦 Installing frontend dependencies...${NC}"
npm install

# Install backend dependencies
echo -e "${YELLOW}📦 Installing backend dependencies...${NC}"
cd backend
npm install
cd ..

echo ""
echo -e "${GREEN}✅ Dependencies installed!${NC}"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${YELLOW}📝 Creating .env file...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ .env created${NC}"
fi

# Create backend/.env file if it doesn't exist
if [ ! -f backend/.env ]; then
    echo -e "${YELLOW}📝 Creating backend/.env file...${NC}"
    cp backend/.env.example backend/.env
    echo -e "${GREEN}✅ backend/.env created${NC}"
fi

echo ""
echo -e "${GREEN}=================================================="
echo "✅ Setup complete!"
echo -e "==================================================${NC}"
echo ""
echo "📝 Next steps:"
echo "1. Follow the Setup Guide:"
echo "   Open QUICKSTART.md for quick reference"
echo "   Open BACKEND_SETUP.md for detailed setup"
echo ""
echo "2. Configure Google Sheets:"
echo "   - Create service account credentials"
echo "   - Create Google Sheet with Day 1, Day 2, Day 3 sheets"
echo "   - Copy Sheet ID"
echo ""
echo "3. Update environment files:"
echo "   - Edit backend/.env with Google credentials"
echo "   - Edit .env with API URL (should be http://localhost:5000/api)"
echo ""
echo "4. Start the application:"
echo "   Terminal 1: npm run backend"
echo "   Terminal 2: npm run dev"
echo ""
echo "5. Open http://localhost:5173 in your browser"
echo ""
echo -e "${GREEN}Made with ❤️ for your Punjabi Family getaway!${NC}"
