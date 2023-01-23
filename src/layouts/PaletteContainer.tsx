import React, { useState, useEffect } from 'react'
import { ColorType } from '../types/ColorType'
import { Color } from '../services/color.class'
import { usePaletteContext } from '../hooks/usePaletteContext'
import ContactCard from '../components/examples/ContactCard'
type PaletteContainerProps = {
   hex: string
}

const PaletteContainer: React.FC<PaletteContainerProps> = ({ hex }) => {
   const [color, setColor] = useState<ColorType>(new Color('#ffffff'))
   const { palette, addColor } = usePaletteContext()
   useEffect(() => {
      setColor(new Color(hex))
   }, [hex])

   return (
      <div className="palette-container">
         <div className="palette-title">
            <h2 style={{ color: color.hex }}>Palettes</h2>
         </div>

         <div className="content">
            {palette.colors.map((color, i) => {
               return (
                  <div className="palette-color" key={i}>
                     <div>
                        <div className="hex">
                           <p>{color.hex}</p>
                        </div>
                        <div className="bg" style={{ backgroundColor: color.hex }}></div>
                     </div>
                  </div>
               )
            })}
         </div>
         <ContactCard />
      </div>
   )
}

export default PaletteContainer
