import React, { useEffect, useState, useRef } from 'react'
import { PaletteType } from '../../types'

type Props = {
   palette: PaletteType
}

const ButtonsBox = ({palette}: Props) => {
   
   const { primary, secondary, success, warning, danger, info } = palette
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
            rootMargin: '0px 0px -90px 0px', // Trigger the callback when the element is 50px from the bottom of the viewport
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
      <div ref={elRef} className="box2 box buttons-box">
         <header className={isRowShown ? 'shown' : ''}>
            <h3>Buttons</h3>
         </header>
         <div className={`buttons-grid ${isRowShown ? 'shown' : ''}`}>
            <div className={`row-1 ${isRowShown ? 'shown' : ''}`}>
               <div className="btn btn-primary1" style={{ background: primary.shade[500].hex }}>
                  Primary
               </div>
               <div className="btn btn-secondary1" style={{ background: secondary.shade[500].hex }}>
                  Secondary
               </div>
               <div className="btn btn-success" style={{ background: success.shade[500].hex }}>
                  Success
               </div>
            </div>
            <div className={`row-2 ${isRowShown ? 'shown' : ''}`}>
               <div className="btn btn-danger" style={{ background: danger.shade[500].hex }}>
                  Danger
               </div>
               <div className="btn btn-warning" style={{ background: warning.shade[500].hex }}>
                  Warning
               </div>
            </div>
            <div className={`row-3 ${isRowShown ? 'shown' : ''}`}>
               <div className="btn btn-info" style={{ background: info.shade[500].hex }}>
                  Info
               </div>
            </div>
         </div>
      </div>
   )
}

export default ButtonsBox
