// Filename: OpenAIInput.tsx

import React, { useState } from 'react'
import { openaiService } from './services/openAi.service' // Adjust the import path as needed
import { userService } from './services/user.service'
import { usePaletteStore } from './store/usePaletteStore'
const OpenAIInput: React.FC = () => {
   const [inputValue, setInputValue] = useState<string>('')
   const [response, setResponse] = useState<string | null>(null)
   const { palette, setColor } = usePaletteStore()

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value)
   }

   const handleSubmit = async () => {
      try {
         const apiResponse = await userService.getCompletion(inputValue) // Replace 'yourAPIMethod' with the appropriate method

         //  setResponse(apiResponse)
         type ColorObj = {
            primary: string
            secondary: string
            tertiary: string
         }
         const colorObj: ColorObj = {
            primary: apiResponse.content.split(' ')[1],
            secondary: apiResponse.content.split(' ')[3],
            tertiary: apiResponse.content.split(' ')[5],
         }

         console.log(colorObj)

         setColor(palette, 'primary', colorObj.primary)
         setColor(palette, 'secondary', colorObj.secondary)
         setColor(palette, 'tertiary', colorObj.tertiary)
      } catch (error) {
         console.error('Error sending data to API:', error)
         setResponse('Error occurred.')
      }
   }

   return (
      <div style={{ border: '1px black solid', width: '300px' }}>
         <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter your query" />
         <button onClick={handleSubmit}>Send to API</button>
         {response && <div>Response: {response}</div>}
      </div>
   )
}

export default OpenAIInput
