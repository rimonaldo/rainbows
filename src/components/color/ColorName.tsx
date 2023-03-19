import React, { useState, useEffect } from 'react'
import { HarmonyType } from '../../services/harmony/type'
import { GetColorName } from 'hex-color-to-color-name'

type NameProps = {
   hex: string
}
const ColorName: React.FC<NameProps> = ({ hex }) => {
   const [colorName, setColorName] = useState<string>(GetColorName(hex))

   useEffect(() => {
      setColorName(GetColorName(hex))
   }, [hex])

   return (
      <h2 className="title" style={{ color: hex }}>
         {colorName}
      </h2>
   )
}

export default ColorName
