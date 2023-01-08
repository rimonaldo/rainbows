import { useState, useEffect } from 'react'
import { getTriadic, getMonochromatic, getComplementary } from '../services/color.service'
const useHarmony = (color: string, type: string) => {
   const [harmony, setHarmony] = useState<string[]>([])

   useEffect(() => {
      let colors: string[] = []

      switch (type) {
         case 'monochromatic':
            colors = getMonochromatic(color)
            break
         case 'triadic':
            colors = getTriadic(color)
            break
         case 'complementary':
            colors = getComplementary(color)
            break
         // case 'analogous':
         //    colors = getAnalogous(color)
         //    break
      }
      console.log(colors)

      setHarmony(colors)
   }, [type, color])

   return harmony
}

export default useHarmony
