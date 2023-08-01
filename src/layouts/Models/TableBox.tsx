import React, { useRef, useState, useEffect } from 'react'
import { PaletteType } from '../../types'
type Props = {
   palette: PaletteType

}

const TableBox = ({palette}: Props) => {
   const { info, success, warning, danger } = palette
   const [isRowShown, setIsRowShown] = useState(false)
   const elRef = useRef<HTMLDivElement>(null)
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
            rootMargin: '0px 0px -100px 0px', // Trigger the callback when the element is 50px from the bottom of the viewport
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
   return (
      <div ref={elRef} className={`box1 box `}>
         <div className={` content-wrapper ${isRowShown ? 'shown' : ''}`}>
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
                        <button className="btn round view" style={{ background: palette.warning.shade[500].hex }}>
                           E
                        </button>
                        <button className="btn round info" style={{ background: palette.success.shade[900].hex }}>
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
      </div>
   )
}

export default TableBox
