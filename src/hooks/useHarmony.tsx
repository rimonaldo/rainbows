// import { useState } from 'react'
// import { Color } from '../services/color.service'
// import { ColorType } from '../types'
// import { HarmonyTitle, SchemeType } from '../services/harmony'
// import { Harmony, HarmonyType } from '../services/harmony'

// const TitlesToSchemeDic = {
//    [HarmonyTitle.Monochromatic]: (harmony: HarmonyType) => harmony.getMonoColors(),
//    [HarmonyTitle.Triadic]: (harmony: HarmonyType) => harmony.getTriadColors(),
//    [HarmonyTitle.Complementary]: (harmony: HarmonyType) => harmony.getCompColor(),
//    [HarmonyTitle.Analogous]: (harmony: HarmonyType) => harmony.getAnalogColors(),
// }

// const useHarmony = (initial: HarmonyType = new Harmony(new Color({}))) => {
//    const [harmony, setHarmony] = useState<HarmonyType>(initial)
//    const [scheme, setScheme] = useState<SchemeType>(initial.analogous)
//    return {
//       harmony,
//       setHarmony: (color: ColorType) => {
//          setHarmony(new Harmony(color))
//       },
//       scheme,
//       setScheme: (harmonyTitle: HarmonyTitle) => {
//          let selectedScheme = TitlesToSchemeDic[harmonyTitle](harmony)
//          setScheme(selectedScheme)
//       },
//    }
// }

// export default useHarmony
