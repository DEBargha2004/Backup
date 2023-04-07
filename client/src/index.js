import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { StyledEngineProvider } from '@mui/material'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <StyledEngineProvider injectFirst>
            <App />
        </StyledEngineProvider>
    </BrowserRouter>
)
