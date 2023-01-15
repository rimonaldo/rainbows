import React, { useState, useEffect } from 'react'
import HarmonyMenu from './HarmonyMenu'
import ColorBox from './ColorBox'
import { Color } from '../services/color.class'
import { ColorType } from '../types/color'
import ColorVals from '../components/ColorVals'
import { HarmonyType } from '../types/HarmonyType'
import useHarmony from '../hooks/useHarmony2'

// function to set harmony's main color
// to create a color harmony out of it later ->
type ColorContainerPRops = {
   setMainColor: (scheme: string) => void
}

const ColorContainer: React.FC<ColorContainerPRops> = ({ setMainColor }) => {
   const [activeTab, setActiveTab] = useState<string>('monochromatic')
   const [harmonyTitle, setHarmonyTitle] = useState('monochromatic')
   // const [harmonyColors, setHarmonyColors] = useState<string[]>([])

   let [color, setColor] = useState<ColorType>(new Color('#ffffff'))

   const newHarmony: HarmonyType = { type: harmonyTitle, mainColor: color, colors: [] }
   // Expected 0 type arguments, but got 1
   // const [harmony, handleHarmonyChange] = useHarmony<HarmonyType>(newHarmony)

   const [harmony, handleHarmonyChange] = useHarmony()
   const handleColorChange = (hex: string) => {
      color = new Color(hex)
      setColor(color)
   }

   const handleTabClick = (tab: string) => {
      setActiveTab(tab)
      setHarmonyTitle(tab)
      handleHarmonyChange(newHarmony)
   }

   // harmony doesnt change
   useEffect(() => {
      console.log(harmony)
   }, [harmony])

   useEffect(() => {
      console.log(harmony)
   }, [color])

   const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = +event.target.value
   }
   return (
      <div className="color-container-main">
         <HarmonyMenu setTab={(scheme: string) => handleTabClick(scheme)} />
         <ColorBox
            handleColorChange={handleColorChange}
            color={color}
            harmony={{ title: harmonyTitle, colors: harmony.colors }}
         />
         <ColorVals color={color} onChange={ev => handleValueChange(ev)} />
      </div>
   )
}

export default ColorContainer
