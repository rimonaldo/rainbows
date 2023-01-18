import { useState, useEffect, useRef } from 'react'
import { HexColorPicker } from 'react-colorful'
import { ColorType } from '../../types/ColorType'

type ColorPickerProps = {
   handleColorChange: (hex: string) => void
   color: ColorType
   hex: string
   harmony: object | null | any
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, handleColorChange, harmony, hex }) => {
   return (
      <>
         <div className="color-picker-container">
            <HexColorPicker color={hex} onChange={handleColorChange} style={{ minWidth: '100%' }} />
         </div>
      </>
   )
}

export default ColorPicker

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
