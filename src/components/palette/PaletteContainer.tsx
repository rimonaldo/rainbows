import React, { useState, useEffect } from 'react'
import { usePaletteContext } from '../../hooks/usePaletteContext'
import ContactCard from '../examples/ContactCard'
import { useColorContext } from '../../hooks/useColorContext'
import { useHarmonyContext } from '../../hooks/useHarmonyContext'
import { Color } from '../../services/color/color'
import ColorSliders from '../color/ColorSliders'
import { ColorType } from '../../services/color/type'
import { SchemeType } from '../../services/harmony/type'
import { useSassContext } from '../../hooks/useSassContext'
const PaletteContainer: React.FC = () => {
   const { color, setColor } = useColorContext()
   const { palette, setPalette, setPrimary } = usePaletteContext()
   const { scheme, harmony } = useHarmonyContext()
   const { setSassVariable } = useSassContext()
   useEffect(() => {
      setPrimary(color)
   }, [color])

   useEffect(() => {
      const root = document.documentElement
      setSassVariable('--primary', palette.neutral.shade[500].hex)
   }, [palette])

   // set neutral color - warm | cool | white | black

   // get random color scheme from color
   const getRandomSchemeFromColor = (color: ColorType) => {
      const triad = harmony.triadic
      const analogous = harmony.analogous
      const complementary = harmony.complementary
      const monocromatic = harmony.monocromatic
      const allSchemes = [triad, analogous, complementary, monocromatic]
      return allSchemes[Math.floor(Math.random() * allSchemes.length)]
   }

   //    const getRandomColorFromScheme = (scheme: ColorType[]) => return SchemeType

   const getRandomColorFromScheme = (scheme: SchemeType) => {
      let schemeColors = scheme.colors.filter(color => color.hex !== palette.primary.shade[500].hex)
      return schemeColors[Math.floor(Math.random() * schemeColors.length)]
   }

   const handleColorChange = (ev: any) => {
      const formatKey = ev.target.name
      const formatVal = ev.target.value

      // setColorFromHsl({ ...color.hsl, [formatKey]: formatVal / 100 })

      // setColor(color.hex)
   }

   // const handleColorChange = (ev:) => {
   //    setColor(color.hex)
   // }

   const handleHslChange = (ev: any) => {
      const formatKey = ev.target.name
      const formatVal = ev.target.value
   }

   const onGeneratePalette = () => {}

   return (
      <div className="palette-container">
         <div className="palette-title">
            <h2 style={{ color: color.hex }}>Palettes</h2>
         </div>
         <div className="content">
            <div className="palette-color">
               <div>
                  {/* <ColorSliders color={color} onChange={handleHslChange} /> */}
                  <div className="hex">
                     <p>{palette.secondary.shade[500].hex}</p>
                     <p>Secondary</p>
                  </div>
                  <div className="bg" style={{ backgroundColor: palette.secondary.shade[500].hex }}></div>
               </div>
            </div>

            <div className="palette-color">
               <div>
                  <div className="hex">
                     <p>{palette.primary.shade[500].hex}</p>
                     <p>Primary</p>
                  </div>
                  <div className="bg" style={{ backgroundColor: palette.primary.shade[500].hex }}></div>
               </div>
            </div>

            <div className="palette-color">
               <div>
                  <div className="hex">
                     <p>{palette.neutral.shade[500].hex}</p>
                     <p>Neutral</p>
                  </div>
                  <div className="bg" style={{ backgroundColor: palette.neutral.shade[500].hex }}></div>
               </div>
            </div>
         </div>

         <ContactCard />

         <div className="content">
            <div className="palette-color">
               <div>
                  {/* <ColorSliders color={color} onChange={handleHslChange} /> */}
                  <div className="hex">
                     <p>{palette.success.shade[500].hex}</p>
                     <p>Success</p>
                  </div>
                  <div className="bg" style={{ backgroundColor: palette.success.shade[500].hex }}></div>
               </div>
            </div>

            <div className="palette-color">
               <div>
                  {/* <ColorSliders color={color} onChange={handleHslChange} /> */}
                  <div className="hex">
                     <p>{palette.info.shade[500].hex}</p>
                     <p>Info</p>
                  </div>
                  <div className="bg" style={{ backgroundColor: palette.info.shade[500].hex }}></div>
               </div>
            </div>

            <div className="palette-color">
               <div>
                  <div className="hex">
                     <p>{palette.warning.shade[500].hex}</p>
                     <p>Warning</p>
                  </div>
                  <div className="bg" style={{ backgroundColor: palette.warning.shade[500].hex }}></div>
               </div>
            </div>

            <div className="palette-color">
               <div>
                  <div className="hex">
                     <p>{palette.danger.shade[500].hex}</p>
                     <p>danger</p>
                  </div>
                  <div className="bg" style={{ backgroundColor: palette.danger.shade[500].hex }}></div>
               </div>
            </div>
         </div>
         <button onClick={() => setPrimary(color)} className="generate">
            Generate
         </button>
      </div>
   )
}

export default PaletteContainer
