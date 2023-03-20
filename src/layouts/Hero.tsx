import React, { useEffect, useState } from 'react'
import { usePaletteContext } from '../hooks/usePaletteContext'
import { PaletteColorType } from '../services/palette/PaletteType'
import { PaletteColorRole } from '../services/palette/PaletteType'
import SwatchList from '../components/SwatchList'
type Props = {
   scrollPosition: number
}

function Showcase({ scrollPosition }: Props) {
   const { palette, paletteColors, generatePaletteByStyle, generatePaletteColor } = usePaletteContext()
   const [colorStyle, setColorStyle] = React.useState<'neon' | 'pastel' | 'earth' | 'jewel'>('pastel')
   const setSassVariable = (variable: string, value: string) => {
      const root = document.documentElement
      root.style.setProperty(variable, value)
   }

   // generate random color
   const [isSwatchListSticky, setIsSwatchListSticky] = React.useState<boolean>(false)

   const handleGenerate = () => {
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
      // setPrimary(new Color({ hex: randomColor }))

      const unlockedColors = paletteColors.filter((color: PaletteColorType) => !color.isLocked)
      unlockedColors.forEach(color => {
         generatePaletteColor(colorStyle, color.role as PaletteColorRole)
         console.log(color.role)
      })
      generatePaletteByStyle(colorStyle)
      // setPrimary(new Color({ hex: randomColor }), )
   }

   useEffect(() => {
      setSassVariable('--primary500', palette.primary.shade[500].hex)
      setSassVariable('--primary100', palette.primary.shade[100].hex)
      setSassVariable('--primary200', palette.primary.shade[200].hex)
      setSassVariable('--primary300', palette.primary.shade[300].hex)
      setSassVariable('--primary400', palette.primary.shade[400].hex)
      setSassVariable('--primary600', palette.primary.shade[600].hex)
      setSassVariable('--primary700', palette.primary.shade[700].hex)
      setSassVariable('--primary800', palette.primary.shade[800].hex)
      setSassVariable('--primary900', palette.primary.shade[900].hex)
      setSassVariable('--secondary100', palette.secondary.shade[100].hex)
      setSassVariable('--secondary200', palette.secondary.shade[200].hex)
      setSassVariable('--secondary300', palette.secondary.shade[300].hex)
      setSassVariable('--secondary400', palette.secondary.shade[400].hex)
      setSassVariable('--secondary500', palette.secondary.shade[500].hex)
      setSassVariable('--secondary600', palette.secondary.shade[600].hex)
      setSassVariable('--secondary700', palette.secondary.shade[700].hex)
      setSassVariable('--secondary800', palette.secondary.shade[800].hex)
      setSassVariable('--secondary900', palette.secondary.shade[900].hex)

      setSassVariable('--neutral100', palette.neutral.shade[100].hex)
      setSassVariable('--neutral200', palette.neutral.shade[200].hex)
      setSassVariable('--neutral300', palette.neutral.shade[300].hex)
      setSassVariable('--neutral400', palette.neutral.shade[400].hex)
      setSassVariable('--neutral500', palette.neutral.shade[500].hex)
      setSassVariable('--neutral600', palette.neutral.shade[600].hex)
      setSassVariable('--neutral700', palette.neutral.shade[700].hex)
      setSassVariable('--neutral800', palette.neutral.shade[800].hex)
      setSassVariable('--neutral900', palette.neutral.shade[900].hex)
   }, [palette])

   const getShadeHex = (color: PaletteColorType, shade: number) => {
      return color.shade[shade].hex
   }

   const textColor = ({ r, g, b }: { r: number; g: number; b: number }) => {
      var yiq = (r * 299 + g * 587 + b * 114) / 1000
      return yiq >= 128 ? 'black' : 'white'
   }

   return (
      <section
         className="showcase-container "
         // style={{ position: 'relative', background: getShadeHex(palette.neutral, 500) }}
         style={{ position: 'relative' }}
      >
         <div className="scroll " style={{ position: 'sticky', top: '2rem', left: '2rem', color: 'black' }}>
            {scrollPosition}
         </div>
         <div className="hero">
            <header>
               <div className="h-container  ">
                  <h1 style={{ color: palette.primary.shade[500].hex }}>
                     Generate a Rainb<span style={{ color: palette.secondary.shade[600].hex }}>o</span>w <br /> of
                     Possibilities
                  </h1>
               </div>

               <div className="flex">
                  <div className="btn btn-primary " onClick={handleGenerate}>
                     Generate
                  </div>
                  <select onChange={ev => setColorStyle(ev.target.value as 'neon' | 'pastel' | 'earth' | 'jewel')}>
                     <option value="pastel">Pastel</option>
                     <option value="jewel">Jewel</option>
                     <option value="earth">Earthy</option>
                     <option value="neon">Neon</option>
                  </select>
               </div>
            </header>
            <div className="img"></div>
         </div>
         <SwatchList></SwatchList>
         <div style={{ position: 'absolute', bottom: 0, right: 0, width: '100%' }}>{/* <Waves /> */}</div>
      </section>
   )
}

export default Showcase
