import { useEffect, useState } from 'react'
import { useScrollPosition } from './hooks/useScrollPosition'
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
import { PaletteColorType } from './types'
function App() {
   const prevScrollPos = useScrollPosition()
   const { user, logIn, loggedIn, logOut, signup, savePaletteId } = useUserStore()
   const [{ username, password }, setCredentials] = useState<Credentials>({ username: '', password: '' })
   // const [paletteId, setPaletteId] = useState<string>('')
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
      setPalette(getEmptyPalette())
   }, [])

   const handleSavePalette = () => {
      console.log('handleSavePalette', savedPaletteId)

      addPalette(palette)
      savePaletteId(savedPaletteId)
   }

   const handleLoadPalette = (paletteId: string) => {
      loadPalette(paletteId)
   }

   const handleSetLock = (role: PaletteColorRole, newLockState: boolean) => {
      setColorLock(palette, role, newLockState)
   }

   const handleColorChange = (role: PaletteColorRole, hex: hex) => {
      setColor(palette, role, hex)
   }

   return (
      <div className="App main-layout" style={{ background: palette?.primary.shade[100].hex }}>
         <NavBar user={user} />
         {/* <AdminBox user={user}></AdminBox> */}
         {/* login logout */}
         <div></div>
         <div>
            <div>
               <button onClick={() => handleSavePalette()}>savePalette</button>
            </div>
         </div>

         <Hero scrollPosition={prevScrollPos} />
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
