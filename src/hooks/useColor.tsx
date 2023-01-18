import { useState, useEffect } from 'react'
import { Color } from '../services/color.class'
import { ColorType, hex, rgb, hsl, hsv } from '../types/color'
import { hslToRgb, hsvToRgb, rgbToHex } from '../services/colorService'
import { HarmonyTitle, HarmonyType } from '../types/HarmonyType'
import { colorService } from '../services/colorService'

const formatToHexDic = {
   hex: (hex: hex) => hex,
   rgb: (rgb: rgb) => colorService.rgbToHex(rgb),
   hsl: (hsl: hsl) => colorService.rgbToHex(hslToRgb(hsl)),
   hsv: (hsv: hsv) => colorService.rgbToHex(hsvToRgb(hsv)),
}

type Format = hex | rgb | hsl | hsv

const useColor = () => {
   const [hex, setHex] = useState<hex>('#ffffff')
   const [color, setColor] = useState<ColorType>(new Color(hex))
   const [colorFormat, setFormat] = useState<Format>('')
   const handleFormatChange = (format: Format) => {
      // const hexColors = formatToHexDic[color.title](color.mainColor).map(hsl => rgbToHex(hslToRgb(hsl)))
      // color.colors = hexColors
        // const newHex = formatToHexDic[typeof format]
      console.log(typeof format === 'string'? 'hex':'')
      if (typeof format === 'string') setFormat(hex)
    //   if (format === {}) setFormat(hex)
      //   setHex()
      setFormat(format)
      setColor(new Color(hex))
   }

   return [color, handleFormatChange] as const
}

export default useColor
