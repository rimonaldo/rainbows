import ColorContainer from './components/color/ColorContainer'
import PaletteContainer from './components/palette/PaletteContainer'
import PaletteShades from './components/palette/PaletteShades'
import React, { useEffect, useState } from 'react'
// import Header from './components/Header'
import LandingPage from './Landing'
import Showcase from './Showcase'
import Waves from './Waves'
import SecondPage from './SecondPage'
import Sunset from './Sunset'
import Header from './components/stickyHeader/Header'
import SideMenu from './components/stickyHeader/SideMenu'
import Nav from './components/Nav'
import { usePaletteContext } from './hooks/usePaletteContext'
import NavBar from './layouts/NavBar'
import Models from './layouts/Models'
function App() {
   const { palette } = usePaletteContext()

   const [isLoaderShown, setLoaderShown] = useState(true)
   const [prevScrollPos, setPrevScrollPos] = useState(0)
   const [isSticky, setisSticky] = useState(true)
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const [isScrolledDown, setIsScrolledDown] = useState(false)

   const handleOpenMenu = () => {
      setIsMenuOpen(!isMenuOpen)
      console.log(isMenuOpen)
   }

   const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      setisSticky((prevScrollPos < currentScrollPos && prevScrollPos > 0) || currentScrollPos < 0)
      setIsScrolledDown(currentScrollPos > 270)
      setPrevScrollPos(currentScrollPos)
   }

   useEffect(() => {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
   }, [prevScrollPos, isSticky, handleScroll])

   useEffect(() => {
      const timeoutId = setTimeout(() => {
         setLoaderShown(false)
      }, 500)

      return () => {
         clearTimeout(timeoutId)
      }
   }, [])

   return (
      <div
         className="App main-layout"
         // style={{ backgroundImage: `linear-gradient(to top left, ${palette.primary.shade[400].hex} 0%, ${palette.primary.shade[100].hex} 100%)` }}
         style={{ background: palette.primary.shade[100].hex }}
      >
         {isLoaderShown ? (
            <div className="loader">loading</div>
         ) : (
            <>
               {/* <Header isSticky={isSticky} openMenu={handleOpenMenu} /> */}
               <NavBar></NavBar>
               {/* <HeroSection></HeroSection> */}
               {/* <SideMenu isOpen={isMenuOpen} /> */}
               {/* <Hero /> */}
               {/* <SvgComponent primary={palette.primary} secondary={palette.secondary} lightBlockHex={palette.primary.shade[200].hex}></SvgComponent> */}
               {/* <div className="showcase-layout"> */}
               <Showcase scrollPosition={prevScrollPos} />
               <Models isScrolledDown={isScrolledDown} scrollPosition={prevScrollPos}/>
               {/* <SecondPage /> */}
               {/* <Sunset /> */}
               {/* </div> */}
               {/* <LandingPage></LandingPage> */}
               {/* <div className="flex"> */}
               {/* <ColorContainer /> */}
               {/* <PaletteContainer /> */}
               {/* </div> */}

               {/* <PaletteShades /> */}
            </>
         )}
         {/* <Waves /> */}
      </div>
   )
}
export default App
