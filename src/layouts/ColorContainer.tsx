import React, { useState, useEffect } from 'react'
import HarmonyMenu from '../components/HarmonyMenu'
import ColorBox from '../components/ColorBox'
import { Color } from '../services/color.class'
import { ColorType } from '../types/color'
import ColorVals from '../components/ColorVals'
import { HarmonyType, HarmonyTitle } from '../types/HarmonyType'
import useHarmony from '../hooks/useHarmony'
import HarmonyColors from '../components/HarmonyColors'
import { ColorSlider } from '@react-spectrum/color'
import { hsl } from '../types/colorTypes'
import Title from '../components/HarmonyTitle'

const ColorContainer: React.FC = () => {
   const [color, setColor] = useState<ColorType>(new Color('#ffffff')),
      [selectedHarmony, setSelectedHarmony] = useState<HarmonyTitle>(HarmonyTitle.Analogous),
      [harmony, setHarmony] = useHarmony(),
      [hex, setHex] = useState<string>(color.hex)

   const handleHexInput = (hex: string) => {
      setHex(hex)
   }

   const handleTabClick = (tab: HarmonyTitle) => {
      setSelectedHarmony(tab)
   }

   useEffect(() => {
      setColor(new Color(hex))
   }, [hex])

   useEffect(() => {
      let newHarmony: HarmonyType = { title: selectedHarmony, mainColor: color, colors: [] }
      setHarmony(newHarmony)
   }, [color, selectedHarmony])

   const isHexValid = (hex: string) => {
      const cleanHex = hex.substring(2, hex.length)
      const thisRegex = /#(([0-9a-fA-F]{2}){3,4}|([0-9a-fA-F]){3,4})/g

      if (thisRegex.test(hex) || hex === '') {
         console.log('valid')

         return hex
      } else if (/^[0-9a-f]+$/.test(cleanHex) || cleanHex === '') {
         return hex
      }
      console.log('unvalid')
      return false
   }

   return (
      <div className="color-container-main">
         <HarmonyMenu setTab={(title: HarmonyTitle) => handleTabClick(title)} />
         <section className="main-content">
            <div className="left-container">
               <ColorBox handleColorChange={handleHexInput} color={harmony.mainColor} harmony={harmony} hex={hex} />
               <ColorVals hex={color.hex} onChange={handleHexInput} />
               <Title harmony={harmony} />
               <HarmonyColors colors={harmony.colors} />
            </div>

            <div className="right-container">
               {harmony.colors.slice(0, harmony.colors.length).map(color => {
                  return (
                     <>
                        <Title harmony={harmony} />
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
