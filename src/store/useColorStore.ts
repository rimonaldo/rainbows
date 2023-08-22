// import { create } from 'zustand'
// import { PaletteColorRole, PaletteColorStyle, PaletteType, CustomStyleType } from '../types'
// import { MiniPaletteType, MiniPalette } from '../types/Palette'
// import { paletteService } from '../services/Palette.service'

// type State = {
//    miniPalette: MiniPaletteType | null
//    setColorLock: (palette: PaletteType, role: PaletteColorRole, newLockState: boolean) => void
//    setColor: (palette: PaletteType, role: PaletteColorRole, newHex: string) => void
//    genColorByStyle(palette: PaletteType, role: PaletteColorRole, customStyle: CustomStyleType): void
//    addStyle: (palette: PaletteType, role: PaletteColorRole, style: CustomStyleType) => void
// }

// export const usePaletteStore = create<State>(set => ({
//    miniPalette: null,
//    setColorLock: (palette: PaletteType, role: PaletteColorRole, newLockState: boolean) => {
//       const newPalette = paletteService.setColorLock(palette, role, newLockState)
//       set({ miniPalette: newPalette.getMiniPalette() })
//    },
//    setColor: (palette: PaletteType, role: PaletteColorRole, newHex: string) => {
//       const newPalette = paletteService.setColor(palette, role, newHex)
//       set({ miniPalette: newPalette.getMiniPalette() })
//    },

//    genColorByStyle(palette: PaletteType, role: PaletteColorRole, customStyle: CustomStyleType): void {
//       const newPalette = paletteService.genColorByStyle(palette, role, customStyle)
//       set({ miniPalette: newPalette.getMiniPalette() })
//    },
//    addStyle: (palette: PaletteType, role: PaletteColorRole, style: CustomStyleType) => {
//       const newPalette = paletteService.addStyle(palette, role, style)
//       set({ miniPalette: newPalette.getMiniPalette() })
//    },
// }))
