# Vrtta Green Solutions - Frontend

A modern React frontend for the Vrtta Green Solutions sustainability scoring platform.

## Features

- **Product Scoring**: Comprehensive form to calculate sustainability scores
- **Product History**: View and filter all scored products
- **Analytics Dashboard**: Visual insights with charts and statistics
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations

## Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Backend API running on http://localhost:5001

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── Navigation.js          # Main navigation component
│   └── Navigation.css
├── pages/
│   ├── Home.js               # Landing page
│   ├── ScoreProduct.js       # Product scoring form
│   ├── ProductHistory.js     # Product history view
│   └── Dashboard.js          # Analytics dashboard
├── services/
│   └── api.js                # API service functions
├── App.js                    # Main app component
├── App.css                   # Global styles
├── index.js                  # App entry point
└── index.css                 # Base styles
```

## API Integration

The frontend communicates with the Flask backend through the following endpoints:

- `POST /score` - Calculate product sustainability score
- `GET /history` - Retrieve all scored products
- `GET /score-summary` - Get aggregated statistics

**Note**: The backend runs on port 5001 (not 5000) to avoid conflicts with macOS AirPlay service.

## Technologies Used

- **React 18** - UI library
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **CSS3** - Styling with modern features

## Features Overview

### Product Scoring
- Comprehensive form with all required fields
- Material selection with multi-select capability
- Custom scoring weights
- Real-time validation
- Immediate score calculation and display

### Product History
- Sortable and filterable product list
- Rating-based filtering
- Detailed product cards with suggestions
- Responsive grid layout

### Analytics Dashboard
- Key metrics overview
- Rating distribution pie chart
- Top issues bar chart
- Performance insights
- Responsive charts

## Customization

### Styling
The app uses CSS custom properties and modern CSS features. Main color scheme:
- Primary: #10b981 (Green)
- Secondary: #6b7280 (Gray)
- Success: #10b981 (Green)
- Warning: #f59e0b (Amber)
- Error: #ef4444 (Red)

### API Configuration
Update the API base URL in `src/services/api.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Common Issues

**CORS Errors**
- Ensure the Flask backend is running on port 5001
- Check that Flask-CORS is installed: `pip install Flask-CORS==4.0.0`
- Verify the backend is sending proper CORS headers

**Port Conflicts**
- If port 5000 is unavailable (common on macOS), the backend automatically uses port 5001
- Make sure both frontend (port 3000) and backend (port 5001) are running

**API Connection Issues**
- Verify the backend is running: `curl http://localhost:5001/`
- Check browser console for detailed error messages
- Ensure all required fields are filled in the scoring form

**React Router Warnings**
- The deprecation warnings are harmless and don't affect functionality
- They can be ignored or suppressed by updating React Router in the future

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Vrtta Green Solutions platform.