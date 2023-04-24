import React, { useEffect, useState } from 'react'
import { usePaletteContext } from '../hooks/usePaletteContext'
import { PaletteColorType, PaletteType } from '../services/palette/PaletteType'
import { PaletteColorRole } from '../services/palette/PaletteType'
import SwatchList from '../components/SwatchList'
import Waves from '../components/Waves'
import { ColorStyle } from '../services/palette/PaletteType'
type Props = {
   scrollPosition: number
}

function Hero({ scrollPosition }: Props) {
   const { palette, setLock, setPalette, paletteColors, generatePaletteByStyle, generatePaletteColor } =
      usePaletteContext()
   const [colorStyle, setColorStyle] = React.useState<ColorStyle>('pastel')

   useEffect(() => {
      setPaletteCssVars(palette)
   }, [palette])

   const handleGenerate = () => {
      const brandColors = [palette.primary, palette.secondary, palette.tertiary]
      const unlockedColors = brandColors.filter((color: PaletteColorType) => !color.isLocked)
      let newColor
      console.log(unlockedColors)

      let newPalette = { ...palette }
      unlockedColors.forEach(color => {
         newColor = generatePaletteColor(colorStyle, color.role as PaletteColorRole)
         // console.log(newColor.role);

         newPalette = { ...newPalette, [newColor.role]: newColor }
      })

      // generatePaletteByStyle(colorStyle)
      setPalette(newPalette)
   }

   const setPaletteCssVars = (palette: PaletteType) => {
      const root = document.documentElement
      const colorRoles = [
         'primary',
         'secondary',
         'tertiary',
         'neutral',
         'success',
         'warning',
         'info',
      ] as PaletteColorRole[]

      colorRoles.forEach(role => {
         for (let i = 100; i <= 900; i += 100) {
            const variableName = `--${role}${i}`
            const value = palette[role].shade[i].hex
            root.style.setProperty(variableName, value)
         }
      })
   }

   const textColor = ({ r, g, b }: { r: number; g: number; b: number }) => {
      var yiq = (r * 299 + g * 587 + b * 114) / 1000
      return yiq >= 128 ? 'black' : 'white'
   }

   return (
      <section className="hero-container ">
         {/* <div className="scroll " style={{ position: 'sticky', top: '2rem', left: '2rem', color: 'black' }}>
            {scrollPosition}
         </div> */}

         <div className="hero">
            <header>
               <div className="h-container  ">
                  <h1 style={{ color: palette.primary.shade[500].hex }}>
                     Generate a Rainb<span style={{ color: palette.secondary.shade[600].hex }}>o</span>w <br /> of
                     Possibilities
                  </h1>
               </div>

               <div className="action-container">
                  <button className="btn-primary" onClick={handleGenerate}>
                     Generate
                  </button>

                  <select onChange={ev => setColorStyle(ev.target.value as ColorStyle)}>
                     <option value="pastel">Pastel</option>
                     <option value="jewel">Jewel</option>
                     <option value="earth">Earthy</option>
                     <option value="neon">Neon</option>
                  </select>
               </div>
            </header>

            <div className="img"></div>
            <div style={{ position: 'absolute', bottom: '0', right: 0, width: '100%', zIndex: '1' }}>
               <Waves />
            </div>
         </div>

         <SwatchList palette={palette} onLock={setLock} />
      </section>
   )
}

export default Hero
