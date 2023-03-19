import React from 'react'
import { PaletteColorType } from './services/palette'
import ColorPicker from './components/color/ColorPicker'
import { usePaletteContext } from './hooks/usePaletteContext'
type Props = {
   paletteColor: PaletteColorType
}

const Card = ({ paletteColor }: Props) => {
   const cardParagraph = {
      primary:
         'Primary color sets the tone for your design, with complementary hues for a cohesive and eye-catching color palette.',
      secondary:
         'Secondary colors bring depth and dimension to your design, expertly calculated for a cohesive and visually stunning palette.',
         tertiary:'Tertiary colors are an optional enhancement, adding a touch of sophistication to your designs.'
   }

   const textColor = ({ r, g, b }: { r: number; g: number; b: number }) => {
      var yiq = (r * 299 + g * 587 + b * 114) / 1000
      return yiq >= 128 ? 'black' : 'white'
   }

   const { palette, setPrimary, editPaletteColor } = usePaletteContext()

   const handleColorChange = (hex: string) => {
      editPaletteColor(paletteColor.role, hex)
   }

   const bg900 = { background: paletteColor.shade[900].hex, color: textColor(paletteColor.shade[900].rgb) }
   const bg500 = { background: paletteColor.shade[500].hex, color: textColor(paletteColor.shade[500].rgb) }
   const bg100 = { background: paletteColor.shade[100].hex }

   return (
      <div className={`card ${paletteColor.role}`}>
         <div className="card-header primary" style={bg500}>
            <div className="card-title primary">
               {paletteColor.role.charAt(0).toLocaleUpperCase() + paletteColor.role.slice(1, paletteColor.role.length)}
            </div>
         </div>

         <div className="content-wrapper" style={bg100}>
            <p style={{ color: 'black' }}>{cardParagraph[paletteColor.role as keyof typeof cardParagraph]}</p>
            <div className="color-picker-wrapper">
               <ColorPicker hex={paletteColor.shade[500].hex} handleColorChange={handleColorChange} />
            </div>
            <div className="content">
               <div className="circle" style={bg500}></div>
               <div className="hex">{paletteColor.shade[500].hex}</div>
            </div>
         </div>
      </div>
   )
}

export default Card
