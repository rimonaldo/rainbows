import { useState, useEffect } from 'react'
import { Color } from '../services/color.class'
import { ColorType } from '../types/color'
import { hslToRgb, rgbToHex } from '../services/colorService'
import { HarmonyTitle, HarmonyType } from '../types/HarmonyType'

const ColorsToHslsDic = {
   [HarmonyTitle.Monochromatic]: (color: ColorType) => color.getMonoHsls(),
   [HarmonyTitle.Triadic]: (color: ColorType) => color.getTriadHsls(),
   [HarmonyTitle.Complementary]: (color: ColorType) => color.getCompHsls(),
   [HarmonyTitle.Analogous]: (color: ColorType) => color.getAnalogHsls(),
}

const useHarmony = () => {
   const [harmony, setHarmony] = useState<HarmonyType>({
      title: HarmonyTitle.Analogous,
      mainColor: new Color('#ffffff'),
      colors: ['#ffffff'],
   })

   const handleHarmonyChange = (harmony: HarmonyType) => {
      const hexColors = ColorsToHslsDic[harmony.title](harmony.mainColor).map(hsl => rgbToHex(hslToRgb(hsl)))
      harmony.colors = hexColors
      setHarmony({ ...harmony })
   }

   return [harmony, handleHarmonyChange] as const
}

export default useHarmony
