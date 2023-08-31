import React, { useState } from 'react'
import { useUserStore } from '../store/useUserStore'
import { usePaletteStore } from '../store/usePaletteStore'
import { User } from '../types'

interface LoginProps { }

export const Login: React.FC<LoginProps> = ({ }) => {
   const [username, setUsername] = useState<string>('')
   const [password, setPassword] = useState<string>('')

   const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)
   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

   const { user, logIn, loggedIn, logOut, signup, savePaletteId } = useUserStore()
   const { loadPalette, savePalette: addPalette, palette, getEmptyPalette, setPalette, savedPaletteId } = usePaletteStore()

   const handleSavePalette = () => {
      addPalette(palette)
      savePaletteId(savedPaletteId)
   }

   const handleLoadPalette = (paletteId: string) => {
      loadPalette(paletteId)
   }

   const divStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px',
      border: '1px solid gray',
   }

   const inputStyle = {
      marginBottom: '10px',
      padding: '5px',
      borderRadius: '5px',
      border: '1px solid gray',
   }

   const buttonStyle = {
      marginBottom: '10px',
      padding: '5px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: 'blue',
      color: 'white',
      cursor: 'pointer',
   }

   const liStyle = {
      marginBottom: '2px',
      padding: '5px',
   }

   return (
      <div style={divStyle} className="login">
         <input
            type="text"
            style={inputStyle}
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
         />
         <input
            type="password"
            style={inputStyle}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
         />

         <button style={buttonStyle} onClick={() => logIn({ username, password })}>
            login
         </button>
         <button style={buttonStyle} onClick={logOut}>
            logout
         </button>

         <button style={buttonStyle} onClick={() => signup({ username, password })}>
            Signup
         </button>
      </div>
   )
}
