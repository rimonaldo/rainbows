import React, { useState, useEffect } from 'react'
import { ColorStyleType } from '../types'

type Props = {
   minValue: number
   maxValue: number
   setMinValue: (value: number) => void
   setMaxValue: (value: number) => void
}

export function RangeSlider({ minValue, maxValue, setMinValue, setMaxValue }: Props) {
   const handleMinRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setMinValue(+e.target.value)
   }

   const handleMaxRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setMaxValue(+e.target.value)
   }

   return (
      <div className="range">
         <div className="range-input">
            <input
               type="range"
               className="min"
               min="0"
               max="1"
               value={minValue}
               step="0.01"
               onChange={handleMinRangeChange}
            />
            <input
               type="range"
               className="max"
               min="0"
               max="1"
               value={maxValue}
               step="0.01"
               onChange={handleMaxRangeChange}
            />
         </div>
         <div className="range-price">
            <input step="0.01" type="number" name="min" value={minValue} onChange={e => setMinValue(+e.target.value)} />
            <input step="0.01" type="number" name="max" value={maxValue} onChange={e => setMaxValue(+e.target.value)} />
         </div>
      </div>
   )
}
