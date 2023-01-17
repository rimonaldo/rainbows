import { useState, useEffect, useRef } from 'react'
import { HexColorPicker } from 'react-colorful'
import { ColorType } from '../types/color'

type ColorBoxProps = {
   handleColorChange: (hex: string) => void
   color: ColorType
   hex:string
   harmony: object | null | any
}

const ColorBox: React.FC<ColorBoxProps> = ({ color, handleColorChange, harmony,hex }) => {
   return (
      <>
         <div className="color-picker-container">
            <HexColorPicker
               color={hex}
               onChange={handleColorChange}
               style={{ minWidth: '100%', height: '35vw' }}
            />
            <div className="color-settings">
               <input type="range" />
               <input type="range" />
            </div>
         </div>
       
      </>
   )
}

export default ColorBox

// draft h2 harmony type title

// {
//    /* <h2

{
   /* <h2
className="harmony-title "
style={{
   color: harmony.title === 'monochromatic' ? harmony.colors[0] : harmony.colors[2] || harmony.colors[1],
}}
>
{harmony.title}
</h2> */
}
