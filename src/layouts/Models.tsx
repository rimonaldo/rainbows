import React, { useEffect, useState, useRef } from 'react'
import { usePaletteContext } from '../hooks/usePaletteContext'
import Waves from '../components/Waves'
import { PaletteColor } from '../services/palette'
import SemanticsBox from './Models/SemanticBox'
import NavbarBox from './Models/NavbarBox'
import ButtonsBox from './Models/ButtonsBox'
type Props = {
   isScrolledDown: boolean
   scrollPosition: number
}

const Models = ({ isScrolledDown, scrollPosition }: Props) => {
   const { palette } = usePaletteContext()
   const { info, success, warning, danger } = palette
   const colors = [info, success, warning, danger]


   return (
      <section className="models-container">
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
                  <div className={`box1 box `}>
                     <header>
                        <h3>Table</h3>
                     </header>

                     <table className="table">
                        <thead>
                           <tr>
                              <th className="index">#</th>
                              <th className="name">Name</th>
                              <th className="actions"></th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td className="index">1</td>
                              <td className="name">Andrew Mike</td>
                              <td className="actions">
                                 <button className="btn view">E</button>
                                 <button className="btn info" style={{ background: palette.info.color.hex }}>
                                    i
                                 </button>
                                 <button className="btn danger" style={{ background: palette.danger.color.hex }}>
                                    X
                                 </button>
                              </td>
                           </tr>
                           <tr>
                              <td className="index">2</td>
                              <td className="name">John Doe</td>
                              <td className="actions">
                                 <button
                                    className="btn round view"
                                    style={{ background: palette.warning.shade[500].hex }}
                                 >
                                    E
                                 </button>
                                 <button
                                    className="btn round info"
                                    style={{ background: palette.success.shade[900].hex }}
                                 >
                                    i
                                 </button>
                                 <button className="btn round danger" style={{ background: palette.danger.color.hex }}>
                                    X
                                 </button>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  <div className="box2 box"></div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Models
