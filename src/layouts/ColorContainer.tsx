import React, { useState, useEffect } from 'react'
import HarmonyMenu from '../components/HarmonyMenu'
import ColorBox from '../components/ColorBox'
import { Color } from '../services/color.class'
import { ColorType } from '../types/color'
import ColorVals from '../components/ColorVals'
import { HarmonyType, HarmonyTitle } from '../types/HarmonyType'
import useHarmony from '../hooks/useHarmony'
import HarmonyColors from '../components/HarmonyColors'
import { hsl } from '../types/colorTypes'
import Title from '../components/HarmonyTitle'
import ColorName from '../components/ColorName'
import { hslToRgb, rgbToHex } from '../services/colorService'
const ColorContainer: React.FC = () => {
   const [color, setColor] = useState<ColorType>(new Color('#ffffff')),
      [hex, setHex] = useState<string>(color.hex),
      [selectedHarmony, setSelectedHarmony] = useState<HarmonyTitle>(HarmonyTitle.Analogous),
      [harmony, setHarmony] = useHarmony(),
      [satVal, setSatVal] = useState<number>(harmony.mainColor.hsl.s * 100),
      [lumVal, setLumVal] = useState<number>(harmony.mainColor.hsl.l * 100)

   const handleTabClick = (tab: HarmonyTitle) => {
      setSelectedHarmony(tab)
   }

   const handleHexInput = (hex: string) => {
      setHex(hex)
      setSatVal(color.hsl.s * 100)
      setLumVal(color.hsl.l * 100)
   }

   useEffect(() => {
      setColor(new Color(hex))
   }, [hex])

   useEffect(() => {
      let newHarmony: HarmonyType = { title: selectedHarmony, mainColor: color, colors: [] }
      setHarmony(newHarmony)
   }, [color, selectedHarmony])

   const handleSatChange = (value: string) => {
      setSatVal(+value)
      const hsl = { ...harmony.mainColor.hsl, s: +value / 100 }
      const rgb = hslToRgb(hsl)
      const newHex = rgbToHex(rgb)
      setHex(newHex)
   }

   const handleLumChange = (value: string) => {
      setLumVal(+value)
      const hsl = { ...harmony.mainColor.hsl, l: +value / 100 }
      const rgb = hslToRgb(hsl)
      const newHex = rgbToHex(rgb)
      setHex(newHex)
   }

   const handleHslChange = (ev: any) => {
      const name = ev.target.name
      const value = ev.target.value
      const formatVal = { name, value }
   }

   return (
      <div className="color-container-main">
         <HarmonyMenu setTab={(title: HarmonyTitle) => handleTabClick(title)} />
         <Title harmony={harmony} />
         <section className="main-content">
            <div className="left-container">
               <ColorBox handleColorChange={handleHexInput} color={harmony.mainColor} harmony={harmony} hex={hex} />
               <ColorName hex={color.hex} />
               <ColorVals hex={color.hex} onChange={handleHexInput} />
               <HarmonyColors colors={harmony.colors} />
               <form action="" onChange={ev => handleHslChange(ev)}>
                  <input
                     type="range"
                     name="saturation"
                     value={+satVal}
                     onChange={ev => handleSatChange(ev.target.value)}
                  />
                  <input
                     type="text"
                     name="saturation"
                     value={satVal.toFixed(0)}
                     onChange={ev => handleSatChange(ev.target.value)}
                  />
                  <input
                     type="range"
                     name="luminance"
                     value={+lumVal}
                     onChange={ev => handleLumChange(ev.target.value)}
                  />
                  <input
                     type="text"
                     name="luminance"
                     value={lumVal.toFixed(0)}
                     onChange={ev => handleLumChange(ev.target.value)}
                  />
               </form>
            </div>

            <div className="right-container">
               {harmony.colors.slice(1, harmony.colors.length).map(color => {
                  return (
                     <>
                        <ColorName hex={color} />
                        <ColorVals hex={color} onChange={handleHexInput} />
                     </>
                  )
               })}
            </div>
         </section>
      </div>
   )
}

export default ColorContainer
