import React, { useState, useEffect } from 'react'
import { HarmonyType } from '../../types/HarmonyType'
import { GetColorName } from 'hex-color-to-color-name'

type NameProps = {
   hex: string
}
const ColorName: React.FC<NameProps> = ({ hex }) => {
   const [colorName, setColorName] = useState<string>('ffffff')

   useEffect(() => {
      let newColorName = GetColorName(hex)
      setColorName(newColorName)
   }, [hex])
   
   return (
      <h2 className="title" style={{ color: hex }}>
         {colorName}
      </h2>
   )
}

export default ColorName
