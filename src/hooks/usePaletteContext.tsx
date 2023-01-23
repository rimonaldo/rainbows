import React, { useContext, useState, useEffect } from 'react'
import { ColorType } from '../types/ColorType'

export const addColor = (palette: PaletteType, color: ColorType) => {
   const index = palette.colors.findIndex(c => c.hex === color.hex)
   let newPalette = new Palette(palette.title, palette.colors)
   if (index === -1) {
      newPalette.colors.push(color)
   } else {
      newPalette.colors[index] = color
   }
   return newPalette
}

export interface PaletteType {
   title: string
   colors: ColorType[]
}

export class Palette implements PaletteType {
   title: string
   colors: ColorType[]
   constructor(title: string = 'Untitled', colors: ColorType[] = []) {
      this.title = title
      this.colors = colors
   }
}

const usePalette = (initial: PaletteType = new Palette()) => {
   const [palette, setPalette] = useState<PaletteType>(initial)
   return {
      palette,
      addColor: (color: ColorType) => {
         setPalette(palette => addColor(palette, color))
      },
   }
}

export type UsePaletteType = ReturnType<typeof usePalette>
const PaletteContext = React.createContext<UsePaletteType | null>(null)
export const usePaletteContext = () => useContext(PaletteContext)!
export const PaletteProvider = ({ children }: { children: React.ReactNode }) => {
   return <PaletteContext.Provider value={usePalette(new Palette())}>{children}</PaletteContext.Provider>
}
