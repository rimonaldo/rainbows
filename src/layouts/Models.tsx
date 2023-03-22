import React, { useEffect, useState, useRef } from 'react'
import { usePaletteContext } from '../hooks/usePaletteContext'
import Waves from '../components/Waves'
type Props = {
   isScrolledDown: boolean
   scrollPosition: number
}

const Models = ({ isScrolledDown, scrollPosition }: Props) => {
   const { palette } = usePaletteContext()
   const { info, success, warning, danger } = palette
   const colors = [info, success, warning, danger]
   const [isBtnsAnimated, setIsBtnsAnimated] = useState(false)
   const [isRowShown, setIsRowShown] = useState(false)
   const elRef = useRef<HTMLDivElement>(null)

   // when element is scrolled into view, animate buttons

   useEffect(() => {
      const observer = new IntersectionObserver(
         entries => {
            // Callback will be called when the element enters or leaves the viewport
            const [entry] = entries
            if (entry.isIntersecting) {
               setIsRowShown(true)
            } else {
               setIsRowShown(false)
            }
         },
         {
            rootMargin: '0px 0px -50px 0px', // Trigger the callback when the element is 50px from the bottom of the viewport
         }
      )

      if (elRef.current) {
         observer.observe(elRef.current)
      }

      // Clean up when the component is unmounted
      return () => {
         if (elRef.current) {
            observer.unobserve(elRef.current)
         }
      }
   }, [elRef]) // Add dependency array to avoid unnecessary re-renders

   //  add event on scroll down

   // useEffect(() => {
   //    if (isScrolledDown) {
   //       setIsRowShown(true)
   //    } else {
   //       setIsRowShown(false)
   //    }
   // }, [isScrolledDown])

   return (
      <section className="models-container">
         {/* <div className="scroll " style={{ position: 'sticky', top: '2rem', left: '2rem', color: 'black' }}>
            {scrollPosition}
         </div> */}
         <header className="main-models-header">
            <h2 className="">Models</h2>
            <h4>Lorem ipsum dolor sit amet, consectetur!</h4>
         </header>
         <div className="hover-box">
            <div  className="model-cards-container">
               <div className="row1 semantics-row">
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
               </div>

               <div className="row2 nav-buttons-row">
                  <div className="box1 box">
                     <header>
                        <h3>Nav Bar</h3>
                     </header>
                     <div className="nav">
                        <div className="">Link</div>
                        <div>Link</div>
                        <select name="" id="">
                           <option value="">Select</option>
                        </select>
                     </div>
                  </div>
                  <div ref={elRef} className="box2 box buttons-box">
                     <header className={isRowShown ? 'shown' : ''}>
                        <h3>Buttons</h3>
                     </header>
                     <div className={`buttons-grid ${isRowShown ? 'shown' : ''}`}>
                        <div className={`row-1 ${isRowShown ? 'shown' : ''}`}>
                           <div className="btn btn-primary1" style={{ background: palette.primary.shade[500].hex }}>
                              Primary
                           </div>
                           <div className="btn btn-secondary1" style={{ background: palette.secondary.shade[500].hex }}>
                              Secondary
                           </div>
                           <div className="btn btn-success" style={{ background: palette.success.shade[500].hex }}>
                              Success
                           </div>
                        </div>
                        <div className={`row-2 ${isRowShown ? 'shown' : ''}`}>
                           <div className="btn btn-danger" style={{ background: palette.danger.shade[500].hex }}>
                              Danger
                           </div>
                           <div className="btn btn-warning" style={{ background: palette.warning.shade[500].hex }}>
                              Warning
                           </div>
                        </div>
                        <div className={`row-3 ${isRowShown ? 'shown' : ''}`}>
                           <div className="btn btn-info" style={{ background: palette.info.shade[500].hex }}>
                              Info
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="row3">
                  <div className={`box1 box ${isRowShown ? 'shown' : ''}`}>
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
