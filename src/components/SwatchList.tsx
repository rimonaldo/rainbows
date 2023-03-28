import React, { useEffect, useRef, useState } from 'react'
import { PaletteType } from '../features/palette'
import { usePaletteContext } from '../hooks/usePaletteContext'
import { PaletteColorType } from '../services/palette'
import Swatch from './Swatch'
type Props = {
   palette: PaletteType
   onLock: (color: PaletteColorType) => void
}

const SwatchList = ({ palette, onLock }: Props) => {
   const { primary, secondary, tertiary, info, success, warning, danger, neutral } = palette
   const colors = [primary, secondary, tertiary, neutral, neutral]
   const [itemsToShow, setItemsToShow] = useState<number>(5)
   const [isTop, setIsTop] = useState<boolean>(false)
   const [colorStyle, setColorStyle] = React.useState<'neon' | 'pastel' | 'earth' | 'jewel'>('pastel')

   const handleLock = (color: PaletteColorType) => {
      onLock(color)
   }

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

   useEffect(() => {
      console.log(width)
      if (width < 768) {
         setItemsToShow(3)
      } else {
         setItemsToShow(5)
      }
   }, [width])

   useEffect(() => {
      if (position && position?.top < 0) {
         setIsTop(true)
      } else {
         setIsTop(false)
      }
   }, [position])

   return (
      <div ref={swatchListRef} className="swatch-list-container ">
         <ul className="swatch-list rounded-2xl">
            {colors.slice(0, itemsToShow).map((color, index) => {
               return <Swatch key={index} color={color} setLock={onLock} />
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
