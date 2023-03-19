import React, { useContext, useState, useEffect } from 'react'
import { Color } from '../services/color'
import useColor from './useColor'

export type UseType = ReturnType<typeof useColor>
export type UseColorType = ReturnType<typeof useColor>
const ColorContext = React.createContext<UseColorType | null>(null)
export const useColorContext = () => useContext(ColorContext)!
export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
   return <ColorContext.Provider value={useColor(new Color({ hex: '#ffffff' }))}>{children}</ColorContext.Provider>
}
