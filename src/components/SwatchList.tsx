import React, { useEffect, useRef, useState } from 'react'
import { usePaletteContext } from '../hooks/usePaletteContext'
import { CiUnlock } from 'react-icons/ci'
import { CiLock } from 'react-icons/ci'
import { PaletteColorType } from '../services/palette'
import { useScroll } from '../hooks/useScroll'
import Swatch from './Swatch'
type Props = {}

const SwatchList = ({}: Props) => {
   const { palette, setLock } = usePaletteContext()
   const { primary, secondary, tertiary, info, success, warning, danger, neutral } = palette
   const colors = [primary, secondary, tertiary, neutral, neutral]
   const [isTop, setIsTop] = useState(false)
   const handleLock = (color: PaletteColorType) => {
      setLock(color)
   }
   const { elRef, getTop } = useScroll()
   // reference the swatch list to get position
   const swatchListRef = useRef<HTMLDivElement>(null)

   const swatchList = swatchListRef.current
   useEffect(() => {
      const position = swatchList?.getBoundingClientRect()

      // if scroll position is at swatch list position, log position
      if (position && position?.top < 0) {
         setIsTop(true)
      } else {
         setIsTop(false)
      }
   })

   return (
      <div ref={swatchListRef} className="swatch-list-container " style={{ position: isTop ? 'sticky' : 'sticky' }}>
         <ul className="swatch-list rounded-2xl">
            {colors.map((color, index) => {
               return <Swatch key={index} color={color} />
            })}
         </ul>
         <div className="desc">
            <button>Generate</button>
            <p style={{ opacity: isTop ? '0' : '1', transition:'.2s' }}>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. 
               Voluptatem beatae distinctio ut tempore? Sint
            </p>
         </div>
      </div>
   )
}

export default SwatchList
