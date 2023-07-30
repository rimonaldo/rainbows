import React, { useContext, useState, useEffect } from 'react'
// import { Color } from '../services/color'

import useSass from './useSass'

export type UseType = ReturnType<typeof useSass>
export type UseColorType = ReturnType<typeof useSass>
const SassContext = React.createContext<UseColorType | null>(null)
export const useSassContext = () => useContext(SassContext)!
export const SassProvider = ({ children }: { children: React.ReactNode }) => {
   return <SassContext.Provider value={useSass()}>{children}</SassContext.Provider>
}
