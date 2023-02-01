import React, { useContext, useState, useEffect } from 'react'
import { ColorType } from '../types/ColorType'
import { Color } from '../services/color.class'
import { useHarmonyContext } from './useHarmonyContext'
import ratio, { RgbColor } from 'contrast-ratio'
import { getRandomAAColor } from 'accessible-colors'

import { PaletteModel, PaletteType, PaletteColorTitle, Palette } from '../types/PaletteType'
// map tones to array of colors with same hue and saturation but different lightness

const ranges = {
   [PaletteModel.Jewl]: { s: { min: 0.57, max: 0.71 }, l: { min: 0.33, max: 0.44 } },
   [PaletteModel.Pastel]: { s: { min: 0.36, max: 0.46 }, l: { min: 0.83, max: 0.86 } },
   [PaletteModel.Earth]: { s: { min: 0.19, max: 0.22 }, l: { min: 0.3, max: 0.85 } },
   [PaletteModel.Neon]: { s: { min: 0.8, max: 1 }, l: { min: 0.5, max: 0.6 } },
}

// define color categor
type ColorTones = {
   [key: number]: ColorType
   model: PaletteModel
   base: number
   onBase: number
   container: number
   onContainer: number
}

interface MaterialPaletteType {
   title: string
   model: PaletteModel
   primary: ColorTones
   secondary: ColorTones
   tertiary: ColorTones
   error: ColorTones
   warning: ColorTones
   success: ColorTones
   info: ColorTones
   neutrals: ColorTones[]
}

function limitPrimaryColor(primary: ColorType) {
   if (primary.hsl.l < 0.3) {
      primary.hsl.l = 0.3
   }
   if (primary.hsl.l > 0.7) {
      primary.hsl.l = 0.7
   }
   if (primary.hsl.s < 0.5) {
      primary.hsl.s = 0.5
   }
   return primary
}

const generateTones = (color: ColorType, isLimited: boolean = false) => {
   const tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100]
   let newColor = new Color({ hex: color.hex })
   if (isLimited) newColor = limitPrimaryColor(newColor)

   const { hsl } = newColor
   const { h, s } = hsl
   const colors = tones.map(l => new Color({ hsl: { h, s, l: l / 100 } }))

   const tonesMap = tones.reduce((acc: any, curr, i) => {
      acc[curr] = colors[i]
      return acc
   }, {})

   const closestColor = colors.reduce((prev, curr) => {
      const prevDiff = Math.abs(prev.hsl.l - newColor.hsl.l)
      const currDiff = Math.abs(curr.hsl.l - newColor.hsl.l)
      return prevDiff < currDiff ? prev : curr
   })

   const closestColorIndex = colors.findIndex(newColor => newColor.hex === closestColor.hex)
   tonesMap.base = tones[closestColorIndex]
   tonesMap[tonesMap.base] = new Color({ hsl: newColor.hsl })

   return tonesMap
}

// set color roles - color | onColor | container | onContainer
// const setRoles = (color: ColorType) => {

export const addColor = (palette: PaletteType, color: ColorType) => {
   const index = palette.colors.findIndex(c => c.hex === color.hex)
   let newPalette = new Palette({ ...palette })
   if (index === -1) {
      newPalette.colors.push(color)
   } else {
      newPalette.colors[index] = color
   }
   return newPalette
}

// const getModelFromRange = (color: ColorType) => {
//    const { hsl } = color
//    const { s, l } = hsl
//    const models = Object.keys(ranges)
//    console.log(models)

//    const model = models.find(m => {
//       const { s: sRange, l: lRange } = ranges[m as PaletteModel]
//       return s >= sRange.min && s <= sRange.max && l >= lRange.min && l <= lRange.max
//    })
//    return model as PaletteModel
// }

const generateSecondary = (color: ColorType) => {
   const { hsl } = color
   const { h, s, l } = hsl
   const newColor = new Color({ hsl: { h: h + 180, s: 1 - s, l: 1 - l } })
   return newColor
}

const generateContrastingSecondary = (color: ColorType) => {
   const { hsl } = color
   const { h, s, l } = hsl
   const newColor = new Color({ hsl: { h: h + 180, s: 1 - s, l: 1 - l } })
   return newColor
}

const usePalette = (initial: PaletteType = new Palette({})) => {
   const [palette, setPalette] = useState<PaletteType>(initial)
   return {
      palette,
      addColor: (color: ColorType) => {
         setPalette(palette => addColor(palette, color))
      },
      setPrimary: (color: ColorType) => {
         // let model = getModelFromRange(color)
         // console.log(model)

         let AAhex
         let secondary = new Color({ hex: AAhex })
         // while secondary color saturation is too low or too high - generate new secondary color
         while (secondary.hsl.s < 0.3 || secondary.hsl.s > 0.7) {
            AAhex = getRandomAAColor(color.hex)
            secondary = new Color({ hex: AAhex })
         }

         const primaryRgb: RgbColor = [color.rgb.r, color.rgb.g, color.rgb.b]
         const secondaryRgb: RgbColor = [secondary.rgb.r, secondary.rgb.g, secondary.rgb.b]
         const contrast = ratio(primaryRgb, secondaryRgb)
         console.log(contrast)

         setPalette(palette => {
            let newPalette = new Palette({ ...palette })
            let tones = generateTones(color)
            newPalette.primary = tones[tones.base]
            newPalette.secondary = secondary
            return newPalette
         })
      },

      setPaletteColor: (color: ColorType, colorName: PaletteColorTitle) => {
         setPalette(palette => {
            let newPalette = new Palette({ ...palette })
            newPalette[colorName] = color
            return newPalette
         })
      },

      setSecondary: (color: ColorType) => {
         setPalette(palette => {
            let newPalette = new Palette({ ...palette })
            newPalette.secondary = color
            return newPalette
         })
      },

      setPalette: (palette: PaletteType) => {
         setPalette(palette)
      },
   }
}

export type UsePaletteType = ReturnType<typeof usePalette>
const PaletteContext = React.createContext<UsePaletteType | null>(null)
export const usePaletteContext = () => useContext(PaletteContext)!
export const PaletteProvider = ({ children }: { children: React.ReactNode }) => {
   return <PaletteContext.Provider value={usePalette(new Palette({}))}>{children}</PaletteContext.Provider>
}

// Palette Service

const createRandoSecondaryFromPrimaryComplement = (primary: ColorType) => {
   const primaryColor = new Color({ hex: primary.hex })
   const secondaryColor = new Color({ hex: primary.hex })
   const complement = primaryColor.getCompHsls()[1]
   // secondaryColor.setHex(complement.hex)
   return secondaryColor
}
