import React from 'react'
import useHarmony from '../hooks/useHarmony'
import { ColorType } from '../types/color'
type HarmonyProps = {
   type: string
   color: string
}

const Harmony: React.FC<HarmonyProps> = ({ type, color }) => {
   const harmony = useHarmony(color, type)

   return (
      <div className="harmony">
         {harmony.map(color => (
            <div className="color" style={{ backgroundColor: color }} />
         ))}
      </div>
   )
}

export default Harmony
