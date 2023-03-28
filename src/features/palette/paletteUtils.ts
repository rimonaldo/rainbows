const getColorNameByHue = (hue: number) => {
   if (hue < 15) return 'red'
   if (hue > 15 && hue < 45) return 'orange'
   if (hue > 45 && hue < 75) return 'yellow'
   if (hue > 75 && hue < 105) return 'yellow-green'
   if (hue > 105 && hue < 135) return 'green'
   if (hue > 135 && hue < 165) return 'green-blue'
   if (hue > 165 && hue < 195) return 'blue'
   if (hue > 195 && hue < 225) return 'blue-purple'
   if (hue > 225 && hue < 255) return 'purple'
   if (hue > 255 && hue < 285) return 'purple-pink'
   if (hue > 285 && hue < 315) return 'pink'
   if (hue > 315 && hue < 345) return 'pink-red'
   if (hue > 345) return 'red'
}

const enum harmonyTitle {
   Triadic = 'triadic',
   Complementary = 'complementary',
   Analogous = 'analogous',
}

const getRandomHarmony = () => {
   const harmonies: harmonyTitle[] = [harmonyTitle.Triadic, harmonyTitle.Triadic, harmonyTitle.Triadic]
   const randomHarmony = harmonies[Math.floor(Math.random() * harmonies.length)]
   return randomHarmony as harmonyTitle
}

const getHarmonyAngle = (harmony: harmonyTitle) => {
   switch (harmony) {
      case harmonyTitle.Triadic:
         return 120
      case harmonyTitle.Complementary:
         return 180
      case harmonyTitle.Analogous:
         return 30
   }
}

const getMidPoint = (a: number, b: number) => {
   return (a + b) / 2
}
/* Color Style
__________________________________________________________________________________________
 */
type ColorStyleRangeType = {
   sat: { min: number; max: number }
   lum: { min: number; max: number }
}

const paletteStyle: { [key: string]: ColorStyleRangeType } = {
   pastel: { sat: { min: 0.3, max: 0.45 }, lum: { min: 0.8, max: 0.9 } },
   neutral: { sat: { min: 0.05, max: 0.15 }, lum: { min: 0.75, max: 0.9 } },
   neon: { sat: { min: 0.95, max: 1 }, lum: { min: 0.6, max: 0.7 } },
   earth: { sat: { min: 0.2, max: 0.35 }, lum: { min: 0.2, max: 0.4 } },
   jewel: { sat: { min: 0.6, max: 0.7 }, lum: { min: 0.5, max: 0.7 } },
}

const getClosestColorStyleByHsl = ({ h, s, l }: { h: number; s: number; l: number }) => {
   const colorStyleKeys = Object.keys(paletteStyle) as Array<keyof typeof paletteStyle>
   let closest
   let closestDistance = Infinity
   colorStyleKeys.forEach(key => {
      const { sat, lum } = paletteStyle[key]
      const satDistance = Math.abs(s - getMidPoint(sat.min, sat.max))
      const lumDistance = Math.abs(l - getMidPoint(lum.min, lum.max))
      const distance = satDistance + lumDistance
      if (distance < closestDistance) {
         closestDistance = distance
         closest = key
      }
   })

   return closest
}

const getColorStyleByHsl = ({ h, s, l }: { h: number; s: number; l: number }) => {
   const colorStyleKeys = Object.keys(paletteStyle) as Array<keyof typeof paletteStyle>
   const colorStyleKey = colorStyleKeys.find(key => {
      const { sat, lum } = paletteStyle[key]
      return s >= sat.min && s <= sat.max && l >= lum.min && l <= lum.max
   })
   const closest = getClosestColorStyleByHsl({ h, s, l })

   return colorStyleKey || closest
}

const getHslRangeByColorStyle = (colorStyleKey: keyof typeof paletteStyle): ColorStyleRangeType => {
   return paletteStyle[colorStyleKey]
}

const getRandomHslByPaletteStyle = (colorStyleKey: keyof typeof paletteStyle) => {
   const { sat, lum } = getHslRangeByColorStyle(colorStyleKey)
   const h = +(Math.random() * 360).toFixed(0)
   const s = +(Math.random() * (sat.max - sat.min) + sat.min).toFixed(2)
   const l = +(Math.random() * (lum.max - lum.min) + lum.min).toFixed(2)
   return { h, s, l }
}

// __________________________________________________________________________________________

const randomIntBetween = (min: number, max: number) => {
   return Math.floor(Math.random() * (max - min + 1) + min)
}

export const paletteUtils = {
   getColorNameByHue,
   getRandomHslByPaletteStyle,
   getRandomHarmonyTitle: getRandomHarmony,
   getHarmonyAngle,
   getMidPoint,
   getColorStyleByHsl,
   getHslRangeByColorStyle,

   randomIntBetween,

   paletteStyle,

   getClosestColorStyleByHsl,
}
