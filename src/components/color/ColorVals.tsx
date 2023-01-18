import { ColorType } from '../../types/ColorType'
import { Color } from '../../services/color.class'
import { useState, useEffect } from 'react'
import { HexColorInput } from 'react-colorful'
interface ColorInputProps {
   hex: string
   onChange: (hex: string) => void
}

const ColorVals: React.FunctionComponent<ColorInputProps> = ({ onChange, hex }) => {
   const [color, setColor] = useState<ColorType>(new Color(hex))

   useEffect(() => {
      let newColor: ColorType = new Color(hex)
      setColor(newColor)
   }, [hex])

   return (
      <div className="color-vals">
         <div className="hex">
            <div className="ball" style={{ backgroundColor: color.hex }}></div>
            {/* <input type="text" value={color.hex} onChange={onChange} name="" /> */}
            <div className="hex-text">
               <span>#</span>
               <HexColorInput color={color.hex} onChange={onChange} />
            </div>
         </div>

         <div className="box"></div>

         <div className="val rgb">
            <div>
               <label>r</label>
               <input type="number" value={color.rgb.r}  />
            </div>
            <div>
               <label>g</label>
               <input type="number" value={color.rgb.g}  />
            </div>
            <div>
               <label>b</label>
               <input type="number" value={color.rgb.b}  />
            </div>
         </div>

         <div className="val hsl">
            <div>
               <label>h</label>
               <input type="number" value={color.hsl.h.toFixed(0)}  />
            </div>
            <div>
               <label>s</label>
               <input type="number" value={(color.hsl.s * 100).toFixed(0)}  />
            </div>
            <div>
               <label>l</label>
               <input type="number" value={(color.hsl.l * 100).toFixed(0)}  />
            </div>
         </div>

         <div className="val hsv">
            <div>
               <label>h</label>
               <input type="number" value={color.hsv.h}  />
            </div>
            <div>
               <label>s</label>
               <input type="number" value={(color.hsv.s * 100).toFixed(0)}  />
            </div>
            <div>
               <label>v</label>
               <input type="number" value={(color.hsv.v * 100).toFixed(0)}  />
            </div>
         </div>
      </div>
   )
}

export default ColorVals
