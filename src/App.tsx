import React, { useEffect, useState } from 'react'
import { useScrollPosition } from './hooks/useScrollPosition'
import Hero from './layouts/Hero'
import { usePaletteContext } from './hooks/usePaletteContext'
import NavBar from './layouts/NavBar'
import Models from './layouts/Models'

function App() {
   const { palette } = usePaletteContext()
   const prevScrollPos = useScrollPosition()
   const [isScrolledDown, setIsScrolledDown] = useState(false)

   useEffect(() => {
      setIsScrolledDown(prevScrollPos > 270)
   }, [prevScrollPos])

   return (
      <div className="App main-layout" style={{ background: palette.primary.shade[100].hex }}>
         <NavBar />
         <Hero scrollPosition={prevScrollPos} />
         <Models isScrolledDown={isScrolledDown} scrollPosition={prevScrollPos} />
      </div>
   )
}
export default App
