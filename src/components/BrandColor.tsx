import React from 'react'
import { PaletteColorRole, PaletteColorType } from '../services/palette/PaletteType'
type Props = {
   paletteColor: PaletteColorType
   onColorChange: (ev: React.ChangeEvent<HTMLInputElement>,role:string) => void
}

const BrandColor = ({ paletteColor, onColorChange }: Props) => {
   const textColor = ({ r, g, b }: { r: number; g: number; b: number }) => {
      var yiq = (r * 299 + g * 587 + b * 114) / 1000
      return yiq >= 128 ? 'black' : 'white'
   }
   return (
      <div className="brand-color">
         <div
            className="bg"
            style={{
               background: paletteColor.shade[500].hex,
               color: textColor(paletteColor.shade[500].rgb),
            }}
         >
            {paletteColor.role.charAt(0).toUpperCase() + paletteColor.role.slice(1)}
         </div>

         <div className="buttons">
            <button className="copy">#</button>
            <button className="lock">L</button>
            <button className="change">
               {' '}
               C
               <input onChange={ev=>onColorChange(ev,paletteColor.role)} type="color" value={paletteColor.shade[500].hex} />
            </button>
         </div>
      </div>
   )
}

export default BrandColor
