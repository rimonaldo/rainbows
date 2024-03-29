import React, { useContext, useState, useEffect } from 'react'
import { ColorType } from '../services/color/type'
import { Color } from '../services/color/color'
import { Harmony, HarmonyType } from '../services/harmony'
import { SchemeType } from '../services/harmony/type'
import { HarmonyTitle } from '../services/harmony/type'
const TitlesToSchemeDic = {
   [HarmonyTitle.Monochromatic]: (harmony: HarmonyType) => harmony.getMonoColors(),
   [HarmonyTitle.Triadic]: (harmony: HarmonyType) => harmony.getTriadColors(),
   [HarmonyTitle.Complementary]: (harmony: HarmonyType) => harmony.getCompColor(),
   [HarmonyTitle.Analogous]: (harmony: HarmonyType) => harmony.getAnalogColors(),
}

const useHarmony = (initial: HarmonyType = new Harmony(new Color({}))) => {
   const [harmony, setHarmony] = useState<HarmonyType>(initial)
   const [scheme, setScheme] = useState<SchemeType>(initial.analogous)

   useEffect(() => {
      let newScheme = TitlesToSchemeDic[scheme.title](harmony)
      setScheme({ ...scheme, colors: newScheme.colors })
   }, [harmony])

   return {
      harmony,
      setHarmony: (color: ColorType) => {
         setHarmony(new Harmony(color))
      },
      scheme,
      setScheme: (scheme: SchemeType) => {
         let newScheme = TitlesToSchemeDic[scheme.title](harmony)
         setScheme({ ...scheme, colors: newScheme.colors })
      },
   }
}

export type UseHarmonyType = ReturnType<typeof useHarmony>
const HarmonyContext = React.createContext<UseHarmonyType | null>(null)
export const useHarmonyContext = () => useContext(HarmonyContext)!
export const HarmonyProvider = ({ children }: { children: React.ReactNode }) => {
   return <HarmonyContext.Provider value={useHarmony(new Harmony(new Color({})))}>{children}</HarmonyContext.Provider>
}
