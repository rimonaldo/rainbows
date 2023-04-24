import React, { useContext, useState, useEffect } from 'react'
import { ColorType } from '../services/color/type'
import { Color } from '../services/color/color'
import { Palette } from '../services/palette/palette'
import { PaletteType, PaletteColorRole, PaletteColorType } from '../services/palette/PaletteType'
import { PaletteColor } from '../services/palette'
import { paletteUtils as utils } from '../services/palette/paletteUtils'

const usePalette = (
   initial: PaletteType = new Palette({
      primary: new PaletteColor({ role: 'primary', color: new Color({}) }),
   })
) => {
   const [palette, setPalette] = useState<PaletteType>(initial)
   const [paletteStyle, setPaletteStyle] = useState<'neon' | 'pastel' | 'earth' | 'jewel'>(
      // initial.paletteStyle
      'pastel'
   )
   const [colorLocked, setColorLocked] = useState<boolean>(false)
   const [lockedColors, setLockedColors] = useState<PaletteColorType[]>([])

   const paletteColors = [
      palette.primary,
      palette.secondary,
      palette.tertiary,
      palette.neutral,
      palette.success,
      palette.info,
      palette.warning,
      palette.danger,
   ]

   return {
      palette,
      paletteColors,
      generatePaletteByStyle: (
         temp: number = 0,
         fluidity: number = 0,
         paletteStyle: 'neon' | 'pastel' | 'earth' | 'jewel'
      ) => {
         const updatedPalette = { ...palette }
         // updatedPalette.genBrandColors(temp, fluidity, paletteStyle)
         // palette.genBrandColors(temp, fluidity, paletteStyle)
         palette.generate()
         setPalette(prevState => ({ ...prevState, ...updatedPalette }))
      },

      // setPrimary: (primary: ColorType, theme: 'light' | 'dark' = palette.theme) => {
      //    let primaryColor = new PaletteColor({
      //       color: primary,
      //       role: 'primary',
      //    })
      //    setPalette(new Palette({ primary: primaryColor, theme }))
      // },

      // generate: (paletteStyle: 'neon' | 'pastel' | 'earth' | 'jewel') => {
      //    let primaryHsl = utils.getRandomHslByPaletteStyle(paletteStyle)
      //    let primary = new Color({ hsl: primaryHsl })
      //    let metaData = { ...palette.metaData }
      //    let newPalette = new Palette({
      //       theme: palette.theme,
      //       metaData,
      //       primary: new PaletteColor({ role: 'primary', color: primary }),
      //    })
      //    setPalette(newPalette)
      // },

      setPalette: (newPalette: PaletteType) => {
         setPalette(newPalette)
      },

      editPaletteColor: (role: PaletteColorRole, hex: string) => {
         let newColor = new PaletteColor({ role, color: new Color({ hex }) })
         // let newPalette = new Palette({ ...palette, [role]: newColor })
         palette.setPaletteColor(newColor, role)
         setPalette(palette)
      },

      setPaletteStyle: (paletteStyle: 'neon' | 'pastel' | 'earth' | 'jewel') => {
         setPaletteStyle(paletteStyle)
      },

      getHslByPaletteStyle: (paletteStyle: string) => {
         return utils.getRandomHslByPaletteStyle(paletteStyle)
      },

      generatePaletteColor: (paletteStyle: string, role: PaletteColorRole) => {
         let hsl = utils.getRandomHslByPaletteStyle(paletteStyle)
         // console.log(hsl)
         let color = new Color({ hsl })
         console.log()

         return new PaletteColor({ role, color })
      },

      setLock(paletteColor: PaletteColorType) {
         paletteColor.setLock()
      },
   }
}

export type UsePaletteType = ReturnType<typeof usePalette>
const PaletteContext = React.createContext<UsePaletteType | null>(null)
export const usePaletteContext = () => useContext(PaletteContext)!
export const PaletteProvider = ({ children }: { children: React.ReactNode }) => {
   return <PaletteContext.Provider value={usePalette(new Palette({}))}>{children}</PaletteContext.Provider>
}
