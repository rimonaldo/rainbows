import React from 'react'
import { PaletteColorType } from '../services/palette'
import { CiUnlock } from 'react-icons/ci'
import { CiLock } from 'react-icons/ci'
import { usePaletteContext } from '../hooks/usePaletteContext'
import { guid } from '../services/utils'
type Props = {
   color: PaletteColorType
   setLock: (color: PaletteColorType) => void
}

const Swatch = ({ color, setLock }: Props) => {
   const [isLocked, setIsLocked] = React.useState(color.isLocked)
   const handleLock = () => {
      setLock(color)
      setIsLocked(color.isLocked)
      console.log(color)
   }

   return (
      <li className="swatch" key={guid()}>
         <div className="color " style={{ background: color.shade[500].hex }}></div>
         <div className="bottom-line">
            <div className="hex">{color.shade[500].hex}</div>
            <div onClick={handleLock} className="lock ">
               {isLocked ? <CiLock /> : <CiUnlock />}
            </div>
         </div>
      </li>
   )
}

export default Swatch
