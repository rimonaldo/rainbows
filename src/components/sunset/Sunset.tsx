import React from 'react'
import { usePaletteContext } from '../../hooks/usePaletteContext'
import PaletteColorShades from '../palette/PaletteColorShades'
import './sunset.scss'

type Props = {}

const Sunset = (props: Props) => {
   const { palette } = usePaletteContext()

   const primaryShades = [
      palette.primary.shade[100],
      palette.primary.shade[200],
      palette.primary.shade[300],
      palette.primary.shade[400],
      palette.primary.shade[500],
      palette.primary.shade[600],
      palette.primary.shade[400],
      palette.primary.shade[300],
      palette.primary.shade[200],
      palette.primary.shade[100],
   ]

   const secondaryShades = [
      palette.secondary.shade[100],
      palette.secondary.shade[200],
      palette.secondary.shade[300],
      palette.secondary.shade[400],
      palette.secondary.shade[500],
      palette.secondary.shade[600],
      palette.secondary.shade[700],
      palette.secondary.shade[800],
      palette.secondary.shade[900],
   ]
   return (
      <div className="sunset-container">
         <header>
            <h1>Sunset</h1>
            <h3>In Shades City</h3>
         </header>

         <div className="sunset-wrapper">
            <div className="sun-wrapper">
               {primaryShades.map((shade, i) => {
                  return <div key={i} className="sun-shade" style={{ background: shade.hex }}></div>
               })}
            </div>
            {secondaryShades.map((shade, i) => {
               return <div key={i} className="sunset-shade" style={{ background: shade.hex }}></div>
            })}
         </div>
      </div>
   )
}

export default Sunset
