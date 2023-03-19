import React, { useEffect } from 'react'
import HarmonyMenu from '../harmony/HarmonyMenu'
import ColorPicker from './ColorPicker'
import ColorVals from './ColorVals'
import { HarmonyTitle } from '../../services/harmony/type'
import HarmonyColors from '../harmony/HarmonyColors'
import Title from '../harmony/HarmonyTitle'
import ColorName from './ColorName'
import { useColorContext } from '../../hooks/useColorContext'
import ColorSliders from './ColorSliders'
import { useHarmonyContext } from '../../hooks/useHarmonyContext'
import { randomPrimaryHsl } from '../../services/palette/palette'
import { hslToRgb, rgbToHex } from '../../services/color/utils'
import { guid } from '../../services/utils'
const ColorContainer: React.FC = () => {
   const { color, setColor, setColorFromHsl } = useColorContext()
   const { setHarmony, scheme, setScheme } = useHarmonyContext()

   useEffect(() => {
      setColor(getRandomHex())
   }, [])

   useEffect(() => {
      setHarmony(color)
   }, [color])

   const handleTabClick = (tab: HarmonyTitle) => {
      setHarmony(color)
      setScheme({ ...scheme, title: tab })
   }

   const handleHexChange = (newHex: string) => {
      setColor(newHex)
   }

   const handleHslChange = (ev: any) => {
      const formatKey = ev.target.name
      const formatVal = ev.target.value
      if (formatKey === 'h') {
         setColorFromHsl({ ...color.hsl, [formatKey]: +formatVal })
      } else {
         setColorFromHsl({ ...color.hsl, [formatKey]: formatVal / 100 })
      }
   }

   function getRandomHex() {
      var letters = '0123456789ABCDEF'
      var color = '#'
      for (var i = 0; i < 6; i++) {
         color += letters[Math.floor(Math.random() * 16)]
      }
      return color
   }

   return (
      <div className="color-container-main">
         <HarmonyMenu setTab={(title: HarmonyTitle) => handleTabClick(title)} />
         <Title scheme={scheme} />
         <section className="main-content">
            <div className="left-container">
               <ColorPicker handleColorChange={handleHexChange} hex={color.hex} />
               <ColorSliders color={color} onChange={handleHslChange} />
               <ColorName hex={color.hex} />
               <ColorVals hex={color.hex} onChange={handleHexChange} />
               <HarmonyColors scheme={scheme} />
            </div>

            <div className="right-container">
               {scheme.colors.slice(1, scheme.colors.length).map((color, idx) => {
                  return (
                     <div key={guid()}>
                        <ColorName hex={color.hex} />
                        <ColorVals hex={color.hex} onChange={handleHexChange} />
                     </div>
                  )
               })}
            </div>
         </section>
      </div>
   )
}

export default ColorContainer
