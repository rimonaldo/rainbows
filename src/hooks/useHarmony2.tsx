import { useState, useEffect } from 'react'
import { Color } from '../services/color.class'
import { ColorType } from '../types/color'
import { hslToRgb, rgbToHex } from '../services/colorService'
import { HarmonyType } from '../types/HarmonyType'

const useHarmony = () => {
   const [harmony, setHarmony] = useState<HarmonyType>({
      type: 'complementary',
      mainColor: new Color('#ffffff'),
      colors: [],
   })
   let colors: string[] = []

   const handleHarmonyChange = (harmony: HarmonyType) => {
      switch (harmony.type) {
         case 'monochromatic':
            let monoHsls = harmony.mainColor.getMonoHsls()
            let monoRgbs = monoHsls.map(hsl => hslToRgb(hsl))
            colors = monoRgbs.map(rgb => rgbToHex(rgb))
            console.log('change')

            break
         case 'triadic':
            let triadHsls = harmony.mainColor.getTriadHsls()
            let triadRgbs = triadHsls.map(hsl => hslToRgb(hsl))
            colors = triadRgbs.map(rgb => rgbToHex(rgb))
            break
         case 'complementary':
            let compHsls = harmony.mainColor.getCompHsls()
            let compRgbs = compHsls.map(hsl => hslToRgb(hsl))
            colors = compRgbs.map(rgb => rgbToHex(rgb))
            break
         case 'analogous':
            let analogHsls = harmony.mainColor.getAnalogHsls()
            let analogRgbs = analogHsls.map(hsl => hslToRgb(hsl))
            colors = analogRgbs.map(rgb => rgbToHex(rgb))
            break
      }
   }

   useEffect(() => {
      console.log('change')
      handleHarmonyChange(harmony)
      setHarmony(prevHarmony => ({ ...prevHarmony, colors }))
   }, [harmony.type, harmony.mainColor])

   return [harmony, handleHarmonyChange]
}

export default useHarmony
