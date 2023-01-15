import { useState, useEffect, useRef } from 'react'
import { HexColorPicker } from 'react-colorful'
import { ColorType } from '.././types/color'

type ColorBoxProps = {
   handleColorChange: (hex: string) => void
   color: ColorType
   harmony: object | null | any
}

const ColorBox: React.FC<ColorBoxProps> = ({ color, handleColorChange, harmony }) => {
   return (
      <div className="">
         <div className="color-picker-container">
            <HexColorPicker
               color={color.hex}
               onChange={handleColorChange}
               style={{ minWidth: '35%', height: '17.5vw' }}
            />
            <div className="color-settings">
               <input type="range"  />
               <input type="range" />
            </div>
         </div>

         <h2
            style={{
               color: harmony?.title === 'monochromatic' ? harmony.colors[0] : harmony.colors[2] || harmony.colors[1],
            }}
         >
            {harmony.title}
         </h2>
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
