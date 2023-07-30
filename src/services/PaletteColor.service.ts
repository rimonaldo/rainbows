import { PaletteColorType, MiniPaletteColorType, PaletteColorRole } from '../types/PaletteColor'
import { Shader } from './Shade.service'
import { ColorType, MiniPaletteColorShadeType, PaletteColorShadeType } from '../types'
import { hex, rgb, hsl, hsv } from './color'
import { Color } from './color.service'
import { getRandomAAColor } from 'accessible-colors'
import { utilService } from './util.service'
// export class MiniPaletteColor implements MiniPaletteColorType {
//    _id: string
//    role: PaletteColorRole
//    hex: string
//    name: string
//    shade: MiniPaletteColorShadeType

//    constructor(color: ColorType, role: PaletteColorRole) {
//       this._id = ''
//       this.role = role
//       this.hex = color.hex
//       this.name = color.name
//       this.shade = new Shader(color).getMiniShader()
//    }
// }

export class MiniPaletteColor implements MiniPaletteColorType {
   _id: string
   role: PaletteColorRole
   hex: string
   name: string
   shade: MiniPaletteColorShadeType

   constructor({ hex, rgb, hsl, hsv, role }: { hex?: hex; rgb?: rgb; hsl?: hsl; hsv?: hsv; role: PaletteColorRole }) {
      let newColor
      if (hex) {
         newColor = new Color({ hex })
      } else if (rgb) {
         newColor = new Color({ rgb })
      } else if (hsl) {
         newColor = new Color({ hsl })
      } else if (hsv) {
         newColor = new Color({ hsv })
      } else {
         newColor = new Color({ hex: utilService.getRandomHex() })
      }
      this._id = ''
      this.role = role
      this.hex = newColor.hex
      this.name = newColor.name
      this.shade = new Shader(newColor).getMiniShader()
   }
}

// export class PaletteColor extends MiniPaletteColor implements PaletteColorType {
//    color: ColorType
//    shade: PaletteColorShadeType
//    isLocked: boolean = false

//    constructor(color: ColorType, role: PaletteColorRole) {
//       super(color, role)
//       this.color = color
//       this.shade = new Shader(color)
//    }

//    setLock(lock: boolean) {
//       this.isLocked = lock
//    }

//    getMiniPaletteColor(): MiniPaletteColorType {
//       return {
//          _id: this._id,
//          role: this.role,
//          hex: this.hex,
//          name: this.name,
//          shade: this.shade.getMiniShader(),
//       }
//    }
// }

export class PaletteColor extends MiniPaletteColor implements PaletteColorType {
   color: ColorType
   shade: PaletteColorShadeType
   isLocked: boolean = false

   constructor({ hex, rgb, hsl, hsv, role }: { hex?: hex; rgb?: rgb; hsl?: hsl; hsv?: hsv; role: PaletteColorRole }) {
      super({ hex, rgb, hsl, hsv, role })
      this.color = new Color({ hex: this.hex })
      this.shade = new Shader(this.color)
   }

   setLock(lock: boolean) {
      this.isLocked = lock
   }

   getMiniPaletteColor(): MiniPaletteColorType {
      return {
         _id: this._id,
         role: this.role,
         hex: this.hex,
         name: this.name,
         shade: this.shade.getMiniShader(),
      }
   }
}
