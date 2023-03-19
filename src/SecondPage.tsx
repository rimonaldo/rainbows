import React from 'react'
import { usePaletteContext } from './hooks/usePaletteContext'
import Card from './Card'
type Props = {}

const SecondPage = (props: Props) => {
   const { palette } = usePaletteContext()
   return (
      <div className="second-page main-layout" style={{background:palette.primary.shade[900].hex}}>
         <div className="cards">
            <Card paletteColor={palette.primary} />
            <Card paletteColor={palette.secondary} />
            {/* <Card paletteColor={palette.tertiary} /> */}
         </div>
      </div>
   )
}

export default SecondPage
