import React from 'react'
import { getMonochromatic } from '../../services/color.service'

interface MonochromaticProps {
   hex: string
}

const Monochromatic: React.FC<MonochromaticProps> = ({ hex }) => {
   const shades = getMonochromatic(hex)
   return (
      <div className='scheme'>
         {shades.reverse().map((color, index) => (
            <div key={index} className="color" style={{ backgroundColor: color }}></div>
         ))}

         <br />
      </div>
   )
}

export default Monochromatic
