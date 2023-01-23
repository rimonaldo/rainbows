import React, { useContext, useState, useEffect } from 'react'
import { Color } from '../services/color.class'
import { ColorType, hex, hsl, rgb, hsv } from '../types/ColorType'
import { hslToRgb, hsvToRgb, rgbToHex } from '../services/colorService'
import { colorService } from '../services/colorService'

export const setColor = (hex: string) => {
   return new Color(hex)
}

const useColor = (initial: ColorType) => {
   const [color, setFromHex] = useState<ColorType>(initial)
   const [rgbVal, setRgbVal] = useState<rgb>(color.rgb)
   const [hslVal, setHslVal] = useState<hsl>(color.hsl)
   const [hsvVal, setHsvVal] = useState<hsv>(color.hsv)

   return {
      color,
      hslVal,
      setColor: (hex: string) => {
         setFromHex(setColor(hex))
      },
      setFromRgb: (rgb: rgb) => {
         let newHex = colorService.rgbToHex(rgb)
         setFromHex(new Color(newHex))
         setRgbVal(rgb)
      },
      setFromHsl: (hsl: hsl) => {
         let newHsl = { ...hsl, s: hsl.s, l: hsl.l }
         let newHex = colorService.rgbToHex(hslToRgb(newHsl))
         setFromHex(new Color(newHex))
         setHslVal(hsl)
      },
      setFromHsv: (hsv: hsv) => {
         let newHex = colorService.rgbToHex(hsvToRgb(hsv))
         setFromHex(new Color(newHex))
         setHsvVal(hsv)
      },
   }
}

export type UseType = ReturnType<typeof useColor>
export type UseColorType = ReturnType<typeof useColor>
const ColorContext = React.createContext<UseColorType | null>(null)
export const useColorContext = () => useContext(ColorContext)!
export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
   return <ColorContext.Provider value={useColor(new Color('#ffffff'))}>{children}</ColorContext.Provider>
}
