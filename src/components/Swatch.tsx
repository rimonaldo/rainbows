import React, { useEffect , useState } from 'react'
import { PaletteColorRole, PaletteColorType, hex } from '../types'
import { CiUnlock } from 'react-icons/ci'
import { CiLock } from 'react-icons/ci'
import { TbColorSwatch } from 'react-icons/tb'
import { IoColorPaletteOutline } from 'react-icons/io5'
import { guid } from '../services/utils'
import { usePaletteStore } from '../store/usePaletteStore'
import useDebounce from '../hooks/useDebounce'
import { set } from 'lodash'
type Props = {
   color: PaletteColorType
   onLock: (role: PaletteColorRole, newLockState:boolean) => void
   onColorChange: (role: PaletteColorRole, hex: hex) => void
}

const Swatch = ({ color , onLock,onColorChange}: Props) => {
   const [isLocked, setIsLocked] = useState(color.isLocked)
   const [colorHex, setColorHex] = useState(color.hex)
   const debouncedHex = useDebounce(colorHex, 500)

   const handleLock = () => {
    onLock(color.role,!isLocked)
      
   }

   // useEffect(() => {
   //    if (colorHex !== color.hex) {
   //       setColor(palette,color.role,debouncedHex)
   //    }
   // }, [debouncedHex])

   const handleColorChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      ev.preventDefault()
      ev.stopPropagation()
      
      // setColorHex(ev.target.value)
      // onColorChange(color.role,ev.target.value)
   }

   return (
      <li className="swatch" key={guid()}>
         <div className="color " style={{ background: color.shade[500].hex }}></div>
         {/* {color.color.hsl.h.toFixed(0)} */}
         <div className="bottom-line">
            <div className="hex">{color.shade[500].hex}</div>
            <div className='actions'>
               <div className="color-picker">
                  <input value={color.hex}  type="color"  onChange={ev=>handleColorChange(ev)}/>
                  <IoColorPaletteOutline />
               </div>
               <div onMouseUp={handleLock} className="lock ">
                  {isLocked ? <CiLock /> : <CiUnlock />}
               </div>
            </div>
         </div>
      </li>
   )
}

export default Swatch
