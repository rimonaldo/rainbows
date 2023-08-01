import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/styles/global.scss'
import { SassProvider } from './hooks/useSassContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <SassProvider>
         <React.StrictMode>
            <App />
         </React.StrictMode>
      </SassProvider>
)
