import { useEffect, useState } from 'react'
import { useScrollPosition } from './hooks/useScrollPosition'
import Hero from './layouts/Hero'
import NavBar from './layouts/NavBar'
import Models from './layouts/Models'
import { usePaletteStore } from './store/usePaletteStore'
import { useUserStore } from './store/useUserStore'
import { Credentials } from './types'




function App() {
   // const [isScrolledDown, setIsScrolledDown] = useState(false)
   const prevScrollPos = useScrollPosition()
   const { user, logIn, logOut, loggedIn, signup,mockCredentials } = useUserStore()
   const [{ username, password }, setCredentials] = useState<Credentials>({ username: '', password: '' })
   const { addPalette, palette, getEmptyPalette, setPalette } = usePaletteStore()
   
   // useEffect(() => {
   //    setIsScrolledDown(prevScrollPos > 270)
   // }, [prevScrollPos])

   useEffect(() => {
      // console.log('loggedInUser', user)
      setPalette(getEmptyPalette())
   }, [user])

   const handleSavePalette = () => {
      console.log('palette', palette)
      addPalette(palette)
   }

   return (
      <div className="App main-layout" style={{ background: palette?.primary.shade[100].hex }}>
         <NavBar />
         {/* login logout */}
         <div className="login">
            <button onClick={() => logIn(mockCredentials)}>login</button>
            <button onClick={() => logOut()}>logout</button>
            {/* <button onClick={()=>signup() } >Signup</button> */}
         </div>
         <div>
            <input type="text" placeholder="username" />
            <input type="text" placeholder="password" />
            <div>
               <button onClick={() => handleSavePalette()}>savePalette</button>
            </div>
         </div>

         <Hero scrollPosition={prevScrollPos} />
         <Models palette={palette}/>
      </div>
   )
}
export default App
