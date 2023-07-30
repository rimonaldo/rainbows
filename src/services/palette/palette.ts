import { ColorType } from '../color/type'
import { Color, hsl } from '../color'
import { PaletteMetaDataType } from './PaletteType'
import { getRandomAAColor } from 'accessible-colors'
import { RgbColor } from 'contrast-ratio'
import ratio from 'contrast-ratio'
import { guid } from '../utils'
import { HarmonyTitle } from '../harmony'
import { paletteUtils as utils } from './paletteUtils'
import { GetColorName } from 'hex-color-to-color-name'

export class Palette implements PaletteType {
   colors: Record<PaletteColorRole, PaletteColorType> = {
      primary: new PaletteColor({ role: 'primary' }),
      secondary: new PaletteColor({ role: 'secondary' }),
      tertiary: new PaletteColor({ role: 'tertiary' }),
      neutral: new PaletteColor({ role: 'neutral' }),
      success: new PaletteColor({ role: 'success' }),
      warning: new PaletteColor({ role: 'warning' }),
      danger: new PaletteColor({ role: 'danger' }),
      info: new PaletteColor({ role: 'info' }),

      // Add other roles if needed
   }

   primary: PaletteColorType = new PaletteColor({ role: 'primary' })
   secondary: PaletteColorType = new PaletteColor({ role: 'secondary' })
   tertiary: PaletteColorType = new PaletteColor({ role: 'tertiary' })
   neutral: PaletteColorType = new PaletteColor({ role: 'neutral' })
   success: PaletteColorType = new PaletteColor({ role: 'success' })
   warning: PaletteColorType = new PaletteColor({ role: 'warning' })
   danger: PaletteColorType = new PaletteColor({ role: 'danger' })
   info: PaletteColorType = new PaletteColor({ role: 'info' })
   // [key:PaletteColorType]: PaletteColorType
   theme: 'light' | 'dark' = 'light' // light or dark
   temp: 'cool' | 'warm' = 'cool' // warm or cool
   private colorsRank = {
      blue: 2,
      green: 1,
      purple: 1,
      red: 1,
      black: 1,
      orange: 0.5,
      yellow: 0.5,
      pink: 0.5,
      white: 0.2,
      brown: 0.2,
   }

   metaData: PaletteMetaDataType = {
      creationTimeStamp: Date.now(),
      temp: 'cool', // warm or cool
      paletteStyle: 'pastel', // pastel or vibrant or earthy jewel or neutral or monochrome
      theme: 'dark', // light or dark
      tags: [], // passional, calm, energetic, feminane , modern , etc
   }

   private tag = 'tag'
   constructor({
      primary,
      secondary,
      tertiary,
      neutral,
      success,
      warning,
      danger,
      info,
      theme,
      palette,
   }: PaletteConstructorType) {
      if (palette) {
         this.primary = palette.primary || this.primary
         this.secondary = palette.secondary || this.secondary
         this.tertiary = palette.tertiary || this.tertiary
         this.neutral = palette.neutral || this.neutral
         this.success = palette.success || this.success
         this.warning = palette.warning || this.warning
         this.danger = palette.danger || this.danger
         this.info = palette.info || this.info
         this.theme = palette.theme || this.theme
         // this.temp = palette.temp || this.temp
      } else this.primary = primary || this.primary
      this.secondary = secondary || this.setAccent('secondary')
      this.tertiary = tertiary || this.setAccent('tertiary')
      this.neutral = neutral || this.setNeutral(theme)

      this.temp = this.setTempByColor(this.primary.shade[500])
      this.setSemanticColors()
      this.info = info || this.info
      this.success = success || this.success
      this.warning = warning || this.warning
      this.danger = danger || this.danger
      this.theme = theme || this.theme
   }

   private getAngleFromHarmonyTitle(harmonyTitle: HarmonyTitle) {
      switch (harmonyTitle) {
         case 'complementary':
            return 180
         case 'analogous':
            return 30
         case 'triadic':
            return 120
         case 'monochromatic':
            return 0
         default:
            return 0
      }
   }
   private getRandHarmonyTitle() {
      const harmonyTitles = ['complementary', 'analogous', 'triadic', 'monochromatic']
      const randIndex = Math.floor(Math.random() * harmonyTitles.length)
      return harmonyTitles[randIndex] as HarmonyTitle
   }

   genBrandColors(temp: number = 1, fluidity: number = 1, style: 'neon' | 'pastel' | 'earth' | 'jewel' = 'pastel') {
      // Extract color properties
      const { primary, secondary, tertiary } = this
      const brandColors = [primary, secondary, tertiary]

      // Filter unlocked and locked colors
      const unlockedColors = brandColors.filter(color => !color.isLocked)
      const anchors = brandColors.filter(color => color.isLocked)

      // calculate unlocked colors based on anchors:
      // 1. if there is only one anchor, generate two colors
      // 2. if there are two anchors, generate one color
      // 3. if there are no anchors, generate three colors

      // Generate random styles list
      const randStylesList = this._generateRandomStylesList(unlockedColors.length)
      // console.log(randStylesList)

      // Calculate average hue and points
      const avgHue = this._calculateAvgHue(temp as 1 | 2 | 3)
      const overallDist = this.getAngleFromHarmonyTitle(this.getRandHarmonyTitle())
      const distfromAvg = overallDist * fluidity
      let generatedHues = this._separateAvgHue(avgHue, distfromAvg, unlockedColors.length)
      generatedHues = [avgHue, generatedHues[0], generatedHues[1]]

      // Update unlocked colors with new HSL values
      this._updateUnlockedColors(unlockedColors, randStylesList, generatedHues)

      // Return average hue and points
      // return { avgHue, pts: generatedHues }
   }

   _calculateAvgHue(temp: 1 | 2 | 3) {
      return this._randHueInTempRange(temp)
   }

   _separateAvgHue(avgHue: number, distfromAvg: number, length: number) {
      return this._sepetareAvgToTwoPoints(avgHue, distfromAvg, length)
   }

   _generateRandomStylesList(length: number) {
      const styles = ['neon', 'pastel', 'earth', 'jewel', 'jewel', 'jewel']
      const randStyles = []
      for (let i = 0; i < length; i++) {
         const randIndex = Math.floor(Math.random() * styles.length)
         randStyles.push(styles[randIndex])
      }
      return randStyles
   }

   _calculateHSL(randStyle: string, h: number) {
      const { s, l } = this._randSatLumByPaletteStyle(randStyle)
      return { h, s, l }
   }

   _updateColors(colorRole: PaletteColorRole, hsl: { h: number; s: number; l: number }) {
      this.colors[colorRole] = new PaletteColor({
         role: colorRole,
         color: new Color({ hsl }),
      })
   }

   private _updateUnlockedColors(unlockedColors: PaletteColorType[], randStylesList: string[], pts: number[]) {
      unlockedColors.forEach((color, i) => {
         const randStyle = randStylesList[i]
         const hsl = this._calculateHSL(randStyle, pts[i])
         let colorRole = color.role as PaletteColorRole
         this._updateColors(colorRole, hsl)
      })

      this.primary = this.colors.primary
      this.secondary = this.colors.secondary
      this.tertiary = this.colors.tertiary
      // console.log(this.tertiary)
   }

   private _randSatLumByPaletteStyle = (colorStyleKey: keyof typeof paletteStyle) => {
      const { sat, lum } = paletteStyle[colorStyleKey]
      const s = +(Math.random() * (sat.max - sat.min) + sat.min).toFixed(2)
      const l = +(Math.random() * (lum.max - lum.min) + lum.min).toFixed(2)
      return { s, l }
   }

   private _randHueInTempRange = (temp: 1 | 2 | 3) => {
      const range1 = [180, 270]
      const range2 = [[60, 180]]
      const ranges3 = [
         [0, 60],
         [300, 360],
      ]

      const rand = (min: number, max: number) => +Math.random() * (max - min) + min

      if (temp === 1) {
         return +rand(range1[0], range1[1]).toFixed(0)
      } else if (temp === 2) {
         const range = range2[Math.floor(Math.random() * range2.length)]
         return +rand(range[0], range[1]).toFixed(0)
      } else if (temp === 3) {
         const range = ranges3[Math.floor(Math.random() * ranges3.length)]
         return +rand(range[0], range[1]).toFixed(0)
      }

      return 0
   }

   private _sepetareAvgToTwoPoints = (avg: number, distance: number, amount = 2) => {
      let ratio = [1, 1]

      if (amount === 3) {
         ratio = [1, 2]
      }

      const sum = ratio.reduce((a, b) => a + b)
      const ratio1 = ratio[0] / sum
      const ratio2 = ratio[1] / sum

      // if point is over 360, then substract 360

      let pt1 = avg - distance * ratio1
      let pt2 = avg + distance * ratio2

      if (pt1 < 0) {
         pt1 = 360 + pt1
      }

      if (pt2 > 360) {
         pt2 = pt2 - 360
      }

      return [+pt1.toFixed(0), +pt2.toFixed(0)]
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

   setPaletteColor = (color: PaletteColorType, role: PaletteColorRole) => {
      this[role] = color
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
         let anglesDiff = Math.abs(angle - this.primary.shade[500].hsl.h)
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

   setAccent = (role: 'secondary' | 'tertiary') => {
      const { secondaryHsl, tertiaryHsl } = this._getAccentHsls()
      const secondary = new Color({ hsl: secondaryHsl })
      const tertiary = new Color({ hsl: tertiaryHsl })
      const selectedRole = role === 'secondary' ? secondary : tertiary
      return new PaletteColor({ color: selectedRole, role })
   }

   _getAccent = () => {
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
         const hue =
            secondaryHueDirection > 0
               ? primaryHue + validHueAngles[randomHueRange]
               : primaryHue - validHueAngles[randomHueRange]
         if (accentColor.hsl.h > hue - offset && accentColor.hsl.h < hue + offset) {
            inRange = true
         }
         if (nonce === 500) {
            accentColor = new Color({ hsl: { h: this.primary.shade[500].hsl.h + randAdjacent, s: 0.5, l: 0.5 } })
            inRange = true
         }
      }

      let secondaryColor = new PaletteColor({ color: accentColor, role: 'secondary' })
      let { h, s } = secondaryColor.shade[500].hsl
      let primaryLum = this.primary.shade[500].hsl.l
      let primarySat = this.primary.shade[500].hsl.s
      let newColor = new Color({ hsl: { h, s: primarySat, l: primaryLum } })
      secondaryColor = new PaletteColor({ color: newColor, role: 'secondary' })

      return secondaryColor
   }

   getPtsObj = () => {
      const primaryHue = this.primary.color.hsl.h
      const secondaryHue = this.secondary.color.hsl.h
      const tertiaryHue = this.tertiary.color.hsl.h
      let object = {
         avgHue: this.getAvgHue(),
         pts: [primaryHue, secondaryHue, tertiaryHue],
      }
      return object
   }
   private getAvgHue = () => {
      let hueSum = this.primary.color.hsl.h + this.secondary.color.hsl.h + this.tertiary.color.hsl.h
      return hueSum / 3
   }

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

   setColorLock = (colorRole: PaletteColorRole) => {
      let colorToSetLock = this.getColorByRole(colorRole)
      colorToSetLock.setLock(colorToSetLock.isLocked)

      this[`${colorRole}`] = colorToSetLock
      // console.log(this[`${colorRole}`])
   }

   private getColorByRole = (role: PaletteColorRole) => {
      return this.colors[role]
   }
}
type PtsObj = { avgHue: number; pts: number[] }

export interface PaletteType {
   // colors: object
   _id?: string
   primary: PaletteColorType
   secondary: PaletteColorType
   tertiary: PaletteColorType
   neutral: PaletteColorType
   info: PaletteColorType
   warning: PaletteColorType
   danger: PaletteColorType
   success: PaletteColorType
   metaData: PaletteMetaDataType
   theme: 'light' | 'dark'
   genBrandColors: (temp: number, fluidity: number, style: 'neon' | 'pastel' | 'earth' | 'jewel') => void
   setPaletteColor: (color: PaletteColorType, role: PaletteColorRole) => void
   getPtsObj: () => PtsObj
   setColorLock: (colorRole: PaletteColorRole) => void
}

export class PaletteColor implements PaletteColorType {
   _id: string
   role: string
   color: ColorType
   name: string = ''
   shade: ColorShadeType = new BrandShader({ color: new Color({}) })
   isLocked: boolean = false
   style: 'neon' | 'pastel' | 'earth' | 'jewel' = 'pastel'
   constructor({ role, color, _id }: { role: PaletteColorRole; color?: ColorType; hex?: string; _id?: string }) {
      this.role = role
      this.color = color || new Color({})
      this._id = _id || guid()
      this.shade[500] = this.color
      this.shade.genShades()
      this.isLocked = false
      this.name = GetColorName(this.color.hex)
   }

   setLock = () => {
      this.isLocked = !this.isLocked
   }

   genShades = () => {
      this.shade.genShades()
   }

   setStyle = (style: 'neon' | 'pastel' | 'earth' | 'jewel') => {
      this.style = style
   }
}

export interface PaletteColorType {
   role: string
   name: string
   shade: ColorShadeType
   isLocked: boolean
   color: ColorType
   setLock: (lock: boolean) => void
}

type ColorStyleRangeType = {
   sat: { min: number; max: number }
   lum: { min: number; max: number }
}

const paletteStyle: { [key: string]: ColorStyleRangeType } = {
   pastel: { sat: { min: 0.3, max: 0.45 }, lum: { min: 0.8, max: 0.9 } },
   neutral: { sat: { min: 0.05, max: 0.15 }, lum: { min: 0.75, max: 0.9 } },
   neon: { sat: { min: 0.95, max: 1 }, lum: { min: 0.6, max: 0.7 } },
   earth: { sat: { min: 0.2, max: 0.35 }, lum: { min: 0.2, max: 0.4 } },
   jewel: { sat: { min: 0.5, max: 0.65 }, lum: { min: 0.5, max: 0.7 } },
}

// TYPES
// .................................................
// TYPES

export interface ColorShadeType {
   [key: number]: ColorType
   genShades: () => void
}

// CLASSES
// ..............................................
//

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
   palette?: PaletteType
}

export class BrandShader implements ColorShadeType {
   [key: number]: ColorType

   constructor({ color = new Color({}) }: { color: ColorType }) {
      this[500] = color
      this.genShades()
   }

   genShades = () => {
      this[100] = this.genShade100()
      this[900] = this.genShade900()

      this[300] = this.genMidShade(this[100], this[500])
      this[200] = this.genMidShade(this[100], this[300])
      this[400] = this.genMidShade(this[300], this[500])

      this[700] = this.genMidShade(this[500], this[900])
      this[800] = this.genMidShade(this[700], this[900])
      this[600] = this.genMidShade(this[500], this[700])
   }

   genShade100 = () => {
      const initialHue = this[500].hsl.h
      const randomSat = this._randomNumInRange(0.1, 0.2)
      const randomLum = this._randomNumInRange(0.95, 0.97)
      const shade100Hsl = { h: initialHue, s: randomSat, l: randomLum }
      return new Color({ hsl: shade100Hsl })
   }

   genShade900 = () => {
      const initialHue = this[500].hsl.h
      const sat = Math.min(0.9, this[500].hsl.s * 1.25)
      const lum = Math.max(this[500].hsl.l * 0.75, 0.1)
      const shade900Hsl = { h: initialHue, s: sat, l: lum }
      return new Color({ hsl: shade900Hsl })
   }

   genMidShade = (shade1: ColorType, shade2: ColorType) => {
      const initialHue = this[500].hsl.h
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
}

export class SemanticShader implements ColorShadeType {
   [key: number]: ColorType
   // get genShades()  from super

   constructor({ color = new Color({}) }: { color: ColorType }) {
      this[500] = color
      this.genShades()
   }

   genShades = () => {
      this[100] = this.genShade100()
      this[900] = this.genShade900()

      this[300] = this.genMidShade(this[100], this[500])
      this[200] = this.genMidShade(this[100], this[300])
      this[400] = this.genMidShade(this[300], this[500])

      this[700] = this.genMidShade(this[500], this[900])
      this[800] = this.genMidShade(this[700], this[900])
      this[600] = this.genMidShade(this[500], this[700])
   }

   genShade100 = () => {
      const initialHue = this[500].hsl.h
      const randomSat = this._randomNumInRange(0.1, 0.2)
      const randomLum = this._randomNumInRange(0.95, 0.97)
      const shade100Hsl = { h: initialHue, s: randomSat, l: randomLum }
      return new Color({ hsl: shade100Hsl })
   }

   genShade900 = () => {
      const initialHue = this[500].hsl.h
      const sat = Math.min(0.9, this[500].hsl.s * 1.25)
      const lum = Math.max(this[500].hsl.l * 0.75, 0.1)
      const shade900Hsl = { h: initialHue, s: sat, l: lum }
      return new Color({ hsl: shade900Hsl })
   }

   genMidShade = (shade1: ColorType, shade2: ColorType) => {
      const initialHue = this[500].hsl.h
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
}

export class NeutralsShader implements ColorShadeType {
   [key: number]: ColorType

   private offset = 0.1

   constructor({ color = new Color({}) }: { color: ColorType }) {
      this[500] = color
      this.genShades()
   }

   genShades = () => {
      this[100] = this.genShade100()
      this[900] = this.genShade900()

      this[300] = this.genMidShade(this[100], this[500])
      this[200] = this.genMidShade(this[100], this[300])
      this[400] = this.genMidShade(this[300], this[500])

      this[700] = this.genMidShade(this[500], this[900])
      this[800] = this.genMidShade(this[700], this[900])
      this[600] = this.genMidShade(this[500], this[700])
   }

   private genShade100 = () => {
      const initialHue = this[500].hsl.h
      const randomSat = this._randomNumInRange(0.1, 0.2)
      const randomLum = this._randomNumInRange(0.95, 0.97)
      const shade100Hsl = { h: initialHue, s: randomSat, l: randomLum }
      return new Color({ hsl: shade100Hsl })
   }

   private genShade900 = () => {
      const initialHue = this[500].hsl.h
      const sat = Math.min(0.9, this[500].hsl.s * 1.25)
      const lum = Math.max(this[500].hsl.l * 0.75, 0.1)
      const shade900Hsl = { h: initialHue, s: sat, l: lum }
      return new Color({ hsl: shade900Hsl })
   }

   private genMidShade = (shade1: ColorType, shade2: ColorType) => {
      const initialHue = this[500].hsl.h
      const hsl1 = shade1.hsl
      const hsl2 = shade2.hsl
      const midS = (hsl1.s + hsl2.s) / 2
      const midL = (hsl1.l + hsl2.l) / 2
      const newHsl = { h: initialHue, s: midS, l: midL }
      return new Color({ hsl: newHsl })
   }

   private _randomNumInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
   }
}

export type PaletteColorRole =
   | 'primary'
   | 'secondary'
   | 'tertiary'
   | 'warning'
   | 'success'
   | 'info'
   | 'danger'
   | 'neutral'

export class BrandColor extends PaletteColor {
   constructor({ role, color, hex, _id }: { role: PaletteColorRole; color: ColorType; hex?: string; _id?: string }) {
      super({ role, color, hex, _id })
      this.shade = new BrandShader({ color: this.color || new Color({ hex: hex }) })
   }

   toggleLock = () => {
      this.isLocked = !this.isLocked
   }

   genShades = () => {
      this.shade.genShades()
   }
}
