import React from 'react'
import { PaletteType } from '../services/palette'
import { usePaletteContext } from '../hooks/usePaletteContext'
import BrandColor from './BrandColor'
type Props = {}

const Nav = ({}: Props) => {
   const { palette, setPrimary, editPaletteColor } = usePaletteContext()
   const onColorChange = (ev: React.ChangeEvent<HTMLInputElement>, role: string) => {
      editPaletteColor(role, ev.target.value)
   }
   return (
      <div className="nav-container">
         <div className="logo">rainbows</div>

         <div className="brand-colors-wrapper ">
            <BrandColor paletteColor={palette.primary} onColorChange={onColorChange} />
            <BrandColor paletteColor={palette.secondary} onColorChange={onColorChange} />
            <BrandColor paletteColor={palette.tertiary} onColorChange={onColorChange} />
            <BrandColor paletteColor={palette.neutral} onColorChange={onColorChange} />
            <BrandColor paletteColor={palette.info} onColorChange={onColorChange} />
            <BrandColor paletteColor={palette.success} onColorChange={onColorChange} />
            <BrandColor paletteColor={palette.warning} onColorChange={onColorChange} />
            <BrandColor paletteColor={palette.danger} onColorChange={onColorChange} />
         </div>
      </div>
   )
}

export default Nav
