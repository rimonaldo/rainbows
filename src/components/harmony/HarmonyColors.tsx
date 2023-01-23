import React from 'react'
import { ColorType } from '../../types/ColorType'
import { usePaletteContext } from '../../hooks/usePaletteContext'
import { Color } from '../../services/color.class'
import { hex } from '../../services/color.class'
type HarmonyProps = {
   colors: string[]
}

const Harmony: React.FC<HarmonyProps> = ({ colors }) => {
   const { palette, addColor } = usePaletteContext()

   let guid = () => {
      let s4 = () => {
         return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
   }

   return (
      <div className="harmony-colors">
         {colors?.map(color => (
            <div key={guid()} className="color" style={{ background: color }}>
               <div className="hex">
                  <span onClick={() => addColor(new Color(color))}>{color}</span>
               </div>
            </div>
         ))}
      </div>
   )
}

export default Harmony
