import React, { useState, useEffect, useRef } from 'react'
import Tabs from './components/Tabs'
import Harmony from './components/Harmony'
import { Color } from './services/color.class'
import { ColorType } from './types/color'
import ColorVals from './components/ColorVals'
import { HexColorPicker } from 'react-colorful'
import useHarmony from './hooks/useHarmony'
function App() {
   let [color, setColor] = useState<ColorType>(new Color('#ffffff'))
   const [harmonyType, setHarmonyType] = useState('monochromatic')
   const [harmonyColors, setHarmonyColors] = useState<string[]>([])
   const harmony = useHarmony(color, harmonyType)

   const handleColorChange = (hex: string) => {
      color = new Color(hex)
      setColor(color)
   }

   useEffect(() => {
      setHarmonyColors(harmony)
   }, [harmony])

   const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = +event.target.value
   }
   return (
      <div className="App" style={{ background: color?.hex }}>
         <div className="color-box">
            <h1>{harmonyType}</h1>
            <HexColorPicker color={color.hex} onChange={handleColorChange} />
            <Tabs color="#FFFFFF" setTab={(scheme: string) => setHarmonyType(scheme)} />
            <Harmony colors={harmonyColors} />
            <ColorVals color={color} onChange={ev => handleValueChange(ev)} />
            <input type="range" name="" id="" onChange={ev => handleValueChange(ev)} value={color.hsv.h / 3.6} />
         </div>
      </div>
   )
}

export default App
