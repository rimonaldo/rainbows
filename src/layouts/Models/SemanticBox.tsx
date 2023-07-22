import React, { useRef, useEffect, useState } from 'react'
import { PaletteColor } from '../../services/palette'
import { guid } from '../../services/utils'
import { usePaletteContext } from '../../hooks/usePaletteContext'
type Props = {
   colors: PaletteColor[]
}

const SemanticsBox = ({ colors }: Props) => {
   const [isRowShown, setIsRowShown] = useState(false)
   const elRef = useRef<HTMLDivElement>(null)
   const { palette } = usePaletteContext()
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
   }, [elRef, palette]) // Add dependency array to avoid unnecessary re-renders

   return (
      <div ref={elRef} className="box semantics ">
         <div className={` content-wrapper ${isRowShown ? 'shown' : ''}`}>
            <header>
               <h3>Color Semantics</h3>
               <p className="desc">
                  Color semantics are used to communicate meaning to the user. They are used to indicate state or to
                  draw attention to an element.
               </p>
            </header>

            <ul className="semantic-list">
               {colors.map(color => {
                  return (
                     <li key={guid()}>
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
   )
}

export default SemanticsBox
