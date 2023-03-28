import React, { useState, useRef, useEffect } from 'react'

const NavbarBox = () => {
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
      <div ref={elRef} className="box1 box">
         <div className={` content-wrapper ${isRowShown ? 'shown' : ''}`}>
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
      </div>
   )
}

export default NavbarBox
