import React, { useEffect } from 'react'
import HarmonyMenu from '../components/harmony/HarmonyMenu'
import ColorPicker from '../components/color/ColorPicker'
import ColorVals from '../components/color/ColorVals'
import { HarmonyTitle } from '../types/HarmonyType'
import HarmonyColors from '../components/harmony/HarmonyColors'
import Title from '../components/harmony/HarmonyTitle'
import ColorName from '../components/color/ColorName'
import { useColorContext } from '../hooks/useColorContext'
import ColorSliders from '../components/color/ColorSliders'
import { useHarmonyContext } from '../hooks/useHarmonyContext'
import { randomPrimaryHsl } from '../services/paletteService'
const ColorContainer: React.FC = () => {
   const { color, setColor, setColorFromHsl } = useColorContext()
   const { setHarmony, scheme, setScheme } = useHarmonyContext()

   useEffect(() => {
      setColor(getRandomHex())
   }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
      setColorFromHsl({ ...color.hsl, [formatKey]: formatVal / 100 })
   }

   useEffect(() => {
      setHarmony(color)
   }, [color])

   let guid = () => {
      let s4 = () => {
         return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
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
