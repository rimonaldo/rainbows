import React, { useEffect, useState } from 'react'
import { usePaletteContext } from '../hooks/usePaletteContext'

type Props = {
   isScrolledDown: boolean
   scrollPosition: number
}

const Models = ({ isScrolledDown, scrollPosition }: Props) => {
   const { palette } = usePaletteContext()
   const { primary, info, success, warning, danger } = palette
   const colors = [primary, info, success, warning, danger]
   const [isBtnsAnimated, setIsBtnsAnimated] = useState(false)
   const [isRowShown, setIsRowShown] = useState(false)
   //  add event on scroll down

   useEffect(() => {
      if (isScrolledDown) {
         setIsRowShown(true)
      } else {
         setIsRowShown(false)
      }
   }, [isScrolledDown])
   
   return (
      <section className="models-container">
         <div className="scroll " style={{ position: 'sticky', top: '2rem', left: '2rem', color: 'black' }}>
            {scrollPosition}
         </div>
         <header className="main-models-header">
            <h2 className="">Models</h2>
            <h4>Lorem ipsum dolor sit amet, consectetur!</h4>
         </header>

         <div className="model-cards">
            <div className="row1">
               <div className="semantics">
                  <header>
                     <h3>Color Semantics</h3>
                     <p className="desc">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. or sit amet consectetur
                        adipisicing elit. Quisquam,
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
            </div>
            <div className="row2">
               <div className="box1 box">
                  <header>
                     <h3>Nav Bar</h3>
                  </header>
                  <div className="nav">
                     <div className="">Link</div>
                     <div>Link</div>
                     <div>Link</div>
                  </div>
               </div>
               <div className="box2 box buttons-box">
                  <header className={isRowShown ? 'shown' : ''}>
                     <h3>Buttons</h3>
                  </header>
                  <div className={`buttons-grid ${isRowShown ? 'shown' : ''}`}>
                     <div className={`row-1 ${isRowShown ? 'shown' : ''}`}>
                        <div className="btn btn-primary1">Primary</div>
                        <div className="btn btn-secondary1">Secondary</div>
                        <div className="btn btn-success">Success</div>
                     </div>
                     <div className={`row-2 ${isRowShown ? 'shown' : ''}`}>
                        <div className="btn btn-danger">Danger</div>
                        <div className="btn btn-warning">Warning</div>
                     </div>
                     <div className={`row-3 ${isRowShown ? 'shown' : ''}`}>
                        <div className="btn btn-info">Info</div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="row3">
               <div className={`box1 box ${isRowShown ? 'shown' : ''}`}></div>
               <div className="box2 box"></div>
            </div>
         </div>
      </section>
   )
}

export default Models
