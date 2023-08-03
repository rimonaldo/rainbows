import { useEffect, useState } from 'react'
import { useScrollPosition } from './hooks/useScrollPosition'
import Hero from './layouts/Hero'
import NavBar from './layouts/NavBar'
import Models from './layouts/Models'
import { usePaletteStore } from './store/usePaletteStore'
import { useUserStore } from './store/useUserStore'
import { Credentials } from './types'
import { Login } from './components/Login'
import PaletteList from './components/PaletteList'
function App() {
   const prevScrollPos = useScrollPosition()
   const { user, logIn, loggedIn, logOut, signup, savePaletteId } = useUserStore()
   const [{ username, password }, setCredentials] = useState<Credentials>({ username: '', password: '' })
   // const [paletteId, setPaletteId] = useState<string>('')
   const { loadPalette, savePalette: addPalette, palette, getEmptyPalette, setPalette, savedPaletteId } = usePaletteStore()

   useEffect(() => {
      setPalette(getEmptyPalette())
   }, [])

   const handleSavePalette = () => {
      console.log('handleSavePalette',savedPaletteId);
      
      addPalette(palette)
      savePaletteId(savedPaletteId)
   }

   const handleLoadPalette = (paletteId: string) => {
      loadPalette(paletteId)
   }

   return (
      <div className="App main-layout" style={{ background: palette?.primary.shade[100].hex }}>
         <NavBar user={user} />
         {/* login logout */}
         <div>
            <Login></Login>
            <PaletteList loadPalette={loadPalette} paletteIds={user?.savedPalettes || []}></PaletteList>
         </div>
         <div>
            <div>
               <button onClick={() => handleSavePalette()}>savePalette</button>
            </div>
         </div>

         <Hero scrollPosition={prevScrollPos} />
         <Models palette={palette} />
      </div>
   )
}
export default App
