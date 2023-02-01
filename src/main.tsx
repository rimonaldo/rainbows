import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/styles/global.scss'
import { ColorProvider } from './hooks/useColorContext'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <ColorProvider>
      <React.StrictMode>
         <App />
      </React.StrictMode>
   </ColorProvider>
)
