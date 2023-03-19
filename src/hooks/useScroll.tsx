import { useState, useEffect, useRef } from 'react'

export const useScroll = () => {
   const [scroll, setScroll] = useState(0)
   const elRef = useRef<HTMLDivElement>(null)
   const [top, setTop] = useState(0)
   const [bottom, setBottom] = useState(0)

   useEffect(() => {
      const element = elRef.current
      setScroll(window.scrollY)
      const elPosition = element?.getBoundingClientRect()
      if (elPosition) {
         setTop(elPosition.top)
         setBottom(elPosition.bottom)
      }
   }, [])

   return {
      scroll,
      elRef,
      getTop: () => top,
      getBottom: () => bottom,
      isOnScreen: () => top <= 0 && bottom >= 0,
   }
}
