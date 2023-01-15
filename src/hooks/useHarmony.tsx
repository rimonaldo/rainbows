import { useState, useEffect } from 'react'
import { Color } from '../services/color.class'
import { ColorType } from '../types/color'
import { hslToRgb, rgbToHex } from '../services/colorService'
import { HarmonyType } from '../types/HarmonyType'
const useHarmony = (color: ColorType = new Color('#ffffff'), type: string = 'complementary') => {
   const [harmony, setHarmony] = useState<HarmonyType>({ type: 'complementary', mainColor: new Color('#ffffff'),colors:[] })

   useEffect(() => {
      let colors: string[] = []
      switch (type) {
         case 'monochromatic':
            let monoHsls = color.getMonoHsls()
            let monoRgbs = monoHsls.map(hsl => hslToRgb(hsl))
            colors = monoRgbs.map(rgb => rgbToHex(rgb))
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
      setHarmony({ type: harmony.type, mainColor: harmony.mainColor, colors })
   }, [type, color])

   return [harmony]
}

export default useHarmony
