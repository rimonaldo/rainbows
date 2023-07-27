import React, { useEffect, useState } from 'react'
import { useScrollPosition } from './hooks/useScrollPosition'
import Hero from './layouts/Hero'
import { usePaletteContext } from './hooks/usePaletteContext'
import NavBar from './layouts/NavBar'
import Models from './layouts/Models'
import { usePaletteStore } from './store/usePaletteStore'
import { useStore } from './store/useStore'
import { PaletteType, PaletteColorRole, PaletteColorType } from './services/palette/palette'
const mockCredentials: Credentials = {
   username: 'Rimonaldo123',
   password: '123',
}

type Credentials = {
   username: string
   password: string
}

function App() {
   const { palette } = usePaletteContext()
   const prevScrollPos = useScrollPosition()
   const [isScrolledDown, setIsScrolledDown] = useState(false)
   const { user, logIn, logOut, loggedIn, signup } = useStore()
   const [{ username, password }, setCredentials] = useState<Credentials>({ username: '', password: '' })
   const { addPalette } = usePaletteStore()
   useEffect(() => {
      logIn(mockCredentials)
      setIsScrolledDown(prevScrollPos > 270)
   }, [prevScrollPos])

   useEffect(() => {
      console.log('loggedInUser', user)
   }, [user])

   return (
      <div className="App main-layout" style={{ background: palette.primary.shade[100].hex }}>
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
               <button onClick={() => addPalette(palette)}>savePalette</button>
            </div>
         </div>

         <Hero scrollPosition={prevScrollPos} />
         <Models />
      </div>
   )
}
export default App
