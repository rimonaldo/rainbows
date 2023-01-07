import React, { useState, useEffect } from 'react'
import './styles/App.css'
import { Wheel } from '@uiw/react-color'
import Tabs from './components/Tabs'
import Harmony from './components/Harmony'
import { Alpha, Hue, ShadeSlider, Saturation, hsvaToHslaString } from '@uiw/react-color'
import { Slider, Sketch, Material, Colorful, Compact, Circle, Block, Github, Chrome } from '@uiw/react-color'
import { Color } from './services/color.class'
import { ColorType } from './types/color'

// type Color = {
//    hex: string
// }

function App() {
   const [hex, setHex] = useState('#FFFFFF')
   const [harmony, setHarmony] = useState('complementary')
   const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 })

   const [color, setColor] = useState<ColorType>(new Color())

   let myColor: ColorType = new Color()

   const handleColorChange = (hex: string) => {
      const newColor = new Color(hex)
      setColor(newColor)
      // console.log(color);
   }

   const handleHexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const hex = event.target.value
      const newColor = new Color(hex)
      setColor(newColor)
   }

   useEffect(() => {
      // console.log(`R: ${color.rgb.r}, G: ${color.rgb.g}, B: ${color.rgb.b}`)
      // console.log(`H: ${color.hsl.h}, S: ${color.hsl.s}, L: ${color.hsl.l}`)
      console.log(`H: ${color.hsv.h}, S: ${color.hsv.s}, V: ${color.hsv.v}`)
      const { rgb, hsl, hsv } = myColor
      const { h, s, v } = hsv
   }, [color])

   const wheelStyle = { margin: '2rem auto' }
   const titleStyle = { color: hex }

   return (
      <div className="App" style={{ background: color?.hex }}>
         {/* <Sketch style={wheelStyle} color={hex}  /> */}
         <input type="color" onChange={ev => handleColorChange(ev.target.value)} />
         <h1 style={titleStyle}>{harmony}</h1>
         <Tabs color="#FFFFFF" setTab={(scheme: string) => setHarmony(scheme)} />
         <Harmony type={harmony} color={color} />
         <div className="color-vals">
            <div className="hex">{color.hex}</div>

            <br />

            <div className="val rgb">
               <div>r {color.rgb.r}</div>
               <div>g {color.rgb.g.toFixed(0)}</div>
               <div>b {color.rgb.b.toFixed(0)}</div>
            </div>

            <br />

            <div className="val hsl">
               <div>h {color.hsv.h}°</div>
               <div>s {(color.hsv.s * 100).toFixed(0)}%</div>
               <div>v {(color.hsv.v * 100).toFixed(0)}%</div>
            </div>

            <br />

            <div className="val hsv">
               <div>h {color.hsv.h}°</div>
               <div>s {(color.hsv.s * 100).toFixed(0)}%</div>
               <div>v {(color.hsv.v * 100).toFixed(0)}%</div>
            </div>
         </div>
      </div>
   )
}

export default App
