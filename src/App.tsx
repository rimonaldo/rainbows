import React, { useState, useEffect, useRef } from 'react'
import Tabs from './components/Tabs'
import Harmony from './components/Harmony'
import { Color } from './services/color.class'
import { ColorType } from './types/color'
import ColorVals from './components/ColorVals'

import ColorInput from './components/ColorInput'

function App() {
   const [hex, setHex] = useState('#FFFFFF')
   const [harmony, setHarmony] = useState('complementary')

   const [color, setColor] = useState<ColorType>(new Color())

   let myColor: ColorType = new Color('#fffff')

   const handleColorChange = (hex: string) => {
      const newColor = new Color(hex)
      setColor(newColor)
   }

   useEffect(() => {
      // console.log(`R: ${color.rgb.r}, G: ${color.rgb.g}, B: ${color.rgb.b}`)
      // console.log(`H: ${color.hsl.h}, S: ${color.hsl.s}, L: ${color.hsl.l}`)
      // console.log(`H: ${color.hsv.h}, S: ${color.hsv.s}, V: ${color.hsv.v}`)
   }, [color])

   const titleStyle = { color: hex }

   const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event)
   }

   return (
      <div className="App" style={{ background: color?.hex }}>
         <div className="color-box">
            <h1 style={titleStyle}>{harmony}</h1>
            <ColorInput value={color.hex} onChange={ev => handleColorChange(ev.target.value)} />
            <Tabs color="#FFFFFF" setTab={(scheme: string) => setHarmony(scheme)} />
            <Harmony type={harmony} color={color.hex} />
            <ColorVals color={color} onChange={ev => handleValueChange(ev)} />
         </div>
      </div>
   )
}

export default App
