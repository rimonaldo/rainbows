import React, { useState, useEffect } from 'react'
import HarmonyMenu from '../components/HarmonyMenu'
import ColorPicker from '../components/ColorPicker'
import { Color } from '../services/color.class'
import { ColorType } from '../types/color'
import ColorVals from '../components/ColorVals'
import { HarmonyType, HarmonyTitle } from '../types/HarmonyType'
import useHarmony from '../hooks/useHarmony'
import HarmonyColors from '../components/HarmonyColors'
import Title from '../components/HarmonyTitle'
import ColorName from '../components/ColorName'
import { hslToRgb, rgbToHex } from '../services/colorService'
import { hsl } from '../types/colorTypes'
// import useColor from '../hooks/useColor'
const ColorContainer: React.FC = () => {
   const [color, setColor] = useState<ColorType>(new Color('#ffffff')),
      [hex, setHex] = useState<string>(color.hex),
      [selectedHarmony, setSelectedHarmony] = useState<HarmonyTitle>(HarmonyTitle.Analogous),
      [harmony, setHarmony] = useHarmony(),
      [hslVal, setHslVal] = useState<hsl>(color.hsl)
   // [col,setCol] = useColor()
   let newHarmony: HarmonyType = { title: selectedHarmony, mainColor: color, colors: [] }

   const handleTabClick = (tab: HarmonyTitle) => {
      setSelectedHarmony(tab)
      // setCol(hex)
      setHarmony(newHarmony)
   }

   const handleHexChange = (hex: string) => {
      setHex(hex)
      setHarmony(newHarmony)
      setHslVal(color.hsl)
   }

   const handleHslChange = (ev: any) => {
      const name = ev.target.name
      const value = ev.target.value
      setHslVal({ ...color.hsl, [name]: +value / 100 })
      const newHex = rgbToHex(hslToRgb(hslVal))
      setHex(newHex)
   }

   useEffect(() => {
      setColor(new Color(hex))
   }, [hex])

   return (
      <div className="color-container-main">
         <HarmonyMenu setTab={(title: HarmonyTitle) => handleTabClick(title)} />
         <Title harmony={harmony} />
         <section className="main-content">
            <div className="left-container">
               <ColorPicker handleColorChange={handleHexChange} color={color} harmony={harmony} hex={hex} />
               <ColorName hex={color.hex} />
               <ColorVals hex={color.hex} onChange={handleHexChange} />
               <HarmonyColors colors={harmony.colors} />
               <form action="" onChange={ev => handleHslChange(ev)}>
                  <input type="range" name="s" value={(hslVal.s * 100).toFixed(0)} />
                  <input type="text" name="s" value={(hslVal.s * 100).toFixed(0)} />
                  <input type="range" name="l" value={(hslVal.l * 100).toFixed(0)} />
                  <input type="text" name="l" value={(hslVal.l * 100).toFixed(0)} />
               </form>
            </div>

            <div className="right-container">
               {harmony.colors.slice(1, harmony.colors.length).map(color => {
                  return (
                     <>
                        <ColorName hex={color} />
                        <ColorVals hex={color} onChange={handleHexChange} />
                     </>
                  )
               })}
            </div>
         </section>
      </div>
   )
}

export default ColorContainer
