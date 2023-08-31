import { useEffect, useState } from 'react'
import Hero from './layouts/Hero'
import NavBar from './layouts/NavBar'
import Models from './layouts/Models'
import { usePaletteStore } from './store/usePaletteStore'
import { useUserStore } from './store/useUserStore'
import { Credentials, PaletteColorRole, CustomStyleType, hex, hsl, ColorStyleType } from './types'
import { Login } from './components/Login'
import PaletteList from './components/PaletteList'
import AdminBox from './layouts/AdminBox'
import SwatchList from './components/SwatchList'
import SideBar from './layouts/SideBar'
import OpenAIInput from './OpenAi'
function App() {
   // User
   const { user, logIn, loggedIn, logOut, signup, savePaletteId } = useUserStore()
   const [{ username, password }, setCredentials] = useState<Credentials>({ username: '', password: '' })

   // App state
   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
   const [isColorBright, setIsColorBright] = useState<boolean>(false)

   const handleToggleMenu = () => {
      setIsMenuOpen(!isMenuOpen)
   }

   // Palette
   const {
      setColor,
      setColorLock,
      loadPalette,
      savePalette: addPalette,
      palette,
      savedPaletteId,
      addCustomStyle: addStyle,
   } = usePaletteStore()

   const handleColorChange = (role: PaletteColorRole, hex: hex) => {
      setColor(palette, role, hex)
   }

   const handleSetLock = (role: PaletteColorRole, newLockState: boolean) => {
      setColorLock(palette, role, newLockState)
   }

   const handleAddStyle = (role: PaletteColorRole, style: ColorStyleType) => {
      addStyle(palette, role, style)
   }

   const handleSavePalette = () => {
      addPalette(palette)
      savePaletteId(savedPaletteId)
   }

   const handleLoadPalette = (paletteId: string) => {
      loadPalette(paletteId)
   }

   const isBrightHSL = (hsl: hsl) => {
      return hsl.l > 0.7
   }

   // Test
   useEffect(() => {
      console.log('rendered app')
   }, [])

   return (
      <div className="" >
         <SideBar isOpen={isMenuOpen}></SideBar>

         <div
            className="App main-layout"
            style={{
               background: isBrightHSL(palette.primary.color.hsl) ? palette.neutralBright.hex : palette.neutralBright.hex,
            }}
         >
            <NavBar toggleMenu={handleToggleMenu} user={user} />
            <AdminBox user={user}></AdminBox>
            {/* <div>
            <div>
            <button onClick={() => handleSavePalette()}>savePalette</button>
            </div>
         </div> */}

            <Hero />
            <OpenAIInput />
            <SwatchList
               palette={palette}
               // onAddStyle={(role: PaletteColorRole, customStyle: ColorStyleType) => addCustomStyle(role, customStyle)}
               onStyleAdd={(role: PaletteColorRole, style: ColorStyleType) => handleAddStyle(role, style)}
               onColorChange={(role: PaletteColorRole, hex: hex) => handleColorChange(role, hex)}
               onLockToggle={(role: PaletteColorRole, newLockState: boolean) => handleSetLock(role, newLockState)}
            />

            <Models palette={palette} />
         </div>
      </div>
   )
}

export default App

