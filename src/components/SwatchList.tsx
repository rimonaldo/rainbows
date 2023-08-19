import React, { useEffect, useRef, useState } from 'react'
import { PaletteColorRole, PaletteColorStyle, PaletteType, StylerType, hex } from '../types'
import { PaletteColorType } from '../types'
import Swatch from './Swatch'
import { guid } from '../services/utils'
import { usePaletteStore } from '../store/usePaletteStore'
type Props = {
   palette: PaletteType
   onLockToggle: (role: PaletteColorRole, newLockState: boolean) => void
   onColorChange: (role: PaletteColorRole, hex: hex) => void
   onStyleAdd: (role: PaletteColorRole, style: StylerType) => void
}

const SwatchList = ({ palette, onLockToggle: onLock, onColorChange , onStyleAdd }: Props) => {
   const { primary, secondary, tertiary, info, success, warning, danger, neutral, neutralBright, neutralDark } = palette
   const colors = [primary, secondary, tertiary, neutralBright, neutralDark]
   const [itemsToShow, setItemsToShow] = useState<number>(5)
   const [isTop, setIsTop] = useState<boolean>(false)
   const [colorStyle, setColorStyle] = React.useState<'neon' | 'pastel' | 'earth' | 'jewel'>('pastel')
   const { genColorByStyle ,} = usePaletteStore()
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
      console.log('rendered swatch-List')
   }, [])

   useEffect(() => {
      window.addEventListener('resize', handleResize)
      return () => {
         window.removeEventListener('resize', handleResize)
      }
   })

   // set number of swatches to show based on viewport width
   useEffect(() => {
      if (width < 768) {
         setItemsToShow(3)
      } else {
         setItemsToShow(5)
      }
   }, [width])

   // set scroll animation
   // useEffect(() => {
   //    if (position && position?.top < 0) {
   //       setIsTop(true)
   //    } else {
   //       setIsTop(false)
   //    }
   // }, [position])
   const onStyleChange = (role: PaletteColorRole, style: PaletteColorStyle) => {
      genColorByStyle(palette, role, style)
      // setStyle(ev.target.value as PaletteColorStyle)
   }

   

   return (
      <div style={{ border: '1px white solid' }} ref={swatchListRef} className="swatch-list-container ">
         <ul className="swatch-list rounded-2xl">
            {colors.slice(0, itemsToShow).map((color, index) => {
               return (
                  <Swatch
                     key={color.role}
                     color={color}
                     handleStyleChange={(role: PaletteColorRole, style: PaletteColorStyle) =>
                        onStyleChange(role, style)
                     }
                     onLock={(role: PaletteColorRole, newLockState: boolean) => onLock(role, newLockState)}
                     onColorChange={(role: PaletteColorRole, hex: hex) => onColorChange(role, hex)}
                     onStyleAdd={(role: PaletteColorRole, style: StylerType) => onStyleAdd(role, style)}
                  />
               )
            })}
         </ul>
         {/* <div className="desc">
            <button className="generate">Generate</button>
            <select onChange={ev => setColorStyle(ev.target.value as 'neon' | 'pastel' | 'earth' | 'jewel')}>
               <option value="pastel">Pastel</option>
               <option value="jewel">Jewel</option>
               <option value="earth">Earthy</option>
               <option value="neon">Neon</option>
            </select>
         </div> */}
      </div>
   )
}

export default SwatchList
