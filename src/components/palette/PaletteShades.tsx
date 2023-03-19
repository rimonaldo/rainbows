import React from 'react'
import { PaletteColor } from '../../services/palette/palette'
import { usePaletteContext } from '../../hooks/usePaletteContext'
import PaletteColorShades from './PaletteColorShades'
type Props = {}

const PaletteShades = (props: Props) => {
   const { palette } = usePaletteContext()
   return (
      <div className="flex">
         <PaletteColorShades paletteColor={palette.primary} />
         <PaletteColorShades paletteColor={palette.secondary} />
         <PaletteColorShades paletteColor={palette.success} />
         <PaletteColorShades paletteColor={palette.info} />
         <PaletteColorShades paletteColor={palette.warning} />
         <PaletteColorShades paletteColor={palette.danger} />
      </div>
   )
}

export default PaletteShades
