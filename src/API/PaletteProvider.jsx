import React, { createContext, useState } from 'react'

export const PaletteContext = createContext()

export const PaletteProvider = ({ children }) => {
   const [palettes, setPalettes] = useState([])

   const createPalette = async palette => {
      const response = await fetch('/api/palettes', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(palette),
      })
      const data = await response.json()
      setPalettes([...palettes, data])
   }

   // Similar functions could be written for reading, updating and deleting palettes

   return <PaletteContext.Provider value={{ palettes, createPalette }}>{children}</PaletteContext.Provider>
}
