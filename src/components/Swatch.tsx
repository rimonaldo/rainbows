import React, { useEffect, useState } from 'react'
import { PaletteColorRole, PaletteColorType, hex } from '../types'
import { CiUnlock } from 'react-icons/ci'
import { CiLock } from 'react-icons/ci'
import { IoColorPaletteOutline } from 'react-icons/io5'
import useDebounce from '../hooks/useDebounce'
type Props = {
   color: PaletteColorType
   onLock: (role: PaletteColorRole, newLockState: boolean) => void
   onColorChange: (role: PaletteColorRole, hex: hex) => void
}

const Swatch: React.FC<Props> = React.memo(({ color, onLock, onColorChange }) => {
   const [colorHex, setColorHex] = useState(color.hex)
   const debouncedHex = useDebounce(colorHex, 200)

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

   return (
      <li className="swatch">
         <div className="color" style={{ background: color.shade[500].hex }}></div>
         <div className="bottom-line">
            <div className="hex">{color.shade[500].hex}</div>
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
