import React, { useState, useEffect } from 'react'
import { ColorStyleType } from '../types'
import { RangeSlider } from './RangeSlider'
type Props = {
   isOpen: boolean
   style: ColorStyleType
   onClose: () => void
   onStyleChange: (style: ColorStyleType) => void
}

function CustomStyleForm({ isOpen, style, onClose, onStyleChange }: Props) {
   const [satMin, setSatMin] = useState(style.sat.min)
   const [satMax, setSatMax] = useState(style.sat.max)
   const [lumMin, setLumMin] = useState(style.lum.min)
   const [lumMax, setLumMax] = useState(style.lum.max)
   const [styleName, setStyleName] = useState(style.name)

   useEffect(() => {
      setSatMin(style.sat.min)
      setSatMax(style.sat.max)
      setLumMin(style.lum.min)
      setLumMax(style.lum.max)
      setStyleName(style.name)
   }, [style])

   const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const newStyle = {
         [styleName]: {
            name: styleName,
            sat: { min: satMin, max: satMax },
            lum: { min: lumMin, max: lumMax },
         },
      }
      onStyleChange(newStyle[styleName])
   }

   const handleClose = () => {
      onClose()
   }

   const handleNameChange = (name: string) => {
      setStyleName(name)
   }

   return (
      <>
         <form onSubmit={handleFormSubmit} className={isOpen ? 'options' : 'hidden'}>
            <input
               type="text"
               value={styleName}
               className="style-name"
               onChange={ev => handleNameChange(ev.target.value)}
            />

            <div className="add-container">
               <div className="style-values">
                  <RangeSlider
                     minValue={satMin}
                     maxValue={satMax}
                     setMinValue={val => setSatMin(val)}
                     setMaxValue={val => setSatMax(val)}
                  />
                  <RangeSlider
                     minValue={lumMin}
                     maxValue={lumMax}
                     setMinValue={val => setLumMin(val)}
                     setMaxValue={val => setLumMax(val)}
                  />
               </div>

               <button type="submit" className="add">
                  +
               </button>
            </div>

            <button type="button" className="close" onClick={handleClose}>
               X
            </button>
         </form>
      </>
   )
}
export default CustomStyleForm
