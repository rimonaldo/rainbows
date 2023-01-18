import React from 'react'
type PaletteProps = {
   color: string
}
const PaletteColor: React.FC<PaletteProps> = ({ color }) => {
   return (
      <>
         <div className="tints">
            <span>Tints</span>
            <div className="colors">
               <div className="col" style={{ background: color }}>{color}</div>
               <div className="col" style={{ background: color }}>{color}</div>
               <div className="col" style={{ background: color }}>{color}</div>
            </div>
         </div>
         <div className="shades">
            <span>Shades</span>
            <div className="colors">
               <div className="col" style={{ background: color }}></div>
               <div className="col" style={{ background: color }}></div>
               <div className="col" style={{ background: color }}></div>
            </div>
         </div>
         <div className="tones">
            <span>Tones</span>
            <div className="colors">
               <div className="col" style={{ background: color }}></div>
               <div className="col" style={{ background: color }}></div>
               <div className="col" style={{ background: color }}></div>
            </div>
         </div>
      </>
   )
}

export default PaletteColor
