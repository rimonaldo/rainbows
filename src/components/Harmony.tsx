import React from 'react'
import useHarmony from '../hooks/useHarmony'
import { ColorType } from '../types/color'
type HarmonyProps = {
   colors: string[]
}

const Harmony: React.FC<HarmonyProps> = ({ colors }) => {

   return (
      <div className="harmony">
         {colors?.map(color => (
            <div  className="color" style={{ backgroundColor: color }} />
         ))}
      </div>
   )
}

export default Harmony
