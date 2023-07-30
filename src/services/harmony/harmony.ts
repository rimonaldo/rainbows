// import { ColorType } from '../../types'
// import { HarmonyTitle } from './type'
// // import { hslToRgb, rgbToHex } from '../color/utils'
// import { SchemeType } from './type'
// import { Color } from '.././color.service'
// import { HarmonyType } from './type'
// export class Harmony implements HarmonyType {
//    mainColor: ColorType
//    complementary: SchemeType
//    monocromatic: SchemeType
//    triadic: SchemeType
//    analogous: SchemeType
//    constructor(mainColor: ColorType) {
//       this.mainColor = mainColor
//       this.monocromatic = this.getMonoColors()
//       this.triadic = this.getTriadColors()
//       this.analogous = this.getAnalogColors()
//       this.complementary = this.getCompColor()
//    }
//    getMonoColors(): SchemeType {
//       return {
//          title: HarmonyTitle.Monochromatic,
//          mainColor: this.mainColor,
//          colors: this._mapHslstoColors(this.mainColor.getMonoHsls()),
//       }
//    }
//    getTriadColors(): SchemeType {
//       return {
//          title: HarmonyTitle.Triadic,
//          mainColor: this.mainColor,
//          colors: this._mapHslstoColors(this.mainColor.getTriadHsls()),
//       }
//    }

//    getCompColor(): SchemeType {
//       return {
//          title: HarmonyTitle.Complementary,
//          mainColor: this.mainColor,
//          colors: this._mapHslstoColors(this.mainColor.getCompHsls()),
//       }
//    }
//    getAnalogColors(): SchemeType {
//       return {
//          title: HarmonyTitle.Analogous,
//          mainColor: this.mainColor,
//          colors: this._mapHslstoColors(this.mainColor.getAnalogHsls()),
//       }
//    }
//    getHarmonyByTitle(title: HarmonyTitle): SchemeType {
//       switch (title) {
//          case HarmonyTitle.Monochromatic:
//             return this.getMonoColors()
//          case HarmonyTitle.Triadic:
//             return this.getTriadColors()
//          case HarmonyTitle.Complementary:
//             return this.getCompColor()
//          case HarmonyTitle.Analogous:
//             return this.getAnalogColors()
//          default:
//             return this.getMonoColors()
//       }
//    }

//    _mapHslstoColors(hsls: { h: number; s: number; l: number }[]): ColorType[] {
//       return hsls.map(hsl => new Color({ hsl }))
//    }
// }
