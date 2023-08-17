import React, { useEffect, useState } from 'react'
import { PaletteColorRole, PaletteColorStyle, PaletteColorType, hex } from '../types'
import { CiUnlock } from 'react-icons/ci'
import { CiLock } from 'react-icons/ci'
import { IoColorPaletteOutline } from 'react-icons/io5'
import useDebounce from '../hooks/useDebounce'
type Props = {
   color: PaletteColorType
   onLock: (role: PaletteColorRole, newLockState: boolean) => void
   onColorChange: (role: PaletteColorRole, hex: hex) => void
   handleStyleChange: (role: PaletteColorRole, style: PaletteColorStyle) => void
}

const Swatch: React.FC<Props> = React.memo(({ color, onLock, onColorChange, handleStyleChange }) => {
   const [colorHex, setColorHex] = useState(color.hex)
   const debouncedHex = useDebounce(colorHex, 200)
   const [style, setStyle] = useState(color.style)


   const handleLock = () => {
      onLock(color.role, !color.isLocked)
   }

   const handleColorChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      ev.preventDefault()
      ev.stopPropagation()
      setColorHex(ev.target.value)
   }

   useEffect(() => {
      onColorChange(color.role, debouncedHex)
   }, [debouncedHex])

   const onStyleChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
      handleStyleChange(color.role, ev.target.value as PaletteColorStyle)
      // console.log('ev.target.value', ev.target.value);
      
   }

   return (
      <li className="swatch">
         <div className="color" style={{ background: color.shade[500].hex }}></div>
         <div className="bottom-line">
            <select onChange={onStyleChange} value={color.style} name="selectStyle">
               <option value="random">random</option>
               <option value="pastel">pastel</option>
               <option value="jewel">jewel</option>
               <option value="earth">earth</option>
               <option value="neon">neon</option>
            </select>
            {/* <select name="" id="">
               <option value="random">random</option>
               <option value="pastel">pastel</option>
               <option value="jewel">jewel</option>
               <option value="earth">earth</option>
               <option value="neon">neon</option>
            </select> */}

            <div className="actions">
               <div className="color-picker">
                  <input value={color.hex} type="color" onChange={handleColorChange} />
                  <IoColorPaletteOutline />
               </div>
               <div onMouseUp={handleLock} className="lock">
                  {color.isLocked ? <CiLock /> : <CiUnlock />}
               </div>
            </div>
         </div>
      </li>
   )
})

export default Swatch
