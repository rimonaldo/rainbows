import { useEffect, useState } from 'react'
import Hero from './layouts/Hero'
import NavBar from './layouts/NavBar'
import Models from './layouts/Models'
import { usePaletteStore } from './store/usePaletteStore'
import { useUserStore } from './store/useUserStore'
import { Credentials, PaletteColorRole, hex, hsl } from './types'
import { Login } from './components/Login'
import PaletteList from './components/PaletteList'
import AdminBox from './layouts/AdminBox'
import SwatchList from './components/SwatchList'
import SideBar from './layouts/SideBar'
function App() {
   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
   const { user, logIn, loggedIn, logOut, signup, savePaletteId } = useUserStore()
   const [{ username, password }, setCredentials] = useState<Credentials>({ username: '', password: '' })
   const [isColorBright, setIsColorBright] = useState<boolean>(false)
   const {
      setColor,
      setColorLock,
      loadPalette,
      savePalette: addPalette,
      palette,
      getEmptyPalette,
      setPalette,
      savedPaletteId,
   } = usePaletteStore()

   useEffect(() => {
      console.log('rendered app')
   }, [])

   const handleToggleMenu = () => {
      setIsMenuOpen(!isMenuOpen)
   }

   const handleSavePalette = () => {
      addPalette(palette)
      savePaletteId(savedPaletteId)
   }

   const handleLoadPalette = (paletteId: string) => {
      loadPalette(paletteId)
   }

   const handleColorChange = (role: PaletteColorRole, hex: hex) => {
      setColor(palette, role, hex)
   }

   const handleSetLock = (role: PaletteColorRole, newLockState: boolean) => {
      setColorLock(palette, role, newLockState)
   }

   const isBrightHSL = (hsl: hsl) => {
      return hsl.l > 0.7
   }

   return (
      <div className="" style={style}>
         <SideBar isOpen={isMenuOpen}></SideBar>

         <div
            className="App main-layout"
            style={{
               background: isBrightHSL(palette.primary.color.hsl)
                  ? palette.neutralDark.hex
                  : palette.neutralBright.hex,
            }}
         >
            <NavBar toggleMenu={handleToggleMenu} user={user} />
            {/* <AdminBox user={user}></AdminBox> */}
            {/* login logout */}

            {/* <div>
            <div>
            <button onClick={() => handleSavePalette()}>savePalette</button>
            </div>
         </div> */}

            <Hero />
            <SwatchList
               palette={palette}
               onColorChange={(role: PaletteColorRole, hex: hex) => handleColorChange(role, hex)}
               onLockToggle={(role: PaletteColorRole, newLockState: boolean) => handleSetLock(role, newLockState)}
            />

            <Models palette={palette} />
         </div>
      </div>
   )
}
export default App

const style = {
   display: 'flex',
   // border: '1px solid red',
   justifyContent: 'space between',
}
