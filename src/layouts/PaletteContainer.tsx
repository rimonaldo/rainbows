import React, { useState, useEffect } from 'react'
import { usePaletteContext } from '../hooks/usePaletteContext'
import ContactCard from '../components/examples/ContactCard'
import { useColorContext } from '../hooks/useColorContext'
import { useHarmonyContext } from '../hooks/useHarmonyContext'
import { Color } from '../services/color.class'
import ColorSliders from '../components/color/ColorSliders'
import { ColorType } from '../types/ColorType'
import { SchemeType } from '../types/HarmonyType'
import { hsl } from '../services/color.class'
const PaletteContainer: React.FC = () => {
   const { color, setColor } = useColorContext()
   const { palette, setPalette, setPrimary } = usePaletteContext()
   const { scheme, harmony } = useHarmonyContext()

   useEffect(() => {
      setPrimary(color)
   }, [color])

   useEffect(() => {
      // setPrimary(color)
      // let randomScheme: SchemeType = getRandomSchemeFromColor(color)
      // let randomColor = new Color({ hex: getRandomColorFromScheme(randomScheme).hex })
      // console.log(randomColor)

      const randomTemp = Math.random() >= 0.5 ? 'warm' : 'cool'
      const randomNeutral = new Color({ hsl: generateNeutralColor(randomTemp) })
      // let secondary = randomColor
      let neutral = randomNeutral

      // if secondary in not Color Type

      setPalette({ ...palette, neutral })
   }, [palette.primary])

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
      let schemeColors = scheme.colors.filter(color => color.hex !== palette.primary.hex)
      return schemeColors[Math.floor(Math.random() * schemeColors.length)]
   }

   function generateNeutralColor(temperature: string) {
      var color = ''
      var temp = temperature.toLowerCase()
      var h, s, l
      const random = +(Math.random() * (1 - 0.8) + 0.8).toFixed(2)

      // random number between 0 and and .3
      const randomSat = +(Math.random() * (0.3 - 0) + 0).toFixed(2)
      if (temp === 'warm') {
         h = Math.floor(Math.random() * (60 - 0) + 0)
         s = randomSat
         l = random
      } else if (temp === 'cool') {
         h = Math.floor(Math.random() * (240 - 180) + 180)
         s = randomSat
         l = random
      } else if (temp === 'white') {
         h = 0
         s = 0
         l = 1
      } else if (temp === 'black') {
         h = 0
         s = 0
         l = 0
      }
      color = 'hsl(' + h + ', ' + s + '%, ' + l + '%)'

      return { h, s, l } as hsl
   }

   const handleColorChange = (ev: any) => {
      const formatKey = ev.target.name
      const formatVal = ev.target.value
      console.log(ev)

      // setColorFromHsl({ ...color.hsl, [formatKey]: formatVal / 100 })

      // setColor(color.hex)
   }

   // const handleColorChange = (ev:) => {
   //    setColor(color.hex)
   // }

   const handleHslChange = (ev: any) => {
      const formatKey = ev.target.name
      const formatVal = ev.target.value
      console.log(ev)
   }

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
                     <p>{palette.primary.hex}</p>
                  </div>
                  <div className="bg" style={{ backgroundColor: palette.primary.hex }}></div>
               </div>
            </div>

            <div className="palette-color">
               <div>
                  <div className="hex">
                     <p>{palette.neutral.hex}</p>
                  </div>
                  <div className="bg" style={{ backgroundColor: palette.neutral.hex }}></div>
               </div>
            </div>

            <div className="palette-color">
               <div>
                  <div className="hex">
                     <p>{palette.secondary.hex}</p>
                  </div>
                  <div className="bg" style={{ backgroundColor: palette.secondary.hex }}></div>
               </div>
            </div>

            {palette.colors.map((color, i) => {
               return (
                  <div className="palette-color" key={i}>
                     <div>
                        {/* <ColorSliders color={color} onChange={handleHslChange} /> */}
                        <div className="hex">
                           <p>{color.hex}</p>
                        </div>
                        <div className="bg" style={{ backgroundColor: color.hex }}></div>
                     </div>
                  </div>
               )
            })}
         </div>

         <ContactCard />
      </div>
   )
}

export default PaletteContainer
