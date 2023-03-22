import React from 'react'
import { PaletteColor } from '../../services/palette'
type Props = {
   colors: PaletteColor[]
}

const SemanticsBox = ({ colors }: Props) => {
   return (
      <div className="box semantics">
         <header>
            <h3>Color Semantics</h3>
            <p className="desc">
               Color semantics are used to communicate meaning to the user. They are used to indicate state
               or to draw attention to an element.
            </p>
         </header>

         <ul className="semantic-list">
            {colors.map(color => {
               return (
                  <li>
                     <div className="color-name" style={{ color: color.shade[500].hex }}>
                        {color.name}
                     </div>
                     <div className="rest">
                        <div className="hex">{color.shade[500].hex}</div>
                        <div className="role">{color.role}</div>
                     </div>
                  </li>
               )
            })}
         </ul>
      </div>
   )
}

export default SemanticsBox
