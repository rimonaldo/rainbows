import { useState, useEffect } from 'react'
import { Color } from '../services/color.class'
import { ColorType } from '../types/color'
import { hslToRgb, rgbToHex } from '../services/colorService'
import { getTriadic, getMonochromatic, getComplementary } from '../services/color.service'
const useHarmony = (color: ColorType = new Color('#ffffff'), type: string = 'complementary') => {
   const [harmony, setHarmony] = useState<string[]>([])
   const [colors, setColors] = useState<string[]>([])
   const [title, setTitle] = useState<string>(type)
   useEffect(() => {
      let colors: string[] = ['#ffffff']
      switch (type) {
         case 'monochromatic':
            let monoHsls = color.getMonoHsls()
            let MonoRgbs = monoHsls.map(hsl => hslToRgb(hsl))
            colors = MonoRgbs.map(rgb => rgbToHex(rgb))
            break
         case 'triadic':
            let triadHsls = color.getTriadHsls()
            let triadRgbs = triadHsls.map(hsl => hslToRgb(hsl))
            colors = triadRgbs.map(rgb => rgbToHex(rgb))
            break
         case 'complementary':
            let compHsls = color.getCompHsls()
            let compRgbs = compHsls.map(hsl => hslToRgb(hsl))
            colors = compRgbs.map(rgb => rgbToHex(rgb))
            break
         case 'analogous':
            let analogHsls = color.getAnalogHsls()
            let analogRgbs = analogHsls.map(hsl => hslToRgb(hsl))
            colors = analogRgbs.map(rgb => rgbToHex(rgb))
            break
      }
      // console.log(colors)
      setTitle(type)
      setHarmony(colors)
   }, [type, color])

   return harmony
}

export default useHarmony
