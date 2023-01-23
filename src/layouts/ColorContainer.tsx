import React, { useEffect } from 'react'
import HarmonyMenu from '../components/harmony/HarmonyMenu'
import ColorPicker from '../components/color/ColorPicker'
import ColorVals from '../components/color/ColorVals'
import { HarmonyType, HarmonyTitle } from '../types/HarmonyType'
import useHarmony from '../hooks/useHarmony'
import HarmonyColors from '../components/harmony/HarmonyColors'
import Title from '../components/harmony/HarmonyTitle'
import ColorName from '../components/color/ColorName'
import { useColorContext } from '../hooks/useColorContext'
import ColorSliders from '../components/color/ColorSliders'

const ColorContainer: React.FC = () => {
   const [harmony, setHarmony] = useHarmony()
   const { color, setColor, setFromHsl } = useColorContext()
   let newHarmony: HarmonyType = { title: harmony.title || HarmonyTitle.Analogous, mainColor: color, colors: [] }

   const handleTabClick = (tab: HarmonyTitle) => {
      setHarmony({ ...newHarmony, title: tab })
   }

   const handleHexChange = (newHex: string) => {
      setColor(newHex)
   }

   const handleHslChange = (ev: any) => {
      const formatKey = ev.target.name
      const formatVal = ev.target.value
      setFromHsl({ ...color.hsl, [formatKey]: formatVal / 100 })
   }

   useEffect(() => {
      setHarmony({ ...newHarmony, mainColor: color })
   }, [color])

   let guid = () => {
      let s4 = () => {
         return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
   }

   return (
      <div className="color-container-main">
         <HarmonyMenu setTab={(title: HarmonyTitle) => handleTabClick(title)} />
         <Title harmony={harmony} />
         <section className="main-content">
            <div className="left-container">
               <ColorPicker handleColorChange={handleHexChange} hex={color.hex} />
               <ColorSliders onChange={handleHslChange} />
               <ColorName hex={color.hex} />
               <ColorVals hex={color.hex} onChange={handleHexChange} />
               <HarmonyColors colors={harmony.colors} />
            </div>

            <div className="right-container">
               {harmony.colors.slice(1, harmony.colors.length).map((harHex, idx) => {
                  return (
                     <div key={guid()}>
                        <ColorName hex={harHex} />
                        <ColorVals hex={harmony.colors[idx + 1]} onChange={handleHexChange} />
                     </div>
                  )
               })}
            </div>
         </section>
      </div>
   )
}

export default ColorContainer
