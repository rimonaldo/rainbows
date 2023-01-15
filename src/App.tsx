import React, { useState, useEffect, useRef } from 'react'
import Tabs from './components/Tabs'
import Harmony from './components/Harmony'
import { Color } from './services/color.class'
import { ColorType } from './types/color'
import ColorVals from './components/ColorVals'
import { HexColorPicker } from 'react-colorful'
import useHarmony from './hooks/useHarmony'

import HarmonyMenu from './layouts/HarmonyMenu'
// import ColorContainer from './layouts/ColorBox'
import Palette from './layouts/palette'

import ColorContainer from './layouts/ColorContainer'
import { HarmonyType } from './types/HarmonyType'
function App() {
   let [color, setColor] = useState<ColorType>(new Color('#ffffff'))
   const [harmonyType, setHarmonyType] = useState('monochromatic')
   const [harmonyColors, setHarmonyColors] = useState<string[]>([])
   // const harmony = useHarmony(color, harmonyType)
   const [usedHarmony, setUsedHarmony] = useState<object | null>(null)
   const handleColorChange = (hex: string) => {
      color = new Color(hex)
      setColor(color)
   }

   const handleColorChange2 = (hex: string) => {
      color = new Color(hex)
      setColor(color)
   }

   useEffect(() => {
      // setHarmonyColors(harmony)
      // console.log(color);
      setUsedHarmony({ title: harmonyType, colors: harmonyColors || [] })
   }, [harmonyType])

   const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = +event.target.value
   }

   return (
      <div className="App">
         <h1 style={{ color: harmonyType === 'monochromatic' ? harmonyColors[0] : harmonyColors[1] }}>Rainbows</h1>
         <ColorContainer setMainColor={handleColorChange2} />
      </div>
   )
}
export default App

{
   /* <div className="color-box" style={{ background: color?.hex }}> */
}

{
   /* <Tabs color="#FFFFFF" setTab={(scheme: string) => setHarmonyType(scheme)} /> */
}

// <div className="color-box">
// <div className="color-container">
//    <HexColorPicker color={color.hex} onChange={handleColorChange} />
// </div>
// <h2
//    style={{
//       color: harmonyType === 'monochromatic' ? harmonyColors[0] : harmonyColors[2] || harmonyColors[1],
//    }}
// >
//    {harmonyType}
// </h2>
// </div>

//    return (
//       <div className="App main-layout">
//          <header className="header">header</header>
//          <div className="rainbow-container">

//          </div>
//          <HarmonyMenu setTab={(scheme: string) => setHarmonyType(scheme)} />
//          <ColorContainer harmony={usedHarmony} color={color} handleColorChange={handleColorChange} />
//          <div className="harmony-container">
//             <h2
//                className="title "
//                style={{
//                   color: harmonyType === 'monochromatic' ? harmonyColors[0] : harmonyColors[2] || harmonyColors[1],
//                }}
//             >
//                {harmonyType}
//             </h2>
//             <div className="base-colors"></div>
//          </div>
//          <Palette palette={harmonyColors} />
//       </div>
//    )
