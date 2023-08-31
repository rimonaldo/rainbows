import { PaletteColorStyle, PaletteColorRole, hex, ColorStyleType } from '../types'
import { PaletteType, MiniPaletteType, HarmonyTitle, TemplateType } from '../types'
import { PaletteColorType, MiniPaletteColorType } from '../types'
import { MiniPaletteColor } from './PaletteColor.service'
import { PaletteColor } from './PaletteColor.service'
import httpService from '../API/http.service'
import { ColorType } from '../types'
import { getRandomAAColor } from 'accessible-colors'
import { guid } from './utils'
import { get } from 'lodash'
import { utilService } from './util.service'
import { paletteStyle } from './ColorStyle.service'
export class MiniPalette implements MiniPaletteType {
   _id: string
   primary: MiniPaletteColorType
   secondary: MiniPaletteColorType
   tertiary: MiniPaletteColorType
   info: MiniPaletteColorType
   success: MiniPaletteColorType
   warning: MiniPaletteColorType
   danger: MiniPaletteColorType
   neutral: MiniPaletteColorType

   constructor({ palette }: { palette?: PaletteType }) {
      if (palette) {
         this.primary = new MiniPaletteColor(palette.primary)
         this.secondary = new MiniPaletteColor(palette.secondary)
         this.tertiary = new MiniPaletteColor(palette.tertiary)
         this.info = new MiniPaletteColor(palette.info)
         this.success = new MiniPaletteColor(palette.success)
         this.warning = new MiniPaletteColor(palette.warning)
         this.danger = new MiniPaletteColor(palette.danger)
         this.neutral = new MiniPaletteColor(palette.neutral)
      } else {
         this.primary = new MiniPaletteColor({ role: 'primary' })
         this.secondary = new MiniPaletteColor({ role: 'secondary' })
         this.tertiary = new MiniPaletteColor({ role: 'tertiary' })
         this.info = new MiniPaletteColor({ role: 'info' })
         this.success = new MiniPaletteColor({ role: 'success' })
         this.warning = new MiniPaletteColor({ role: 'warning' })
         this.danger = new MiniPaletteColor({ role: 'danger' })
         this.neutral = new MiniPaletteColor({ role: 'neutral' })
      }
      this._id = guid()
   }
}

export class Palette implements PaletteType {
   _id: string
   primary: PaletteColorType
   secondary: PaletteColorType
   tertiary: PaletteColorType
   info: PaletteColorType
   success: PaletteColorType
   warning: PaletteColorType
   danger: PaletteColorType
   neutral: PaletteColorType
   neutralBright: PaletteColorType
   neutralDark: PaletteColorType
   template: TemplateType
   templates: TemplateType[]

   constructor(miniPalette: MiniPaletteType = new MiniPalette({})) {
      if (miniPalette._id) {
         this._id = miniPalette._id
         this.primary = new PaletteColor({ hex: miniPalette.primary.hex, role: 'primary' })
         this.secondary = new PaletteColor({ hex: miniPalette.secondary.hex, role: 'secondary' })
         this.tertiary = new PaletteColor({ hex: miniPalette.tertiary.hex, role: 'tertiary' })
         this.success = this.genSuccessColor()
         this.info = this.genInfoColor()
         this.warning = this.genWarningColor()
         this.danger = this.genDangerColor()
         this.neutral = new PaletteColor({ hex: '#ffffff', role: 'neutral' })
         this.neutralBright = this.genNeutral('bright')
         this.neutralDark = this.genNeutral('dark')
      } else {
         this._id = guid()
         this.primary = new PaletteColor({ hex: '#000000', role: 'primary' })
         this.secondary = new PaletteColor({ hex: '#000000', role: 'secondary' })
         this.tertiary = new PaletteColor({ hex: '#000000', role: 'tertiary' })
         this.info = this.genInfoColor()
         this.success = this.genSuccessColor()
         this.warning = this.genWarningColor()
         this.danger = this.genDangerColor()
         this.neutral = new PaletteColor({ hex: '#000000', role: 'neutral' })
         this.neutralBright = this.genNeutral('bright')
         this.neutralDark = this.genNeutral('dark')
      }

      const randStyleList = this._generateRandomStylesList(3)
      const random = {
         name: 'random',
         primary: this._generateRandomStylesList(3)[0],
         secondary: this._generateRandomStylesList(1)[0],
         tertiary: this._generateRandomStylesList(1)[0],
      }

      const contrast = {
         name: 'contrast',
         primary: 'earth',
         secondary: 'pastel',
         tertiary: 'jewel',
      }

      const bright = {
         name: 'bright',
         primary: 'jewel',
         secondary: 'earth',
         tertiary: 'pastel',
      }

      const oceanic = {
         name: 'oceanic',
         primary: 'pastel',
         secondary: 'jewel',
         tertiary: 'earth',
      }
      const etherealDream = {
         name: 'ethereal dream',
         primary: 'mystical',
         secondary: 'pastel',
         tertiary: 'neutral',
      }

      const retroPop = {
         name: 'retro pop',
         primary: 'vintage',
         secondary: 'neon',
         tertiary: 'earth',
      }

      const sugaryDelight = {
         name: 'sugary delight',
         primary: 'sorbet',
         secondary: 'candy',
         tertiary: 'pastel',
      }

      const magicalDusk = {
         name: 'magical dusk',
         primary: 'mystical',
         secondary: 'midnight',
         tertiary: 'jewel',
      }

      const naturesGlow = {
         name: "nature's glow",
         primary: 'sunrise',
         secondary: 'earth',
         tertiary: 'jewel',
      }

      const darkElegance = {
         name: 'dark elegance',
         primary: 'midnight',
         secondary: 'jewel',
         tertiary: 'neutral',
      }

      const tropicalBurst = {
         name: 'tropical burst',
         primary: 'candy',
         secondary: 'neon',
         tertiary: 'sorbet',
      }

      const historicCharm = {
         name: 'historic charm',
         primary: 'vintage',
         secondary: 'earth',
         tertiary: 'neutral',
      }

      this.templates = [
         random,
         contrast,
         bright,
         oceanic,
         etherealDream,
         retroPop,
         naturesGlow,
         sugaryDelight,
         darkElegance,
         tropicalBurst,
         historicCharm,
         magicalDusk,
      ]
      this.template = random
   }

   setActiveTemplate(template: TemplateType) {
      this.template = template
   }

   addTemplate(template: TemplateType) {
      this.templates.push(template)
   }

   setStylesTemplate(template: TemplateType) {
      this.template = template
   }

   genNeutral(type: 'bright' | 'dark') {
      if (type === 'bright') {
         return new PaletteColor({ hex: this.primary.shade[100].hex, role: 'neutralBright' })
      }
      return new PaletteColor({ hex: this.secondary.shade[900].hex, role: 'neutralDark' })
   }

   genBrandColors(temp: 1 | 2 | 3 = 1, fluidity: 1 | 2 | 3 = 1, stylesTemplate?: TemplateType) {
      // Extract color properties
      const { primary, secondary, tertiary } = this
      const brandColors = [primary, secondary, tertiary]

      // Filter unlocked and locked colors

      // calculate unlocked colors based on anchors:

      // 1. if there is only one anchor, generate two colors
      // 2. if there are two anchors, generate one color
      // 3. if there are no anchors, generate three colors
      const unlockedColors = brandColors.filter(color => !color.isLocked)
      let template
      if (stylesTemplate) {
         if (stylesTemplate.name !== 'random') {
            this.setStylesTemplate(stylesTemplate)
         } else {
            const randStylesList = this._generateRandomStylesList(unlockedColors.length)
            template = {
               name: 'random',
               primary: randStylesList[0],
               secondary: randStylesList[1],
               tertiary: randStylesList[2],
            }
            this.setStylesTemplate(template)
         }
      }

      const templateStyleList = [this.template.primary, this.template.secondary, this.template.tertiary]
      // console.log(randStylesList)

      // Calculate average hue and points
      const avgHue = this._calculateAvgHue(temp as 1 | 2 | 3)
      const overallDist = this.getAngleFromHarmonyTitle(this.getRandHarmonyTitle())
      const distfromAvg = overallDist * fluidity
      let generatedHues = this._separateAvgHue(avgHue, distfromAvg, unlockedColors.length)
      generatedHues = [avgHue, generatedHues[0], generatedHues[1]]
      const aahex = getRandomAAColor(primary.hex)
      const aaColor = new PaletteColor({ hex: aahex, role: 'secondary' })

      // Update unlocked colors with new HSL values

      this._updateUnlockedColors([primary, secondary, tertiary], templateStyleList, generatedHues)
   }

   setColorLock(role: PaletteColorRole, newIsLocked: boolean) {
      this[role].isLocked = newIsLocked
   }
   setColor(paletteColor: PaletteColorType) {
      const { role } = paletteColor
      this[role] = paletteColor
   }

   private _updateUnlockedColors(unlockedColors: PaletteColorType[], randStylesList: string[], pts: number[]) {
      console.log('unlockedColors:', unlockedColors, 'randStylesList:', randStylesList, 'pts:', pts)

      unlockedColors.forEach((color, i) => {
         if (!color.isLocked) {
            const randStyle = randStylesList[i]
            const hsl = this._calculateHSL(randStyle, pts[i])
            this[color.role] = new PaletteColor({ hsl, role: color.role, style: randStyle as PaletteColorStyle })
         }
      })

      // this.primary = this.colors.primary
      // this.secondary = this.colors.secondary
      // this.tertiary = this.colors.tertiary
      // console.log(this.tertiary)
   }

   _calculateHSL(randStyle: string, h: number) {
      const { s, l } = this._randSatLumByPaletteStyle(randStyle)
      return { h, s, l }
   }

   private _randSatLumByPaletteStyle = (colorStyleKey: keyof typeof paletteStyle) => {
      const { sat, lum } = paletteStyle[colorStyleKey]
      const randSat = +this.randomInRange(sat.min, sat.max)
      const randLum = this.randomInRange(lum.min, lum.max)
      // console.log('randLum:', +randLum.toFixed(2), 'min lum:', lum.min, 'max lum:', lum.max)

      return { s: randSat, l: randLum }
   }

   _separateAvgHue(avgHue: number, distfromAvg: number, length: number) {
      return this._sepetareAvgToTwoPoints(avgHue, distfromAvg, length)
   }

   private _sepetareAvgToTwoPoints = (avg: number, distance: number, amount = 3) => {
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

   private getRandHarmonyTitle() {
      const harmonyTitles = [
         'complementary',
         'analogous',
         'triadic',
         'monochromatic',
         'split-complementary',
         'square',
         'tetradic',
         'rectangle',
         'compound',
      ]
      const randIndex = Math.floor(Math.random() * harmonyTitles.length)
      const randomHarmonyTitle = harmonyTitles[randIndex]
      console.log('randomHarmonyTitle:', randomHarmonyTitle)

      return randomHarmonyTitle as HarmonyTitle
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
         case 'split-complementary':
            return 150 // or 210
         case 'square':
            return 90
         case 'tetradic':
            return 90
         case 'rectangle':
            return 60 // This is just an example, you can adjust based on your design needs
         case 'compound':
            return 60
         default:
            return 0
      }
   }

   _generateRandomStylesList(length: number) {
      const styles = ['neon', 'pastel', 'earth', 'jewel']
      const randStyles = []
      for (let i = 0; i < length; i++) {
         const randIndex = Math.floor(Math.random() * styles.length)
         randStyles.push(styles[randIndex])
      }
      return randStyles
   }
   _calculateAvgHue(temp: 1 | 2 | 3) {
      return this._randHueInTempRange(temp)
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

   genSemanticColors() {
      this.info = this.genInfoColor()
      this.success = this.genSuccessColor()
      this.warning = this.genWarningColor()
      this.danger = this.genDangerColor()
   }

   genNeutralColors() {
      this.neutralBright = this.genNeutral('bright')
      this.neutralDark = this.genNeutral('dark')
   }

   genInfoColor() {
      const style = 'jewel'
      const { s, l } = this.success.color.hsl || this._randSatLumByPaletteStyle(style)
      const h = this.getRandomBlueHue()
      return new PaletteColor({ hsl: { h, s, l }, role: 'info' })
   }

   genSuccessColor() {
      const style = 'jewel'
      const { s, l } = this._randSatLumByPaletteStyle(style)

      const h = this.randomInRange(100, 120)
      return new PaletteColor({ hsl: { h, s: s * 1.2, l }, role: 'success' })
   }

   genWarningColor() {
      const style = 'jewel'
      const { s, l } = this.success.color.hsl || this._randSatLumByPaletteStyle(style)
      const h = this.getRandomOrangeHue()
      return new PaletteColor({ hsl: { h, s, l }, role: 'warning' })
   }

   genDangerColor() {
      const style = 'jewel'
      const { s, l } = this.success.color.hsl || this._randSatLumByPaletteStyle(style)
      const h = this.getRandomRedHue()
      return new PaletteColor({ hsl: { h, s, l }, role: 'danger' })
   }

   getRandomBlueHue() {
      return this.randomInRange(220, 240)
   }

   getRandomOrangeHue() {
      return this.randomInRange(37, 40)
   }

   getRandomRedHue() {
      if (this.randomInRange(0, 1) > 0.5) {
         return this.randomInRange(355, 360)
      }
      return this.randomInRange(0, 5)
   }

   getMiniPalette(): MiniPaletteType {
      return new MiniPalette({ palette: this })
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

   randomInRange = (min: number, max: number, toFixed?: number) => {
      if (toFixed) return +(Math.random() * (max - min) + min).toFixed(toFixed)
      return +Math.random() * (max - min) + min
   }

   getRandomTemplate(length: number) {
      const randStylesList = this._generateRandomStylesList(length)
      console.log('randStylesList:', randStylesList)

      const randTemplate = {
         name: 'random',
         primary: randStylesList[0],
         secondary: randStylesList[1],
         tertiary: randStylesList[2],
      }
      return randTemplate
   }
}

export const paletteService = {
   getPalette: async (id: string): Promise<PaletteType> => {
      return (await httpService.get(`palette/${id}`)).data
   },
   addPalette: async (palette: MiniPaletteType): Promise<MiniPaletteType> => {
      return (await httpService.post('palette', palette)).data
   },
   updatePalette: async (id: string, palette: PaletteType): Promise<PaletteType> => {
      return httpService.put(`palettes/${id}`, palette)
   },
   generateBrand: async (
      palette: PaletteType,
      temp: 1 | 2 | 3,
      fludity: 1 | 2 | 3,
      paletteTemplate?: TemplateType
   ): Promise<PaletteType> => {
      return new Promise((resolve, reject) => {
         if (paletteTemplate) {
            if (paletteTemplate.name === 'random') {
            }
         }
         palette.genBrandColors(temp, fludity, palette.template)
         palette.genSemanticColors()
         palette.genNeutralColors()
         resolve(palette)
      })
   },
   generateNeutrals() {},
   genColorByStyle(palette: PaletteType, role: PaletteColorRole, style: ColorStyleType) {
      return palette[role].genByStyle(style)
   },
   getEmptyPalette: (palette?: PaletteType): PaletteType => {
      if (palette) {
         return new Palette(palette.getMiniPalette())
      }
      return new Palette(new MiniPalette({}))
   },
   buildFromMiniPalette: (miniPalette: MiniPaletteType): PaletteType => {
      return new Palette(miniPalette)
   },
   setColorLock: (palette: PaletteType, role: PaletteColorRole, lock: boolean): PaletteType => {
      palette.setColorLock(role, lock)
      return palette
   },
   setColor: (palette: PaletteType, role: PaletteColorRole, hex: hex): PaletteType => {
      palette[role].setColor(hex)
      return palette
   },
   addStyle: (palette: PaletteType, role: PaletteColorRole, style: ColorStyleType): PaletteType => {
      palette[role].addStyle(style)
      return palette
   },
   addTemplate: (palette: PaletteType, template: TemplateType): PaletteType => {
      palette.addTemplate(template)
      return palette
   },
   setActiveTemplate: (palette: PaletteType, template: TemplateType): PaletteType => {
      palette.setActiveTemplate(template)
      return palette
   },
}
