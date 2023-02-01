import { useState, useEffect } from 'react'
import { Color } from '../services/color.class'
import { ColorType } from '../types/ColorType'
import { hslToRgb, rgbToHex } from '../services/colorService'
import { HarmonyTitle, SchemeType } from '../types/HarmonyType'
import { Harmony, HarmonyType } from '../services/harmony.class'
import { colorService } from '../services/colorService'

const TitlesToSchemeDic = {
   [HarmonyTitle.Monochromatic]: (harmony: HarmonyType) => harmony.getMonoColors(),
   [HarmonyTitle.Triadic]: (harmony: HarmonyType) => harmony.getTriadColors(),
   [HarmonyTitle.Complementary]: (harmony: HarmonyType) => harmony.getCompColor(),
   [HarmonyTitle.Analogous]: (harmony: HarmonyType) => harmony.getAnalogColors(),
}

const useHarmony = (initial: HarmonyType = new Harmony(new Color({}))) => {
   const [harmony, setHarmony] = useState<HarmonyType>(initial)
   const [scheme, setScheme] = useState<SchemeType>(initial.analogous)
   return {
      harmony,
      setHarmony: (color: ColorType) => {
         setHarmony(new Harmony(color))
      },
      scheme,
      setScheme: (harmonyTitle: HarmonyTitle) => {
         let selectedScheme = TitlesToSchemeDic[harmonyTitle](harmony)
         setScheme(selectedScheme)
      },
   }
}

export default useHarmony
