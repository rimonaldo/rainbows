import React, { useState, useEffect, useRef } from 'react'
import ColorContainer from './layouts/ColorContainer'

function App() {
   const [harmonyType, setHarmonyType] = useState('monochromatic')
   const [harmonyColors, setHarmonyColors] = useState<string[]>([])

   return (
      <div className="App">
         <h1 style={{ color: harmonyType === 'monochromatic' ? harmonyColors[0] : harmonyColors[1] }}>Rainbows</h1>
         <ColorContainer />
      </div>
   )
}
export default App
