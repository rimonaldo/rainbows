import React, { useEffect, useState } from 'react'
import { usePaletteContext } from '../hooks/usePaletteContext'
import { PaletteColorType } from '../services/palette/PaletteType'
import { PaletteColorRole } from '../services/palette/PaletteType'
import SwatchList from '../components/SwatchList'
import Waves from '../components/Waves'
import { ColorStyle } from '../services/palette/PaletteType'
type Props = {
   scrollPosition: number
}

function Hero({ scrollPosition }: Props) {
   const { palette, paletteColors, generatePaletteByStyle, generatePaletteColor } = usePaletteContext()
   const [colorStyle, setColorStyle] = React.useState<ColorStyle>('pastel')

   useEffect(() => {
      setPaletteCssVars(palette)
   }, [palette])

   const handleGenerate = () => {
      const unlockedColors = paletteColors.filter((color: PaletteColorType) => !color.isLocked)
      unlockedColors.forEach(color => {
         generatePaletteColor(colorStyle, color.role as PaletteColorRole)
      })
      generatePaletteByStyle(colorStyle)
   }

   const setPaletteCssVars = (palette: any) => {
      const root = document.documentElement
      const colorGroups = ['primary', 'secondary', 'tertiary', 'neutral', 'success', 'warning', 'info']

      colorGroups.forEach(group => {
         for (let i = 100; i <= 900; i += 100) {
            const variableName = `--${group}${i}`
            const value = palette[group].shade[i].hex
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
            {/* <div style={{ position: 'absolute', bottom: '0', right: 0, width: '100%', zIndex: '1' }}>
               <Waves />
            </div> */}
         </div>

         <SwatchList />
      </section>
   )
}

export default Hero
