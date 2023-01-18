import React from 'react'
import PaletteColor from './PaletteColor'
type PaletteProps = {
   palette: string[]
}

const Palette: React.FC<PaletteProps> = ({ palette }) => {
   return (
      <section className="palette">
         <div className="primary color">
            <PaletteColor color={palette[0]} />
         </div>

         <div className="accent-1 color">
            accent
            <PaletteColor color={palette[1]} />
         </div>

         <div className="accent-2 color">
            accent
            <PaletteColor color={palette[2] || palette[1]} />
         </div>
         <div className="accent-3 color">
            accent
            <PaletteColor color={palette[2] || palette[1]} />
         </div>
         <div className="typo color">typo</div>
      </section>
   )
}

export default Palette
