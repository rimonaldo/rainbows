import React, { useState, useEffect, useRef } from 'react'
import Tabs from './components/Tabs'
import Harmony from './components/Harmony'
import { Color } from './services/color.class'
import { ColorType } from './types/color'
import ColorVals from './components/ColorVals'
import { HexColorPicker } from 'react-colorful'
import ColorInput from './components/ColorInput'
import { hexToRgb, rgbToHsv, rgbToHsl, hslToRgb, rgbToHex } from './services/colorService'
function App() {
   const [hex, setHex] = useState('#FFFFFF')
   const [harmony, setHarmony] = useState('complementary')

   const [color, setColor] = useState<ColorType>(new Color())

   const handleColorChange = (hex: string) => {
      const newColor = new Color(hex)
      setColor(newColor)
 
   }

   const titleStyle = { color: hex }

   const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = +event.target.value
      const hueValue = inputValue * 3.6 // Map input range (0-100) to hue range (0-360)
      // color.hsl.h = hueValue
   }

   const [hue, setHue] = useState(color.hsv.h)

   useEffect(() => {
      color.hsv.h = hue
      // let newHex =
      // setColor()
   }, [hue])

   // useEffect(() => {}, [color])

   // const [color, setColor] = useState("#b32aa9");
   return (
      <div className="App" style={{ background: color?.hex }}>
         <div className="color-box">
            <h1 style={titleStyle}>{harmony}</h1>
            <HexColorPicker color={color.hex} onChange={handleColorChange} />
            <Tabs color="#FFFFFF" setTab={(scheme: string) => setHarmony(scheme)} />
            <Harmony type={harmony} color={color.hex} />
            <ColorVals color={color} onChange={ev => handleValueChange(ev)} />
            <input type="range" name="" id="" onChange={ev => handleValueChange(ev)} value={color.hsv.h / 3.6} />
         </div>
      </div>
   )
}

export default App
