import React, { useState, useEffect } from 'react'
import './style/header.scss'
import BrandColor from './BrandColor'
// import BrandColors from './BrandColorList'
import { usePaletteContext } from '../../../hooks/usePaletteContext'
type Props = {
   isSticky: boolean
   openMenu: () => void
}

const Header = ({ isSticky, openMenu }: Props) => {
   const { palette, editPaletteColor } = usePaletteContext()
   const { primary, secondary, neutral, success, info, warning, danger } =
      palette
   const paletteColorsToShow = [
      primary,
      secondary,
      neutral,
      neutral,
      info,
      success,
      warning,
      danger,
   ]
   const [colorsShownAmt, setColorsShownAmt] = useState(
      paletteColorsToShow.length - 1
   )
   const [viewPort, setViewPort] = useState(window.innerWidth)
   const handleResize = () => {
      setViewPort(window.innerWidth)
      if (window.innerWidth < 768) {
         setColorsShownAmt(4)
      }
   }

   useEffect(() => {
      window.addEventListener('resize', handleResize)

      if (window.innerWidth < 968) {
         setColorsShownAmt(4)
      } else {
         setColorsShownAmt(paletteColorsToShow.length)
      }
   }, [viewPort])

   const handleColorChange = (
      ev: React.ChangeEvent<HTMLInputElement>,
      role: string
   ) => {
      editPaletteColor(role, ev.target.value)
      const newHex = ev.target.value
   }

   return (
      <div className="sticky" style={{ top: isSticky ? '0' : '-11rem' }}>
         <div className="header">
            <div className="logo">Rainbows</div>
            <div className="brand-colors">
               {paletteColorsToShow
                  .slice(0, colorsShownAmt)
                  .map((paletteColor, index) => (
                     <BrandColor
                        paletteColor={paletteColor}
                        key={paletteColor.role}
                        onColorChange={handleColorChange}
                     />
                  ))}
            </div>
            {/* <div className="settings">
               <div className="left col select-style">
                  <select name="" id="">
                     <option value="">Option 1</option>
                     <option value="">Option 2</option>
                     <option value="">Option 3</option>
                  </select>
               </div>

               <div className="right col select-theme">
                  <div>
                     <input
                        type="radio"
                        name="toggle"
                        id="light"
                        value="light"
                     />
                     <label htmlFor="light">Light</label>
                  </div>
                  <div>
                     <input type="radio" name="toggle" id="dark" value="dark" />
                     <label htmlFor="dark">Dark</label>
                  </div>
               </div>
            </div> */}
         </div>

         <button className="menu" onClick={() => openMenu()}>
            <div className="icon">
               <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M3 12H21M3 6H21M3 18H21"
                     stroke="white"
                     stroke-width="2"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                  />
               </svg>
            </div>
         </button>
      </div>
   )
}

export default Header
