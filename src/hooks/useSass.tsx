// import React, { useContext, useState, useEffect } from 'react'
// import { Color } from '../services/color'
// import { ColorType, hex, hsl, rgb, hsv } from '../services/color/type'

export const setSassVariable = (variable: string, value: string) => {
   const root = document.documentElement
   root.style.setProperty(variable, value)
}

export type Shade = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

export enum SassVariable {
   primary = '--primary',
   secondary = '--secondary',
   tertiary = '--tertiary',
   info = '--info',
   success = '--success',
   warning = '--warning',
   error = '--error',
   neutral = '--neutral',
}

export interface SassVariables {
   primary: string
   secondary: string
   tertiary: string
   info: string
   success: string
   warning: string
   error: string
   neutral: string
}

const buildVariablesObject = () => {
   const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900]
   const variables: SassVariables = {} as SassVariables
   const variableObj = {}
}

const useSass = () => {
   return {
      setSassVariable: (variable: string, value: string) => {
         buildVariablesObject()
         setSassVariable(variable, value)
      },
   }
}

export default useSass
