import React, { useEffect, useRef, useState } from 'react'
import { PaletteColorRole, PaletteType, hex } from '../types'
import { PaletteColorType } from '../types'
import Swatch from './Swatch'
import { guid } from '../services/utils'
type Props = {
   palette: PaletteType
   onLockToggle: (role: PaletteColorRole, newLockState: boolean) => void
   onColorChange: (role: PaletteColorRole, hex: hex) => void
}

const SwatchList = ({ palette, onLockToggle: onLock , onColorChange}: Props) => {
   const { primary, secondary, tertiary, info, success, warning, danger, neutral } = palette
   const colors = [primary, secondary, tertiary, neutral, neutral]
   const [itemsToShow, setItemsToShow] = useState<number>(5)
   const [isTop, setIsTop] = useState<boolean>(false)
   const [colorStyle, setColorStyle] = React.useState<'neon' | 'pastel' | 'earth' | 'jewel'>('pastel')

   // wiewport height
   const swatchListRef = useRef<HTMLDivElement>(null)
   const swatchList = swatchListRef.current
   const position = swatchList?.getBoundingClientRect()

   // viewport width
   const [width, setWidth] = useState<number>(window.innerWidth)
   const handleResize = () => {
      setWidth(window.innerWidth)
   }

   useEffect(() => {
      window.addEventListener('resize', handleResize)
      return () => {
         window.removeEventListener('resize', handleResize)
      }
   })

   // set number of swatches to show based on viewport width
   useEffect(() => {
      // console.log(width)
      if (width < 768) {
         setItemsToShow(3)
      } else {
         setItemsToShow(4)
      }
   }, [width])

   // set scroll animation
   useEffect(() => {
      if (position && position?.top < 0) {
         setIsTop(true)
      } else {
         setIsTop(false)
      }
   }, [position])

   return (
      <div style={{ border: '1px white solid' }} ref={swatchListRef} className="swatch-list-container ">
         <ul className="swatch-list rounded-2xl">
            {colors.slice(0, itemsToShow).map((color, index) => {
               return (
                  <Swatch
                     key={guid()}
                     color={color}
                     onLock={(role: PaletteColorRole, newLockState: boolean) => onLock(role, newLockState)}
                     onColorChange={(role: PaletteColorRole, hex: hex) =>onColorChange(role, hex) }
                  />
               )
            })}
         </ul>
         <div className="desc">
            <button className="generate">Generate</button>
            <select onChange={ev => setColorStyle(ev.target.value as 'neon' | 'pastel' | 'earth' | 'jewel')}>
               <option value="pastel">Pastel</option>
               <option value="jewel">Jewel</option>
               <option value="earth">Earthy</option>
               <option value="neon">Neon</option>
            </select>
         </div>
      </div>
   )
}

export default SwatchList
