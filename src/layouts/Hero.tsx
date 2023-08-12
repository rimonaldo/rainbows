import React, { useEffect, useState } from 'react'
import { PaletteType } from '../types'
import Waves from '../components/Waves'
import { usePaletteStore } from '../store/usePaletteStore'
import { usePrevious } from '../hooks/usePrev'
import { Palette } from '../services/Palette.service'
import { setSassPalette } from '../hooks/useSass'
import useDebounce from '../hooks/useDebounce'

type Props = {}

function Hero({}: Props) {
   const { generatePalette, palette, setPalette } = usePaletteStore()
   const [prevPalette, setPrevPalette] = useState<PaletteType>(palette)
   const [tempValue, setTempVal]: [1 | 2 | 3, React.Dispatch<React.SetStateAction<1 | 2 | 3>>] = useState<1 | 2 | 3>(1)
   const [fluidity, setFluidityVal]: [1 | 2 | 3, React.Dispatch<React.SetStateAction<1 | 2 | 3>>] = useState<1 | 2 | 3>(
      3
   )
   const [num, incNum] = useState(0)
   const debouncedNum = useDebounce(num, 700)

   const handleGenerate = () => {
      generatePalette(tempValue, fluidity, palette)
      incNum(num + 1)
   }

   useEffect(() => {
      setSassPalette(palette.getMiniPalette())
   }, [debouncedNum])

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

   const textColor = ({ r, g, b }: { r: number; g: number; b: number }) => {
      var yiq = (r * 299 + g * 587 + b * 114) / 1000
      return yiq >= 128 ? 'black' : 'white'
   }

   const randNum = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1) + min) as 1 | 2 | 3
   }

   return (
      <section className="hero-container ">
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
               </div>
            </header>

            <div className="img"></div>
            <div style={{ position: 'absolute', bottom: '0', right: 0, width: '100%', zIndex: '1' }}>
               <Waves />
            </div>
         </div>
      </section>
   )
}

export default Hero
