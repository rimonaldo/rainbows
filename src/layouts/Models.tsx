import React, { useEffect, useState, useRef } from 'react'
import { usePaletteContext } from '../hooks/usePaletteContext'
import Waves from '../components/Waves'
import { Palette, PaletteColor } from '../services/palette'
import SemanticsBox from './Models/SemanticBox'
import NavbarBox from './Models/NavbarBox'
import ButtonsBox from './Models/ButtonsBox'
import TableBox from './Models/TableBox'
type Props = {}

const Models = ({}: Props) => {
   const { palette } = usePaletteContext()
   const { info, success, warning, danger,primary } = palette
   const colors = [info, success, warning, danger]
   

   return (
      <section className="models-container" style={{ background: primary.shade[800].hex }}>
         <header className="main-models-header">
            <h2 className="">Models</h2>
            <h4>Lorem ipsum dolor sit amet, consectetur!</h4>
         </header>
         <div className="hover-box">
            <div className="model-cards-container">
               <div className="row1 semantics-row">
                  <SemanticsBox colors={colors as PaletteColor[]} />
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
