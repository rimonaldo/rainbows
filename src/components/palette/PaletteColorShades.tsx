import React from 'react'
import { PaletteColorType } from '../../services/palette/type'
type Props = {
   paletteColor: PaletteColorType
}

const PaletteColorShades = ({ paletteColor }: Props) => {
   const shades = [
      paletteColor.shade[100],
      paletteColor.shade[200],
      paletteColor.shade[300],
      paletteColor.shade[400],
      paletteColor.shade[500],
      paletteColor.shade[600],
      paletteColor.shade[700],
      paletteColor.shade[800],
      paletteColor.shade[900],
   ]

   return (
      <>
         <div className="palette-shades">
            {shades.map((shade, i) => (
               <div key={i} className="palette-shade">
                  <div className="palette-shade-color" style={{ background: shade.hex }}>
                     <span style={{ opacity: 0.3 }}>{shade.hex} </span>
                  </div>
               </div>
            ))}
         </div>
      </>
   )
}

export default PaletteColorShades
