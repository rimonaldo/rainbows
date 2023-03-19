import React, { useContext, useState, useEffect } from 'react'
import { Color } from '../services/color'
import { ColorType, hex, hsl, rgb, hsv } from '../services/color'

export const setColor = (hex: string) => {
   return new Color({ hex })
}

const useColor = (initial: ColorType) => {
   const [color, colorSet] = useState<ColorType>(initial)
   return {
      color,
      setColor: (hex: string) => {
         colorSet(setColor(hex))
      },
      setFromRgb: (rgb: rgb) => {
         colorSet(new Color({ rgb }))
      },
      setColorFromHsl: (hsl: hsl) => {
         colorSet(new Color({ hsl }))
      },
      setFromHsv: (hsv: hsv) => {
         colorSet(new Color({ hsv }))
      },
   }
}

export default useColor

