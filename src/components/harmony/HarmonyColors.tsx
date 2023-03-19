import React from 'react'
import { usePaletteContext } from '../../hooks/usePaletteContext'
import { Color } from '../../services/color/color'
import { SchemeType } from '../../services/harmony/type'
type HarmonyProps = {
   scheme: SchemeType
}

const Harmony: React.FC<HarmonyProps> = ({ scheme }) => {
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
         {scheme.colors?.map(color => (
            <div key={guid()} className="color" style={{ background: color.hex }}>
               <div className="hex">
                  <span onClick={() => addColor(color)}>{color.hex}</span>
               </div>
            </div>
         ))}
      </div>
   )
}

export default Harmony
