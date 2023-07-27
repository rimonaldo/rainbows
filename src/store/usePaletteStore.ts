import { create } from 'zustand'
import { Palette } from '../services/palette/palette'
import { MiniPaletteType, MiniPalette } from '../types/Palette'
import { persist } from 'zustand/middleware'
import { PaletteType } from '../services/palette/palette'
import { paletteService } from '../services/Palette.service'
type State = {
   miniPalette: MiniPaletteType | null
   palette: PaletteType | null
   addPalette: (palette: PaletteType) => void
   // removePalette: (id: string) => void
   // updatePalette: (id: string, palette: Palette) => void
   // getMiniPalettes: () => MiniPaletteType[]
}

// store.ts

export const usePaletteStore = create(
   persist<State>(
      // persist the store to localStorage
      set => ({
         miniPalette: null,
         palette: null,
         addPalette: async palette => {
            const miniPalette = await paletteService.addPalette(new MiniPalette(palette))
            if (miniPalette) {
               set({ miniPalette })
            }
         },
         // updatePalette: async (id, palette) => {
         //    await paletteService.updatePalette(id, palette)
         //    set({ miniPalette: null })
         // },
      }),
      {
         name: 'user-storage', // unique name
         getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
      }
   )
)
