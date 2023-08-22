import { useState, useEffect } from 'react'
import { PaletteColorRole, PaletteColorStyle, PaletteType, CustomStyleType, hex } from '../types'
import { CustomStyle } from '../services/ColorStyle.service'
import { keys, set } from 'lodash'

function useCustomStyle(customStyle: CustomStyleType) {
   const [styleName, setStyleName] = useState<string>('')
   const [satMin, setSatMin] = useState<number>(0)
   const [satMax, setSatMax] = useState<number>(1)
   const [lumMin, setLumMin] = useState<number>(0)
   const [lumMax, setLumMax] = useState<number>(1)
   const [style, setStyle] = useState<CustomStyleType>(customStyle)

   useEffect(() => {
      setStyle({
         [styleName]: {
            name: styleName,
            sat: {
               min: satMin,
               max: satMax,
            },
            lum: {
               min: lumMin,
               max: lumMax,
            },
         },
      })
   }, [styleName, satMin, satMax, lumMin, lumMax])

   return {
      style,
      styleName,
      setStyleName,
      setLumMax,
      setLumMin,
      setSatMax,
      setSatMin,
   }
}

export default useCustomStyle
