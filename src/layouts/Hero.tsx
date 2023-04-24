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
   const [avg, setAvg] = useState(0)
   const [pts, setPts] = useState([])
   const [tempValue, setValue] = useState(1)
   const [fluidity, setFluidity] = useState(1)

   const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(event.target.value, 10)
      setValue(newValue)
      console.log('Slider value:', newValue)
   }

   const handleFluidity = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(event.target.value, 10)
      setFluidity(newValue)
      console.log('Slider value:', newValue)
   }

   useEffect(() => {
      setPaletteCssVars(palette)
   }, [palette.primary])

   const handleGenerate = () => {
      generatePaletteByStyle(tempValue, fluidity, colorStyle)
      // const { avgHue, pts } = ptsObj
      // setAvg(avgHue)
      setPts(pts)

      // setPalette(newPalette)
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

         <input type="range" min={1} max={3} value={tempValue} onChange={handleSliderChange} style={{ width: '20%' }} />
         <input type="range" min={1} max={3} value={fluidity} onChange={handleFluidity} style={{ width: '20%' }} />
         <div
            style={{
               position: 'relative',
               border: '1px black solid',
               width: '360px',
               margin: '1rem auto',
               padding: '1rem 0',
            }}
         >
            <div
               className="avg"
               style={{ position: 'absolute', top: 0, left: avg, width: '10px', background: 'red', height: '100%' }}
            ></div>

            <div
               className="pt1"
               style={{
                  position: 'absolute',
                  top: 0,
                  left: pts[0],
                  width: '10px',
                  background: 'black',
                  height: '100%',
               }}
            ></div>
            <div
               className="pt2"
               style={{
                  position: 'absolute',
                  top: 0,
                  left: pts[1],
                  width: '10px',
                  background: 'black',
                  height: '100%',
               }}
            ></div>
         </div>
         <SwatchList palette={palette} onLock={setLock} />
      </section>
   )
}

export default Hero
