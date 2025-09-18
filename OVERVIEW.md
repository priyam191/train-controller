# 🚆 Margdarshak - Railway Decision-Support System

## Project Overview
**Margdarshak** is a comprehensive railway traffic control and decision-support system designed for SIH 2025. The system provides real-time train monitoring, conflict detection, and intelligent decision-making capabilities for railway controllers. It features an interactive dashboard with live train tracking, KPI monitoring, and conflict resolution suggestions.

## 🏗️ Project Structure

```
train-controller/
├── backend/                    # Node.js Express Server
│   ├── data/
│   │   └── mock_data.json     # Sample train and conflict data
│   ├── node_modules/          # Backend dependencies
│   ├── package.json           # Backend package configuration
│   ├── package-lock.json      # Backend dependency lock
│   └── server.js              # Main Express server file
├── frontend/                   # React.js Frontend Application
│   ├── public/                # Static assets
│   │   ├── favicon.ico        # Browser favicon
│   │   ├── index.html         # Main HTML template
│   │   ├── logo192.png        # App logo (192px)
│   │   ├── logo512.png        # App logo (512px)
│   │   ├── manifest.json      # PWA manifest
│   │   └── robots.txt         # SEO robots file
│   ├── src/                   # React source code
│   │   ├── components/        # Reusable React components
│   │   │   ├── KPI.js         # Key Performance Indicator component
│   │   │   ├── Navbar.js      # Navigation bar component
│   │   │   └── TrainMap.js    # Interactive map with train positions
│   │   ├── pages/             # Page-level components
│   │   │   ├── Dashboard.js   # Main dashboard page
│   │   │   ├── Login.js       # Controller authentication page
│   │   │   └── WhatIf.js      # Future scenario analysis page
│   │   ├── App.css            # Application styles
│   │   ├── App.js             # Main React application component
│   │   ├── App.test.js        # App component tests
│   │   ├── index.css          # Global styles
│   │   ├── index.js           # React application entry point
│   │   ├── logo.svg           # React logo
│   │   ├── reportWebVitals.js # Performance monitoring
│   │   └── setupTests.js      # Test configuration
│   ├── .gitignore            # Git ignore rules
│   ├── package.json          # Frontend package configuration
│   ├── package-lock.json     # Frontend dependency lock
│   └── README.md             # Create React App documentation
└── package.json              # Root package configuration
```

## 🛠️ Technology Stack

### Backend Technologies
- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **CORS**: cors 2.8.5 (Cross-Origin Resource Sharing)
- **Data Storage**: JSON file-based mock data
- **Architecture**: RESTful API design

### Frontend Technologies
- **Framework**: React.js 19.1.1
- **UI Library**: Material-UI (MUI) 7.3.2
- **Routing**: React Router DOM 7.9.1
- **Mapping**: Leaflet 1.9.4 + React-Leaflet 5.0.0
- **Styling**: Emotion (React + Styled) 11.14.0/11.14.1
- **Build Tool**: Create React App with React Scripts 5.0.1
- **Testing**: React Testing Library + Jest

### Development Tools
- **Package Manager**: npm
- **Version Control**: Git
- **Code Quality**: ESLint (via CRA)

## 🔧 Core Functionality

### 1. Authentication System (`Login.js`)
- **Controller-based login** with predefined credentials
- **Two sample controllers**:
  - CTRL001 (admin123) - Section Controller A
  - CTRL002 (secure456) - Section Controller B
- **Session management** using localStorage
- **Railway-themed UI** with Indian Railways branding

### 2. Real-time Dashboard (`Dashboard.js`)
- **Live train monitoring** with 10-second refresh intervals
- **Key Performance Indicators (KPIs)**:
  - Average delay (minutes)
  - Punctuality percentage
  - Throughput (trains per hour)
  - Track utilization percentage
- **Train categorization**:
  - All trains with detailed status
  - Currently running trains
  - High priority trains
- **Interactive conflict management** with suggestion application

### 3. Interactive Train Map (`TrainMap.js`)
- **Real-time train positioning** using Leaflet maps
- **Station-based coordinate system**:
  - Santragachi: [22.5701, 88.3067]
  - Kharagpur: [22.3400, 87.3250]
  - Uluberia: [22.4746, 88.1056]
  - Howrah: [22.5958, 88.2636]
- **Visual train representation** with custom icons
- **Track visualization** with polylines between stations
- **Train information popups** with detailed status

### 4. Conflict Detection & Resolution
- **Automated conflict detection** for track overlaps and platform clashes
- **Severity classification** (High, Medium, Low)
- **Multiple resolution suggestions** per conflict
- **One-click suggestion application** with backend communication
- **Real-time alerts** for railway controllers

### 5. Navigation System (`Navbar.js`)
- **Margdarshak branding** with custom logo
- **What-If analysis** link (future feature)
- **Logout functionality** with session cleanup

## 📊 Data Model

### Train Data Structure
```json
{
  "train_no": "12301",
  "name": "Shatabdi Express",
  "type": "Express|Passenger|Freight",
  "priority": "High|Medium|Low",
  "status": "Running|Waiting",
  "current_station": "Station Name",
  "next_station": "Next Station",
  "delay_minutes": 0,
  "scheduled_arrival": "ISO DateTime",
  "scheduled_departure": "ISO DateTime",
  "actual_arrival": "ISO DateTime",
  "actual_departure": "ISO DateTime"
}
```

### Conflict Data Structure
```json
{
  "conflict_id": "C001",
  "section_id": "SEC-001",
  "trains_involved": ["12301", "12841"],
  "conflict_type": "Same track overlap|Platform clash",
  "detected_time": "ISO DateTime",
  "severity": "High|Medium|Low",
  "suggestions": ["Action 1", "Action 2"]
}
```

### KPI Data Structure
```json
{
  "average_delay_minutes": 9,
  "punctuality_percent": 82,
  "throughput_trains_per_hour": 18,
  "utilization_percent": 76
}
```

## 🌐 API Endpoints

### Backend REST API (`server.js`)
- **GET /api/health** - System health check
- **GET /api/trains** - Retrieve all train data
- **GET /api/sections** - Get railway section information
- **GET /api/conflicts** - Fetch active conflicts
- **GET /api/kpis** - Get key performance indicators
- **POST /api/conflicts/:conflictId/apply** - Apply conflict resolution

## 🚀 Getting Started

### Backend Setup
```bash
cd backend
npm install
node server.js
# Server runs on http://localhost:4000
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
# Application runs on http://localhost:3000
```

### Login Credentials
- **Controller 1**: CTRL001 / admin123
- **Controller 2**: CTRL002 / secure456

## 🎯 Key Features

### Real-time Monitoring
- **Live train tracking** with automatic updates
- **Status monitoring** (Running, Waiting, Delayed)
- **Performance metrics** with visual KPI cards

### Decision Support
- **Conflict prediction** and early warning system
- **Multiple resolution options** for each conflict
- **Impact analysis** with severity levels
- **One-click action implementation**

### User Experience
- **Responsive design** with mobile-friendly interface
- **Railway-themed aesthetics** with professional branding
- **Intuitive navigation** with role-based access
- **Real-time updates** without page refresh

### Scalability Considerations
- **Modular architecture** with separated concerns
- **API-first design** for easy integration
- **Component-based frontend** for maintainability
- **JSON data model** ready for database migration

## 🔮 Future Enhancements

### What-If Analysis (`WhatIf.js`)
- **Scenario simulation** for decision planning
- **Predictive analytics** for traffic optimization
- **Resource allocation** modeling

### Advanced Features
- **Machine learning** integration for predictive conflicts
- **Mobile application** for field controllers
- **Integration** with actual railway systems
- **Advanced reporting** and analytics

## 🏆 SIH 2025 Context
This system addresses the challenge of railway traffic management by providing:
- **Real-time decision support** for controllers
- **Automated conflict detection** reducing human error
- **Optimized resource utilization** improving efficiency
- **Scalable architecture** for nationwide deployment

The project demonstrates modern web development practices while solving critical railway infrastructure challenges, making it an ideal solution for the Smart India Hackathon 2025.