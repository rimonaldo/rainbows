import { useState, useEffect, useRef } from 'react'
import { HexColorPicker } from 'react-colorful'
import { ColorType } from '.././types/color'

type ColorBoxProps = {
   handleColorChange: (hex: string) => void
   color: ColorType
   harmony: { title: string; colors: string[] }
}

const ColorBox: React.FC<ColorBoxProps> = ({ color, handleColorChange, harmony }) => {
   return (
         <div className="color-container">
            <div className="color-picker">
               <HexColorPicker
                  color={color.hex}
                  onChange={handleColorChange}
                  style={{ minWidth: '100%', height: 'clamp(200px,30vw, 250px)' }}
               />
            </div>
         </div>


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
