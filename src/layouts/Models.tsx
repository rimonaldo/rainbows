import React, { useEffect, useState, useRef } from 'react'
import { usePaletteContext } from '../hooks/usePaletteContext'
import Waves from '../components/Waves'
import { Palette, PaletteColor } from '../services/palette'
import SemanticsBox from './Models/SemanticBox'
import NavbarBox from './Models/NavbarBox'
import ButtonsBox from './Models/ButtonsBox'
import TableBox from './Models/TableBox'
import { PaletteType } from '../types'

type Props = {
   palette:PaletteType
}

const Models = ({palette}: Props) => {
   // const { palette } = usePaletteContext()
   const { info, success, warning, danger,primary,tertiary } = palette
   const colors = [info, success, warning, danger]
   

   return (
      <section className="models-container" style={{ background: tertiary.shade[100].hex }}>
         <header className="main-models-header">
            <h2 className="" style={{color:'black'}}>Models</h2>
            <h4>Lorem ipsum dolor sit amet, consectetur!</h4>
         </header>
         <div className="hover-box">
            <div className="model-cards-container">
               <div className="row1 semantics-row">
                  <SemanticsBox colors={[palette.info,palette.success,palette.danger,palette.warning]} />
               </div>

               <div className="row2 nav-buttons-row">
                  <NavbarBox></NavbarBox>
                  <ButtonsBox></ButtonsBox>
               </div>

               <div className="row3">
                  <TableBox />
                  <div className="box2 box"></div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Models
