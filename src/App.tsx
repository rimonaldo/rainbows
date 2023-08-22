import { useEffect, useState } from 'react'
import Hero from './layouts/Hero'
import NavBar from './layouts/NavBar'
import Models from './layouts/Models'
import { usePaletteStore } from './store/usePaletteStore'
import { useUserStore } from './store/useUserStore'
import { Credentials, PaletteColorRole, CustomStyleType, hex, hsl } from './types'
import { Login } from './components/Login'
import PaletteList from './components/PaletteList'
import AdminBox from './layouts/AdminBox'
import SwatchList from './components/SwatchList'
import SideBar from './layouts/SideBar'
function App() {
   // App state
   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
   const [isColorBright, setIsColorBright] = useState<boolean>(false)

   const handleToggleMenu = () => {
      setIsMenuOpen(!isMenuOpen)
   }

   const handleColorChange = (role: PaletteColorRole, hex: hex) => {
      setColor(palette, role, hex)
   }

   const handleSetLock = (role: PaletteColorRole, newLockState: boolean) => {
      setColorLock(palette, role, newLockState)
   }

   const handleStyleAdd = (role: PaletteColorRole, style: CustomStyleType) => {
      console.log('handleStyleAdd', role, style)
      addStyle(palette, role, style)
   }

   const isBrightHSL = (hsl: hsl) => {
      return hsl.l > 0.7
   }

   // User
   const { user, logIn, loggedIn, logOut, signup, savePaletteId } = useUserStore()
   const [{ username, password }, setCredentials] = useState<Credentials>({ username: '', password: '' })

   // Palette
   const {
      setColor,
      setColorLock,
      loadPalette,
      savePalette: addPalette,
      palette,
      getEmptyPalette,
      setPalette,
      savedPaletteId,
      addStyle,
   } = usePaletteStore()

   const handleSavePalette = () => {
      addPalette(palette)
      savePaletteId(savedPaletteId)
   }

   const handleLoadPalette = (paletteId: string) => {
      loadPalette(paletteId)
   }

   const addCustomStyle = (role: PaletteColorRole, style: CustomStyleType) => {
      addStyle(palette, role, style)
   }

   // Test
   useEffect(() => {
      console.log('rendered app')
   }, [])

   return (
      <div className="" style={style}>
         <SideBar isOpen={isMenuOpen}></SideBar>

         <div
            className="App main-layout"
            style={{
               background: isBrightHSL(palette.primary.color.hsl) ? palette.neutralDark.hex : palette.neutralBright.hex,
            }}
         >
            <NavBar toggleMenu={handleToggleMenu} user={user} />
            {/* <AdminBox user={user}></AdminBox> */}
            {/* <div>
            <div>
            <button onClick={() => handleSavePalette()}>savePalette</button>
            </div>
         </div> */}

            <Hero />
            <SwatchList
               palette={palette}
               onAddStyle={(role: PaletteColorRole, customStyle: CustomStyleType) => addCustomStyle(role, customStyle)}
               onStyleAdd={(role: PaletteColorRole, style: CustomStyleType) => handleStyleAdd(role, style)}
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
