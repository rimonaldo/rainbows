import { ColorType } from "../types/color"

const ColorVals = ({ color }: { color: ColorType }) => {
   return (
      <div className="color-vals">
         <div className="hex">{color.hex}</div>

         <br />

         <div className="val rgb">
            <div>r {color.rgb.r}</div>
            <div>g {color.rgb.g.toFixed(0)}</div>
            <div>b {color.rgb.b.toFixed(0)}</div>
         </div>

         <br />

         <div className="val hsl">
            <div>h {color.hsv.h}°</div>
            <div>s {(color.hsv.s * 100).toFixed(0)}%</div>
            <div>v {(color.hsv.v * 100).toFixed(0)}%</div>
         </div>

         <br />

         <div className="val hsv">
            <div>h {color.hsv.h}°</div>
            <div>s {(color.hsv.s * 100).toFixed(0)}%</div>
            <div>v {(color.hsv.v * 100).toFixed(0)}%</div>
         </div>
      </div>
   )
}

export default ColorVals