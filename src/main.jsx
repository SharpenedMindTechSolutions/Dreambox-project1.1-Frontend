import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './Components/context/AuthContext.jsx'
import { RoadmapProvider } from './Components/context/RoadmapContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RoadmapProvider>
        <App />
      </RoadmapProvider>
    </AuthProvider>
  </React.StrictMode>,
)
