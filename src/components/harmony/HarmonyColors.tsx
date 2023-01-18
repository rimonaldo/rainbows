import React from 'react'
import { ColorType } from '../../types/ColorType'
type HarmonyProps = {
   colors: string[]
}

const Harmony: React.FC<HarmonyProps> = ({ colors }) => {
   return (
      <div className="harmony-colors">
         {colors?.map(color => (
            <div className="color" style={{ background: color }}>
               <div className="hex">
                  <span >{color}</span>
               </div>
            </div>
         ))}
      </div>
   )
}

export default Harmony
