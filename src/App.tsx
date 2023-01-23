import React, { useState, useEffect, useRef } from 'react'
import ColorContainer from './layouts/ColorContainer'
import PaletteContainer from './layouts/PaletteContainer'
import { PaletteProvider } from './hooks/usePaletteContext'
import ContactCard from './components/examples/ContactCard'
function App() {
   const [usedHex, setUsedHex] = useState<string>('ffffff')
   const [savedColors, setSavedColors] = useState<string[]>([])
   const handleHexChange = (hex: string) => {
      setUsedHex(hex)
   }
   const handleSaveToPalette = (hex: string) => {
      setSavedColors([...savedColors, hex])
   }
   return (
      <div className="App">
         <PaletteProvider>
            <ColorContainer />
            <PaletteContainer hex={usedHex} />
         </PaletteProvider>
      </div>
   )
}
export default App
