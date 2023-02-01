import ColorContainer from './layouts/ColorContainer'
import PaletteContainer from './layouts/PaletteContainer'
import { PaletteProvider } from './hooks/usePaletteContext'
import { HarmonyProvider } from './hooks/useHarmonyContext'
function App() {
   return (
      <div className="App">
         <PaletteProvider>
            <HarmonyProvider>
               <div className="flex">
                  <ColorContainer />
                  <PaletteContainer />
               </div>
            </HarmonyProvider>
         </PaletteProvider>
      </div>
   )
}
export default App
