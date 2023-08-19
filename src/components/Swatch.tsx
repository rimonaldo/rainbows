import React, { useEffect, useState } from 'react'
import { PaletteColorRole, PaletteColorStyle, PaletteColorType, StylerType, hex } from '../types'
import { CiUnlock } from 'react-icons/ci'
import { CiLock } from 'react-icons/ci'
import { IoColorPaletteOutline } from 'react-icons/io5'
import useDebounce from '../hooks/useDebounce'
import { paletteStyle } from '../services/PaletteColor.service'
import { usePaletteStore } from '../store/usePaletteStore'
import { add } from 'lodash'

type Props = {
   color: PaletteColorType
   onLock: (role: PaletteColorRole, newLockState: boolean) => void
   onColorChange: (role: PaletteColorRole, hex: hex) => void
   onStyleAdd: (role: PaletteColorRole, style: StylerType) => void
   handleStyleChange: (role: PaletteColorRole, style: PaletteColorStyle) => void
}

const Swatch: React.FC<Props> = React.memo(({ color, onLock, onColorChange, handleStyleChange, onStyleAdd }) => {
   const [colorHex, setColorHex] = useState(color.hex)
   const debouncedHex = useDebounce(colorHex, 200)
   const [style, setStyle] = useState(color.style)
   const [isStyleOptionsOpen, setIsStyleOptionsOpen] = useState(false)
   const [styleName, setStyleName] = useState(color.style)
   const [customStyles, setCustomStyles] = useState<string[]>([])
   const [satMin, setSatMin] = useState<number>(color.styleRange.sat.min * 100)
   const [satMax, setSatMax] = useState<number>(color.styleRange.sat.max * 100)
   const [lumMin, setLumMin] = useState<number>(color.styleRange.lum.min * 100)
   const [lumMax, setLumMax] = useState<number>(color.styleRange.lum.max * 100)
   const { addStyle } = usePaletteStore()
   const handleLock = () => {
      onLock(color.role, !color.isLocked)
   }

   const isValidStyle = (style: string): style is PaletteColorStyle => {
      console.log('style', style)

      return style in paletteStyle
   }

   const handleColorChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      ev.preventDefault()
      ev.stopPropagation()
      setColorHex(ev.target.value)
   }

   useEffect(() => {
      onColorChange(color.role, debouncedHex)
   }, [debouncedHex])

   useEffect(() => {
      setCustomStyles(Object.keys(color.customStyles))
      console.log('added custom style')
   }, [color.customStyles])

   const onStyleChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
      console.log(isStyleOptionsOpen)
      if (ev.target.value === 'addRule') {
         console.log(isStyleOptionsOpen)

         setIsStyleOptionsOpen(true)
         return
      }
      setIsStyleOptionsOpen(false)
      handleStyleChange(color.role, ev.target.value as PaletteColorStyle)
      // console.log('ev.target.value', ev.target.value);
   }

   const onAddStyle = () => {
      // console.log('addStyle')

      // onStyleChange({ target: { value: styleName } } as any)
      let newStyler: StylerType = {
         [styleName]: {
            sat: {
               min: 0,
               max: 1,
            },
            lum: {
               min: 0,
               max: 1,
            },
         },
      }
      onStyleAdd(color.role, newStyler)
      setCustomStyles(Object.keys(color.customStyles))
   }
   const handleStyleNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      setStyleName(ev.target.value as PaletteColorStyle)
   }

   return (
      <li className="swatch">
         <div className="color" style={{ background: color.shade[500].hex }}></div>
         <div className="bottom-line">
            <select onChange={onStyleChange} value={color.style} name="selectStyle">
               <option value="random">random</option>
               <option value="pastel">pastel</option>
               <option value="jewel">jewel</option>
               <option value="earth">earth</option>
               <option value="neon">neon</option>
               {customStyles.map(style => (
                  <option key={style} value={style}>
                     {style}
                  </option>
               ))}
               <option value="addRule">+ Add Rule</option>
            </select>
            <div className={isStyleOptionsOpen ? 'options' : 'hidden'}>
               <input type="text" value={styleName} className="style-name" onChange={handleStyleNameChange} />

               <div className="style-sat">
                  <input type="text" value={color.styleRange.sat.min * 100} />
                  <input type="text" value={color.styleRange.sat.max * 100} />
               </div>

               <div className="style-lum">
                  <div className="min"></div>
                  <div className="max"></div>
               </div>

               <div className="add" onClick={onAddStyle}>
                  +
               </div>
               <div className="remove">-</div>
            </div>
            {/* <select name="" id="">
               <option value="random">random</option>
               <option value="pastel">pastel</option>
               <option value="jewel">jewel</option>
               <option value="earth">earth</option>
               <option value="neon">neon</option>
            </select> */}

            <div className="actions">
               <div className="color-picker">
                  <input value={color.hex} type="color" onChange={handleColorChange} />
                  <IoColorPaletteOutline />
               </div>
               <div onMouseUp={handleLock} className="lock">
                  {color.isLocked ? <CiLock /> : <CiUnlock />}
               </div>
            </div>
         </div>
      </li>
   )
})

export default Swatch
