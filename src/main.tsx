import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/styles/global.scss'
import { ColorProvider } from './hooks/useColorContext'
import { PaletteProvider } from './hooks/usePaletteContext'
import { HarmonyProvider } from './hooks/useHarmonyContext'
import { SassProvider } from './hooks/useSassContext'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <ColorProvider>
      <HarmonyProvider>
         <PaletteProvider>
            <SassProvider>
               <React.StrictMode>
               <App />
               </React.StrictMode>
            </SassProvider>
         </PaletteProvider>
      </HarmonyProvider>
   </ColorProvider>
)
