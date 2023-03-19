import React, { useContext, useState, useEffect } from 'react'
import { ColorType } from '../../services/color/type'
import { Color } from '../../services/color/color'
import { Palette } from '../../services/palette/palette'
import { PaletteMetaDataType, PaletteType, PaletteColorRole, PaletteColorType } from '../../services/palette/PaletteType'
import { PaletteColor } from '../../services/palette'
import { paletteUtils as utils } from '../../services/palette/paletteUtils'

const usePalette = (
   initial: PaletteType = new Palette({
      primary: new PaletteColor({ role: 'primary', color: new Color({}) }),
   })
) => {
   const [palette, setPalette] = useState<PaletteType>(initial)
   const [paletteStyle, setPaletteStyle] = useState<string>(initial.metaData.paletteStyle)
   return {
      palette,
      
      setPalette: (newPalette: PaletteType) => {
         setPalette(newPalette)
      },

      generatePalette(colorStyle: 'earth' | 'pastel' | 'neon' | 'jewel') {
         const newPalette = palette.generate(colorStyle)
         setPalette(newPalette)
         
      },

      editPaletteColor: (role: string, hex: string) => {
         role = role
         let newColor = new PaletteColor({ role, color: new Color({ hex }) })
         let newPalette = new Palette({ ...palette, [role]: newColor })
         setPalette(newPalette)
      },

      setMetaData: (metaData: PaletteMetaDataType) => {
         let newPalette = new Palette({ ...palette, metaData })
         setPalette(newPalette)
      },

      // setPaletteStyle:()

      getHslByPaletteStyle: (paletteStyle: string) => {
         return utils.getRandomHslByPaletteStyle(paletteStyle)
      },

      generatePaletteByStyle: (paletteStyle: 'neon' | 'pastel' | 'earth' | 'jewel') => {
         let primaryHsl = utils.getRandomHslByPaletteStyle(paletteStyle)
         let primary = new Color({ hsl: primaryHsl })
         let metaData = { ...palette.metaData }
         let newPalette = new Palette({
            theme: palette.theme,
            metaData,
            primary: new PaletteColor({ role: 'primary', color: primary }),
         })
         setPalette(newPalette)
      },

      setPaletteStyle: (paletteStyle: string) => {
         setPaletteStyle(paletteStyle)
      },

      generatePaletteColorByStyle: (paletteStyle: string, role: PaletteColorRole) => {
         let hsl = utils.getRandomHslByPaletteStyle(paletteStyle)
         let color = new Color({ hsl })
         let paletteColor = new PaletteColor({ role, color })
         let newPalette = new Palette({ ...palette, [role]: paletteColor })
         setPalette(newPalette)
      },
   }
}

export type UsePaletteType = ReturnType<typeof usePalette>
const PaletteContext = React.createContext<UsePaletteType | null>(null)
export const usePaletteContext = () => useContext(PaletteContext)!
export const PaletteProvider = ({ children }: { children: React.ReactNode }) => {
   return <PaletteContext.Provider value={usePalette(new Palette({}))}>{children}</PaletteContext.Provider>
}
