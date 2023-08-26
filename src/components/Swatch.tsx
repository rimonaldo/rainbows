import React, { useEffect, useState } from 'react'
import {
   PaletteColorRole,
   PaletteColorStyle,
   PaletteColorType,
   CustomStyleType,
   hex,
   ColorStyleType,
   hsl,
} from '../types'
import { CiUnlock } from 'react-icons/ci'
import { CiLock } from 'react-icons/ci'
import { IoColorPaletteOutline } from 'react-icons/io5'
import useDebounce from '../hooks/useDebounce'
import { usePaletteStore } from '../store/usePaletteStore'
import { add } from 'lodash'
import useCustomStyle from '../hooks/useCustomStyle'
import CustomStyleForm from './CustomStyleForm'

type Props = {
   color: PaletteColorType
   onLock: (role: PaletteColorRole, newLockState: boolean) => void
   onColorChange: (role: PaletteColorRole, hex: hex) => void
   onStyleAdd: (role: PaletteColorRole, style: ColorStyleType) => void
   onStyleChange: (role: PaletteColorRole, style: ColorStyleType) => void
}

const Swatch: React.FC<Props> = React.memo(
   ({ color, onLock, onColorChange, onStyleChange: handleStyleChange, onStyleAdd }) => {
      const [colorHex, setColorHex] = useState(color.hex)
      const debouncedHex = useDebounce(colorHex, 200)
      const [isStyleOptionsOpen, setIsStyleOptionsOpen] = useState(false)
      const [styleName, setStyleName] = useState(color.style)
      const [customStyles, setCustomStyles] = useState<string[]>([])
      const [isChanged, setIsChanged] = useState(false)

      const handleLock = () => {
         onLock(color.role, !color.isLocked)
      }

      const handleColorChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
         setColorHex(ev.target.value)
      }

      useEffect(() => {
         onColorChange(color.role, debouncedHex)
      }, [debouncedHex])

      useEffect(() => {
         setCustomStyles(Object.keys(color.customStyles))
      }, [color.customStyles, isChanged])

      const onStyleChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
         if (ev.target.value === 'addRule') {
            setIsStyleOptionsOpen(true)
            return
         }
         setIsStyleOptionsOpen(false)

         const newCustomStyle = color.customStyles[ev.target.value as PaletteColorStyle]
         handleStyleChange(color.role, newCustomStyle)
      }

      const onAddStyle = (newCustomStyle: ColorStyleType) => {
         onStyleAdd(color.role, newCustomStyle)
         setIsChanged(!isChanged)

         // setCustomStyles(Object.keys(color.customStyles))
      }

      const handleStyleNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
         setStyleName(ev.target.value as PaletteColorStyle)
      }

      const handleClose = () => {
         setIsStyleOptionsOpen(false)
      }

      const isBrightHSL = (hsl: hsl) => {
         return hsl.l > 0.5
      }

      return (
         <li className="swatch">
            <div className="color" style={{ background: color.shade[500].hex }}>
               <div
                  style={{
                     color: isBrightHSL(color.color.hsl) ? 'black' : 'white',
                     background: color.shade[500].hex,
                     borderRadius: '30%',
                  }}
                  onMouseUp={handleLock}
                  className={`lock ${color.isLocked ? 'locked' : ''}`}
               >
                  {color.isLocked ? <CiLock /> : <CiUnlock />}
               </div>
               <input value={color.hex} type="color" onChange={handleColorChange} />
            </div>
            <div className="bottom-line">
               <select onChange={onStyleChange} value={color.style} name="selectStyle">
                  <option value="random">random</option>
                  {customStyles.map(styleName => (
                     <option key={styleName} value={styleName}>
                        {styleName}
                     </option>
                  ))}
                  <option value="addRule">+ Add Style</option>
               </select>

               <CustomStyleForm
                  onStyleChange={(style: ColorStyleType) => onAddStyle(style)}
                  onClose={handleClose}
                  isOpen={isStyleOptionsOpen}
                  style={color.activeStyle}
               />

               {/* <div className={isStyleOptionsOpen ? 'options' : 'hidden'}>
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
            </div> */}
               {/* <select name="" id="">
               <option value="random">random</option>
               <option value="pastel">pastel</option>
               <option value="jewel">jewel</option>
               <option value="earth">earth</option>
               <option value="neon">neon</option>
            </select> */}

               <div className="actions">
                  <div onMouseUp={handleLock} className="lock">
                     {color.isLocked ? <CiLock /> : <CiUnlock />}
                  </div>
               </div>
            </div>
         </li>
      )
   }
)

export default Swatch
