import React, { useEffect } from 'react'
import './showcase.scss'
import { usePaletteContext } from './hooks/usePaletteContext'
import { useColorContext } from './hooks/useColorContext'
import { Color } from './services/color'
import { PaletteColorType } from './services/palette/type'
import Waves from './Waves'
type Props = {}

function Showcase({}: Props) {
   const { palette, setPrimary, generatePaletteByStyle } = usePaletteContext()
   const { color, setColor } = useColorContext()
   const setSassVariable = (variable: string, value: string) => {
      const root = document.documentElement
      root.style.setProperty(variable, value)
   }

   // generate random color

   const handleGenerate = () => {
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
      // setPrimary(new Color({ hex: randomColor }))
      console.log(palette.metaData.paletteStyle)
      generatePaletteByStyle(palette.metaData.paletteStyle)
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
         className="showcase-container"
         style={{ position: 'relative', background: getShadeHex(palette.neutral, 500) }}
      >
         <div className="hero">
            <header>
               <div className="h-container">
                  <h1>Rainbows</h1>
                  <div className="sub"> A color palette generator for your next project</div>
               </div>
               <p>
                  see how the colors in our palette can be used in design elements to create a cohesive and visually
                  appealing design.
               </p>
               <div
                  className="btn btn-primary
               "
                  onClick={handleGenerate}
               >
                  Generate
               </div>
            </header>
            <div className="img">
               {/* <img src="./rocket.svg" alt="" style={{ width: '100%', height: '100%' }} /> */}
            </div>
         </div>
         <div style={{ position: 'absolute', bottom: 0, right: 0, width: '100%' }}>
            <Waves />
         </div>
      </section>
   )
}

export default Showcase
