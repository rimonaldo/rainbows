import { ColorType } from '../types/color'

interface ColorInputProps {
   color: ColorType
   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ColorVals: React.FunctionComponent<ColorInputProps> = ({ color, onChange }) => {
   return (
      <div className="color-vals" style={{ margin: '10rem auto' }}>
         <div className="hex">
            <input type="text" value={color.hex} onChange={onChange} name="" />
         </div>

         <div className="val rgb">
            <div>
               <label>r</label>
               <input type="number" value={color.rgb.r} onChange={onChange} />
            </div>
            <div>
               <label>g</label>
               <input type="number" value={color.rgb.g} onChange={onChange} />
            </div>
            <div>
               <label>b</label>
               <input type="number" value={color.rgb.b} onChange={onChange} />
            </div>
         </div>

         <div className="val hsl">
            <div>
               <label>h</label>
               <input type="number" value={color.hsl.h} onChange={onChange} />
               <label>°</label>
            </div>
            <div>
               <label>s</label>
               <input type="number" value={color.hsl.s * 100} onChange={onChange} />
               <label>%</label>
            </div>
            <div>
               <label>l</label>
               <input type="number" value={color.hsl.l * 100} onChange={onChange} />
               <label>%</label>
            </div>
         </div>

         <div className="val hsl">
            <div>
               <label>h</label>
               <input type="number" value={color.hsv.h} onChange={onChange} />
               <label>°</label>
            </div>
            <div>
               <label>s</label>
               <input type="number" value={color.hsv.s * 100} onChange={onChange} />
               <label>%</label>
            </div>
            <div>
               <label>v</label>
               <input type="number" value={color.hsv.v * 100} onChange={onChange} />
               <label>%</label>
            </div>
         </div>
      </div>
   )
}

export default ColorVals
