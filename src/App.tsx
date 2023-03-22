import React, { useEffect, useState } from 'react'
import Hero from './layouts/Hero'
import { usePaletteContext } from './hooks/usePaletteContext'
import NavBar from './layouts/NavBar'
import Models from './layouts/Models'
import Waves from './components/Waves'
function App() {
   const { palette } = usePaletteContext()

   const [prevScrollPos, setPrevScrollPos] = useState(0)
   const [isScrolledDown, setIsScrolledDown] = useState(false)

   const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      setIsScrolledDown(currentScrollPos > 270)
      setPrevScrollPos(currentScrollPos)
   }

   useEffect(() => {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
   }, [prevScrollPos, handleScroll])

   return (
      <div className="App main-layout" style={{ background: palette.primary.shade[100].hex }}>
         <NavBar></NavBar>
         <Hero scrollPosition={prevScrollPos} />
         <Models isScrolledDown={isScrolledDown} scrollPosition={prevScrollPos} />
      </div>
   )
}
export default App
