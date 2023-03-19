import React from 'react'
import { PaletteColorType } from '../services/palette'
import { CiUnlock } from 'react-icons/ci'
import { CiLock } from 'react-icons/ci'
import { usePaletteContext } from '../hooks/usePaletteContext'
import { guid } from '../services/utils'
type Props = {
   color: PaletteColorType
}

const Swatch = ({ color }: Props) => {
   const [isLocked, setIsLocked] = React.useState(color.isLocked)
   const { setLock } = usePaletteContext()
   const handleLock = () => {
      setLock(color)
      setIsLocked(color.isLocked)
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
