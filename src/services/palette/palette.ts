import { ColorType } from '../color/type'
import { PaletteColorType } from './PaletteType'
import { Color, hsl } from '../color'
import { PaletteType, PaletteMetaDataType } from './PaletteType'
import { getRandomAAColor } from 'accessible-colors'
import { RgbColor } from 'contrast-ratio'
import ratio from 'contrast-ratio'
import { guid } from '../utils'
import { ColorShadeType } from './PaletteType'
import { HarmonyTitle } from '../harmony'
import { paletteUtils as utils } from './paletteUtils'
import { GetColorName } from 'hex-color-to-color-name'


export class PaletteColor implements PaletteColorType {
   hue: number = 0
   _id: string
   role: string
   color: ColorType
   name: string = ''
   shade: ColorShadeType = {
      100: new Color({}),
      200: new Color({}),
      300: new Color({}),
      400: new Color({}),
      500: new Color({}),
      600: new Color({}),
      700: new Color({}),
      800: new Color({}),
      900: new Color({}),
   }
   isLocked: boolean = false

   constructor({ role, color, hex, _id }: { role?: string; color?: ColorType; hex?: string; _id?: string }) {
      this.role = role || 'primary'
      this.color = color || new Color({ hex: hex })
      this._id = _id || guid()
      this.shade[500] = this.color
      this.genShades()
      this.isLocked = this.role === 'primary' ? true : false
      this.name = GetColorName(this.color.hex)
   }

   genShades = () => {
      this.shade[100] = this.genShade100()
      this.shade[900] = this.genShade900()

      this.shade[300] = this.genMidShade(this.shade[100], this.shade[500])
      this.shade[200] = this.genMidShade(this.shade[100], this.shade[300])
      this.shade[400] = this.genMidShade(this.shade[300], this.shade[500])

      this.shade[700] = this.genMidShade(this.shade[500], this.shade[900])
      this.shade[800] = this.genMidShade(this.shade[700], this.shade[900])
      this.shade[600] = this.genMidShade(this.shade[500], this.shade[700])
   }

   genShade100 = () => {
      const initialHue = this.color.hsl.h
      const randomSat = this._randomNumInRange(0.1, 0.2)
      const randomLum = this._randomNumInRange(0.95, 0.97)
      const shade100Hsl = { h: initialHue, s: randomSat, l: randomLum }
      return new Color({ hsl: shade100Hsl })
   }

   genShade900 = () => {
      const initialHue = this.color.hsl.h
      const sat = Math.min(0.9, this.color.hsl.s * 1.25)
      const lum = Math.max(   0.1, this.color.hsl.l * 0.75)
      const shade900Hsl = { h: initialHue, s: sat, l: lum }
      return new Color({ hsl: shade900Hsl })
   }

   genMidShade = (shade1: ColorType, shade2: ColorType) => {
      const initialHue = this.color.hsl.h
      const hsl1 = shade1.hsl
      const hsl2 = shade2.hsl
      const midS = (hsl1.s + hsl2.s) / 2
      const midL = (hsl1.l + hsl2.l) / 2
      const newHsl = { h: initialHue, s: midS, l: midL }
      return new Color({ hsl: newHsl })
   }

   _randomNumInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
   }

   setLock = (isLocked: boolean) => {
      this.isLocked = isLocked
   }

   getShade = (shade: number) => {
      return this.shade[shade]
   }
}

interface PaletteConstructorType {
   title?: string
   primary?: PaletteColorType
   secondary?: PaletteColorType
   tertiary?: PaletteColorType
   neutral?: PaletteColorType
   success?: PaletteColorType
   warning?: PaletteColorType
   danger?: PaletteColorType
   info?: PaletteColorType
   metaData?: PaletteMetaDataType
   theme?: 'light' | 'dark'
}

export class Palette implements PaletteType {
   title: string
   primary: PaletteColorType = new PaletteColor({ role: 'primary' })
   secondary: PaletteColorType = new PaletteColor({ role: 'secondary' })
   tertiary: PaletteColorType = new PaletteColor({ role: 'tertiary' })
   neutral: PaletteColorType = new PaletteColor({ role: 'neutral' })
   success: PaletteColorType = new PaletteColor({ role: 'success' })
   warning: PaletteColorType = new PaletteColor({ role: 'warning' })
   danger: PaletteColorType = new PaletteColor({ role: 'danger' })
   info: PaletteColorType = new PaletteColor({ role: 'info' })
   theme: 'light' | 'dark' = 'light' // light or dark
   temp: 'cool' | 'warm' = 'cool' // warm or cool
   metaData: PaletteMetaDataType = {
      creationTimeStamp: Date.now(),
      temp: 'cool', // warm or cool
      paletteStyle: 'pastel', // pastel or vibrant or earthy jewel or neutral or monochrome
      theme: 'dark', // light or dark
      tags: [], // passional, calm, energetic, feminane , modern , etc
   }

   private tag = 'tag'
   constructor({
      metaData,
      title,
      primary,
      secondary,
      tertiary,
      neutral,
      success,
      warning,
      danger,
      info,
      theme,
   }: PaletteConstructorType) {
      this.title = title || ''
      this.primary = primary || this.primary
      this.secondary = secondary || this.setSecondary()
      this.tertiary = tertiary || this.setTertiary()
      this.neutral = neutral || this.setNeutral(theme)

      this.temp = this.setTempByColor(this.primary.shade[500])
      this.setSemanticColors()
      this.info = info || this.info
      this.success = success || this.success
      this.warning = warning || this.warning
      this.danger = danger || this.danger
      this.metaData = metaData || this.metaData
      this.theme = theme || this.theme
   }

   setTempByColor = (color: ColorType) => {
      const { h } = color.hsl
      let temp = (h >= 0 && h <= 60) || (h >= 270 && h <= 360) ? 'cool' : 'cool'
      return temp as 'cool' | 'warm'
   }

   getColorTemp(color: ColorType) {
      const { h } = color.hsl
      return (h >= 0 && h <= 60) || (h >= 270 && h <= 360) ? 'cool' : 'warm'
   }

   _getAccentHsls = () => {
      const randomHarmony = utils.getRandomHarmonyTitle()
      const angle = utils.getHarmonyAngle(randomHarmony)
      const isRealHarmony = Math.random() > 0.5 ? true : false
      const isOffset = Math.random() > 0.5 ? true : false
      let offset = isOffset ? this.randomInRange(-7.5, 7.5) : 0

      let secondaryHsl = this.primary.shade[500].hsl
      let tertiaryHsl = this.primary.shade[500].hsl

      if (isRealHarmony) {
         let anglesDiff = Math.abs(angle - this.primary.color.hsl.h)
         if (randomHarmony === 'complementary') {
            let isSplit = Math.random() > 0.5 ? true : false
            if (isSplit) {
               let newAngle = angle - anglesDiff
               secondaryHsl.h += newAngle + offset
               tertiaryHsl.h += this.secondary.shade[500].hsl.h + 30 - offset
            } else {
               const randTertiaryHarmony = utils.getRandomHarmonyTitle()
               secondaryHsl.h += angle - anglesDiff + offset
               tertiaryHsl.h += utils.getHarmonyAngle('analogous' as typeof randomHarmony) - offset
            }
         } else {
            secondaryHsl.h += angle + offset
            tertiaryHsl.h -= angle - offset
         }
      } else {
         tertiaryHsl.h += this.secondary.shade[500].hsl.h + 30 + offset
      }

      const sl = utils.getRandomHslByPaletteStyle(this.metaData.paletteStyle)
      // secondaryHsl.s = sl.s
      // secondaryHsl.l = sl.l

      tertiaryHsl.s = sl.s
      // tertiaryHsl.l = sl.l

      return { secondaryHsl, tertiaryHsl }
   }

   setTertiary = () => {
      const { secondaryHsl, tertiaryHsl } = this._getAccentHsls()
      const tertiary = new Color({ hsl: tertiaryHsl })
      return this.setSecondary()
      // return new PaletteColor({ color: tertiary, role: 'tertiary' })
   }

   setSecondary = () => {
      let AAhex
      let accentColor = new Color({ hex: AAhex })
      const validHueAngles = [30, -30, 210, 150, 120, -120, 180]
      const maxOffset = 10
      const randAdjacent = Math.floor(Math.random() * 2) === 0 ? -30 : 30
      const primaryHue = this.primary.shade[500].hsl.h
      let inRange = false
      let nonce = 0
      const offset = Math.floor(Math.random() * maxOffset)
      const secondaryHueDirection = Math.floor(Math.random() * 2) === 0 ? -1 : 1
      while (!inRange) {
         nonce++
         AAhex = getRandomAAColor(this.primary.shade[500].hex)
         accentColor = new Color({ hex: AAhex })
         const randomHueRange = Math.floor(Math.random() * validHueAngles.length)
         const hue = secondaryHueDirection > 0 ? primaryHue + validHueAngles[randomHueRange] : primaryHue - validHueAngles[randomHueRange]
         if (accentColor.hsl.h > hue - offset && accentColor.hsl.h < hue + offset) {
            inRange = true
         }
         if (nonce === 500) {
            accentColor = new Color({ hsl: { h: this.primary.shade[500].hsl.h + randAdjacent, s: 0.5, l: 0.5 } })
            inRange = true
         }
      }

      let secondaryColor = new PaletteColor({ color: accentColor })
      let { h, s } = secondaryColor.shade[500].hsl
      let primaryLum = this.primary.shade[500].hsl.l
      let primarySat = this.primary.shade[500].hsl.s
      let newColor = new Color({ hsl: { h, s: primarySat, l: primaryLum } })
      secondaryColor = new PaletteColor({ color: newColor, role: 'secondary' })

      return secondaryColor
   }

   // setTertiary = () => {
   //    let tertiary = new Color({ hex: getRandomAAColor(this.primary.shade[500].hex) })
   //    let { h, s } = tertiary.hsl
   //    let primaryLum = this.primary.shade[500].hsl.l
   //    let newColor = new Color({ hsl: { h, s, l: primaryLum } })
   //    tertiary = new Color({ hsl: newColor.hsl })
   //    let tertiaryColor = new PaletteColor({ color: tertiary, role: 'tertiary' })
   //    return tertiaryColor
   // }

   setSemanticColors = () => {
      let primaryHue = this.primary.shade[500].hsl.h
      let colorName = utils.getColorNameByHue(primaryHue)
      let randOffset = this.randomInRange(-10, 10)
      let randSat = +this.randomInRange(0.7, 1).toFixed(2)
      let randLum = +this.randomInRange(0.5, 0.7).toFixed(2)
      let randWarningHue = this.randomInRange(15, 70)
      let randInfoHue = this.randomInRange(200, 270)
      if (colorName === 'green' || colorName == 'green-blue' || colorName == 'yellow-green') {
         this.success = new PaletteColor({
            role: 'success',
            color: new Color({ hsl: { h: primaryHue, s: randSat, l: randLum } }),
         })
      } else {
         let successHsl = { h: (randOffset + 120) % 360, s: randSat, l: randLum }
         this.success = new PaletteColor({
            role: 'success',
            color: new Color({ hsl: successHsl }),
         })
      }
      let warningHsl = { h: randWarningHue, s: randSat, l: randLum }
      let dangerHsl = { h: (randOffset + 0) % 360, s: randSat, l: randLum }
      let infoHsl = { h: randInfoHue, s: randSat, l: randLum }
      this.warning = new PaletteColor({
         role: 'warning',
         color: new Color({ hsl: warningHsl }),
      })
      this.danger = new PaletteColor({
         role: 'danger',
         color: new Color({ hsl: dangerHsl }),
      })
      this.info = new PaletteColor({
         role: 'info',
         color: new Color({ hsl: infoHsl }),
      })
   }

   randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
   }

   setNeutral = (theme: 'light' | 'dark' = this.theme) => {
      const neutralHsl = utils.getRandomHslByPaletteStyle(this.metaData.paletteStyle)
      const randomHarmonyTitle = utils.getRandomHarmonyTitle()
      const isOfseet = Math.floor(Math.random() * 2) === 0 ? true : false
      let offset = isOfseet ? this.randomInRange(-10, 10) : 0
      const primaryHue = this.primary.shade[500].hsl.h
      let harmonyAngle = utils.getHarmonyAngle(randomHarmonyTitle)
      neutralHsl.h = (primaryHue + harmonyAngle + offset) % 360
      neutralHsl.l = +this.randomInRange(0.95, 1).toFixed(2)
      if (theme === 'dark') {
         neutralHsl.l = +this.randomInRange(0, 0.15).toFixed(2)
      }
      neutralHsl.s = +this.randomInRange(0, 0.1).toFixed(2)
      return new PaletteColor({
         role: 'neutral',
         color: new Color({ hsl: neutralHsl }),
      })
   }
}

function generateNeutralColor(temperature: string) {
   var color = ''
   var temp = temperature.toLowerCase()
   var h, s, l
   const random = +(Math.random() * (1 - 0.8) + 0.8).toFixed(2)
   //  random lum between .9 and 1
   const randLum = +(Math.random() * (1 - 0.9) + 0.9).toFixed(2)

   // random number between 0 and and .3
   const randomSat = +(Math.random() * (0.2 - 0) + 0).toFixed(2)
   if (temp === 'warm') {
      h = Math.floor(Math.random() * (60 - 0) + 0)
      s = randomSat
      l = randLum
   } else if (temp === 'cool') {
      h = Math.floor(Math.random() * (240 - 180) + 180)
      s = randomSat
      l = randLum
   } else if (temp === 'white') {
      h = 0
      s = 0
      l = 1
   } else if (temp === 'black') {
      h = 0
      s = 0
      l = 0
   }
   color = 'hsl(' + h + ', ' + s + '%, ' + l + '%)'

   return { h, s, l } as hsl
}

const getContrastRatio = (color1: ColorType, color2: ColorType) => {
   const color1Rgb: RgbColor = [color1.rgb.r, color1.rgb.g, color1.rgb.b]
   const color2Rgb: RgbColor = [color2.rgb.r, color2.rgb.g, color2.rgb.b]
   const contrast = ratio(color1Rgb, color2Rgb)
   return contrast
}
