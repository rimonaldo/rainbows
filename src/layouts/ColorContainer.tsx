import React, { useState, useEffect } from 'react'
import HarmonyMenu from '../components/HarmonyMenu'
import ColorBox from '../components/ColorBox'
import { Color } from '../services/color.class'
import { ColorType } from '../types/color'
import ColorVals from '../components/ColorVals'
import { HarmonyType, HarmonyTitle } from '../types/HarmonyType'
import useHarmony from '../hooks/useHarmony'
import HarmonyColors from '../components/HarmonyColors'
const ColorContainer: React.FC = () => {
   const [color, setColor] = useState<ColorType>(new Color('#ffffff')),
      [selectedHarmony, setSelectedHarmony] = useState<HarmonyTitle>(HarmonyTitle.Monochromatic),
      [harmony, setHarmony] = useHarmony(),
      [hex, setHex] = useState<string>(color.hex)
   let newHarmony: HarmonyType = { title: selectedHarmony, mainColor: color, colors: [] }
   let newColor = new Color(hex)
   const handleColorChange = (hex: string) => {
      // let newColor = new Color(hex)
      // setColor(newColor)
      setHex(hex)
   }

   const handleTabClick = (tab: HarmonyTitle) => {
      newHarmony.title = tab
      // setHarmony(newHarmony)
      setSelectedHarmony(tab)
   }

   useEffect(() => {
      newColor.hex = hex
      setColor(newColor)
      setHarmony(newHarmony)
   }, [hex, selectedHarmony])

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

   const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputHex = event.currentTarget.value
      const cleanInputHex = inputHex.substring(2, inputHex.length)
      let newHex = isHexValid(inputHex)
      // #fff,#fffaff,#afd,#ffff
      return newHex ? setHex(inputHex) : false
      // if (/^[0-9a-f]+$/.test(inputHex) || inputHex === '') {
      //    return setHex(inputHex)
      // } else if (/^[0-9a-f]+$/.test(cleanInputHex) || cleanInputHex === '') {
      //    return setHex(inputHex)
      // }
   }

   return (
      <div className="color-container-main">
         <HarmonyMenu setTab={(title: HarmonyTitle) => handleTabClick(title)} />
         <section className="main-content">
            <div className="left-container">
               <ColorBox handleColorChange={handleColorChange} color={harmony.mainColor} harmony={harmony} hex={hex} />
               <h2
                  className="title"
                  style={{
                     color:
                        harmony?.title === 'monochromatic' ? harmony.colors[0] : harmony.colors[2] || harmony.colors[1],
                  }}
               >
                  {harmony.title}
               </h2>
               <ColorVals color={color} onChange={ev => handleValueChange(ev)} />
               <HarmonyColors colors={harmony.colors} />
            </div>

            <div className="right-container">
               <h2
                  className="title"
                  style={{
                     color:
                        harmony?.title === 'monochromatic' ? harmony.colors[0] : harmony.colors[2] || harmony.colors[1],
                  }}
               >
                  {harmony.title}
               </h2>
               <ColorVals color={color} onChange={ev => handleValueChange(ev)} />
            </div>
         </section>
      </div>
   )
}

export default ColorContainer
