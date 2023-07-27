// userService.ts
import { User } from '../types'
import { PaletteType, MiniPaletteType } from '../types'
import httpService from './http.service'

type Credentials = {
   username: string
   password: string
}

export const paletteService = {
   getPalettes: async (): Promise<PaletteType[]> => {
      return httpService.get('palette')
   },
   getPalette: async (id: number): Promise<PaletteType> => {
      return httpService.get(`palette/${id}`)
   },
   addPalette: async (palette: MiniPaletteType): Promise<MiniPaletteType> => {
      return httpService.post('palette', palette)
   },
   updatePalette: async (id: number, palette: PaletteType): Promise<PaletteType> => {
      return httpService.put(`palettes/${id}`, palette)
   },
   // deletePalette: async (id: number): Promise<void> => {
   //    return httpService.delete(`palettes/${id}`)
   // },
   fromPaletteToMiniPalette: (palette: PaletteType): MiniPaletteType => {
      const miniPalette: MiniPaletteType = {
         _id: palette._id,
         primary: {
            role: 'primary',
            hex: palette.primary.color.hex,
            name: palette.primary.name,
            shade: {
               [100]: { hex: palette.primary.shade[100].hex },
               [200]: { hex: palette.primary.shade[200].hex },
               [300]: { hex: palette.primary.shade[300].hex },
               [400]: { hex: palette.primary.shade[400].hex },
               [500]: { hex: palette.primary.shade[500].hex },
               [600]: { hex: palette.primary.shade[600].hex },
               [700]: { hex: palette.primary.shade[700].hex },
               [800]: { hex: palette.primary.shade[800].hex },
               [900]: { hex: palette.primary.shade[900].hex },
            },
         },
         secondary: {
            role: 'secondary',
            hex: palette.secondary.color.hex,
            name: palette.secondary.name,
            shade: {
               [100]: { hex: palette.secondary.shade[100].hex },
               [200]: { hex: palette.secondary.shade[200].hex },
               [300]: { hex: palette.secondary.shade[300].hex },
               [400]: { hex: palette.secondary.shade[400].hex },
               [500]: { hex: palette.secondary.shade[500].hex },
               [600]: { hex: palette.secondary.shade[600].hex },
               [700]: { hex: palette.secondary.shade[700].hex },
               [800]: { hex: palette.secondary.shade[800].hex },
               [900]: { hex: palette.secondary.shade[900].hex },
            },
         },
         tertiary: {
            role: 'tertiary',
            hex: palette.tertiary.color.hex,
            name: palette.tertiary.name,
            shade: {
               [100]: { hex: palette.tertiary.shade[100].hex },
               [200]: { hex: palette.tertiary.shade[200].hex },
               [300]: { hex: palette.tertiary.shade[300].hex },
               [400]: { hex: palette.tertiary.shade[400].hex },
               [500]: { hex: palette.tertiary.shade[500].hex },
               [600]: { hex: palette.tertiary.shade[600].hex },
               [700]: { hex: palette.tertiary.shade[700].hex },
               [800]: { hex: palette.tertiary.shade[800].hex },
               [900]: { hex: palette.tertiary.shade[900].hex },
            },
         },
         info: {
            role: 'info',
            hex: palette.info.color.hex,
            name: palette.info.name,
            shade: {
               [100]: { hex: palette.info.shade[100].hex },
               [200]: { hex: palette.info.shade[200].hex },
               [300]: { hex: palette.info.shade[300].hex },
               [400]: { hex: palette.info.shade[400].hex },
               [500]: { hex: palette.info.shade[500].hex },
               [600]: { hex: palette.info.shade[600].hex },
               [700]: { hex: palette.info.shade[700].hex },
               [800]: { hex: palette.info.shade[800].hex },
               [900]: { hex: palette.info.shade[900].hex },
            },
         },
         success: {
            role: 'success',
            hex: palette.success.color.hex,
            name: palette.success.name,
            shade: {
               [100]: { hex: palette.success.shade[100].hex },
               [200]: { hex: palette.success.shade[200].hex },
               [300]: { hex: palette.success.shade[300].hex },
               [400]: { hex: palette.success.shade[400].hex },
               [500]: { hex: palette.success.shade[500].hex },
               [600]: { hex: palette.success.shade[600].hex },
               [700]: { hex: palette.success.shade[700].hex },
               [800]: { hex: palette.success.shade[800].hex },
               [900]: { hex: palette.success.shade[900].hex },
            },
         },
         warning: {
            role: 'warning',
            hex: palette.warning.color.hex,
            name: palette.warning.name,
            shade: {
               [100]: { hex: palette.warning.shade[100].hex },
               [200]: { hex: palette.warning.shade[200].hex },
               [300]: { hex: palette.warning.shade[300].hex },
               [400]: { hex: palette.warning.shade[400].hex },
               [500]: { hex: palette.warning.shade[500].hex },
               [600]: { hex: palette.warning.shade[600].hex },
               [700]: { hex: palette.warning.shade[700].hex },
               [800]: { hex: palette.warning.shade[800].hex },
               [900]: { hex: palette.warning.shade[900].hex },
            },
         },
         danger: {
            role: 'danger',
            hex: palette.danger.color.hex,
            name: palette.danger.name,
            shade: {
               [100]: { hex: palette.danger.shade[100].hex },
               [200]: { hex: palette.danger.shade[200].hex },
               [300]: { hex: palette.danger.shade[300].hex },
               [400]: { hex: palette.danger.shade[400].hex },
               [500]: { hex: palette.danger.shade[500].hex },
               [600]: { hex: palette.danger.shade[600].hex },
               [700]: { hex: palette.danger.shade[700].hex },
               [800]: { hex: palette.danger.shade[800].hex },
               [900]: { hex: palette.danger.shade[900].hex },
            },
         },
         neutral: {
            role: 'neutral',
            hex: palette.neutral.color.hex,
            name: palette.neutral.name,
            shade: {
               [100]: { hex: palette.neutral.shade[100].hex },
               [200]: { hex: palette.neutral.shade[200].hex },
               [300]: { hex: palette.neutral.shade[300].hex },
               [400]: { hex: palette.neutral.shade[400].hex },
               [500]: { hex: palette.neutral.shade[500].hex },
               [600]: { hex: palette.neutral.shade[600].hex },
               [700]: { hex: palette.neutral.shade[700].hex },
               [800]: { hex: palette.neutral.shade[800].hex },
               [900]: { hex: palette.neutral.shade[900].hex },
            },
         },
      }
      return miniPalette as MiniPaletteType
   },
}
