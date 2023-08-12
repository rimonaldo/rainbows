import { useEffect, useState } from 'react'
import Hero from './layouts/Hero'
import NavBar from './layouts/NavBar'
import Models from './layouts/Models'
import { usePaletteStore } from './store/usePaletteStore'
import { useUserStore } from './store/useUserStore'
import { Credentials, PaletteColorRole, hex } from './types'
import { Login } from './components/Login'
import PaletteList from './components/PaletteList'
import AdminBox from './layouts/AdminBox'
import SwatchList from './components/SwatchList'

function App() {
   const { user, logIn, loggedIn, logOut, signup, savePaletteId } = useUserStore()
   const [{ username, password }, setCredentials] = useState<Credentials>({ username: '', password: '' })
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

   return (
      <div className="App main-layout" style={{ background: palette?.primary.shade[100].hex }}>
         <NavBar user={user} />
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
   )
}
export default App
