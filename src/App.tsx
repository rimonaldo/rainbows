import React, { useState } from 'react'
import './styles/App.css'
import { Wheel } from '@uiw/react-color'
import Tabs from './components/Tabs'
import Harmony from './components/Harmony'
import { Alpha, Hue, ShadeSlider, Saturation, hsvaToHslaString } from '@uiw/react-color'
import { Slider, Sketch, Material, Colorful, Compact, Circle, Block, Github, Chrome } from '@uiw/react-color'
type Color = {
   hex: string
}

function App() {
   const [hex, setHex] = useState('#FFFFFF')
   const [harmony, setHarmony] = useState('complementary')
   const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 })
   const handleColorChange = (color: Color) => {
      setHex(color.hex)
      // console.log(harmony)
   }

   const wheelStyle = { margin: '2rem auto' }
   const titleStyle = { color: hex }

   return (
      <div className="App">
         <ShadeSlider
            hsva={hsva}
            onChange={newShade => {
               setHsva({ ...hsva, ...newShade })
            }}
         />
         <Sketch style={wheelStyle} color={hex} onChange={handleColorChange} />
         <h1 style={titleStyle}>{harmony}</h1>
         <Tabs color="#FFFFFF" setTab={(scheme: string) => setHarmony(scheme)} />
         <Harmony type={harmony} color={hex} />
      </div>
   )
}

export default App
