import React, { useEffect, useState } from 'react'

import { PaletteColorType, PaletteType } from '../types'
import { PaletteColorRole } from '../types'
import SwatchList from '../components/SwatchList'
import Waves from '../components/Waves'
import { PaletteColorStyle } from '../types'
import { Color } from '../services/color.service'
import { usePaletteStore } from '../store/usePaletteStore'
import { setSassPalette, setSassVariable } from '../hooks/useSass'
import { usePrevious } from '../hooks/usePrev'
import { Palette } from '../services/Palette.service'

type Props = {
   scrollPosition: number
}

function Hero({ scrollPosition }: Props) {
   const [colorStyle, setColorStyle] = React.useState<PaletteColorStyle>('pastel')
   const [avg, setAvg] = useState(0)
   const [pts, setPts] = useState([])
   // const [tempValue, setValue] = useState(1)
   // temp value type 1|2|3
   const [tempValue, setTempVal]: [1 | 2 | 3, React.Dispatch<React.SetStateAction<1 | 2 | 3>>] = useState<1 | 2 | 3>(1)
   const [fluidity, setFluidityVal]: [1 | 2 | 3, React.Dispatch<React.SetStateAction<1 | 2 | 3>>] = useState<1 | 2 | 3>(
      3
   )
   const { generatePalette, palette, setPalette } = usePaletteStore()
   const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(event.target.value, 10)
      setTempVal(newValue as 1 | 2 | 3)
      // console.log('Slider value:', newValue)
   }
   const [prevPalette, setPrevPalette] = useState<PaletteType>(palette)


   const handleFluidity = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(event.target.value, 10)
      setFluidityVal(newValue as 1 | 2 | 3)
      // console.log('Slider value:', newValue)
   }

   useEffect(() => {
      setPaletteCssVars(palette)
   }, [palette])

   const randomNum = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1) + min) as 1 | 2 | 3
   }

   const handleGenerate = () => {
      generatePalette(tempValue, fluidity, palette)
      setPalette(new Palette(palette.getMiniPalette()))
      console.log(palette._id);
      
      setSassPalette(palette.getMiniPalette())
   }

   useEffect(() => {
      function handleKeyDown(event: KeyboardEvent) {
         // Check if 'Ctrl' (or 'Cmd' for MacOS) and 'Z' keys are pressed together
         if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
            // Prevent default browser behavior (like browser undo)
            event.preventDefault()
            // Set the count to its previous value
            if (palette !== undefined) {
               setPalette(new Palette(prevPalette))
            }
         }
      }

      // Attach the event listener
      window.addEventListener('keydown', handleKeyDown)

      // Cleanup by removing the event listener when the component is unmounted
      return () => {
         window.removeEventListener('keydown', handleKeyDown)
      }
   }, [])

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
            // console.log();
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
                  <button
                     style={{
                        background: palette.primary.shade[500].hex,
                        color: textColor(palette.primary.shade[500].rgb),
                     }}
                     className="btn-primary"
                     onClick={handleGenerate}
                  >
                     Generate
                  </button>

                  <select onChange={ev => setTempVal(+ev.target.value as 1 | 2 | 3)}>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                  </select>
                  <select onChange={ev => setFluidityVal(+ev.target.value as 1 | 2 | 3)}>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                  </select>
                  {/* <select onChange={ev => setColorStyle(ev.target.value as PaletteColorStyle)}>
                     <option value="pastel">Pastel</option>
                     <option value="jewel">Jewel</option>
                     <option value="earth">Earthy</option>
                     <option value="neon">Neon</option>
                  </select> */}
               </div>
            </header>

            <div className="img"></div>
            <div style={{ position: 'absolute', bottom: '0', right: 0, width: '100%', zIndex: '1' }}>
               <Waves />
            </div>
         </div>

         {/* <input type="range" min={1} max={3} value={tempValue} onChange={handleSliderChange} style={{ width: '20%' }} /> */}
         {/* <input type="range" min={1} max={3} value={fluidity} onChange={handleFluidity} style={{ width: '20%' }} /> */}

      </section>
   )
}

export default Hero
