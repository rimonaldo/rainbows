import React from 'react'
import { useColorContext } from '../../hooks/useColorContext'
import Slider from '../../features/Slider'
import { ColorType } from '../../types/ColorType'
type Props = {
   onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
   color: ColorType
}

const ColorSliders: React.FC<Props> = ({ onChange, color }) => {
   const hue = +color.hsl.h.toFixed(0)
   const saturation = +(color.hsl.s * 100).toFixed(0)
   const luminance = +(color.hsl.l * 100).toFixed(0)
   return (
      <>
         <Slider value={hue} slide={'h'} onChange={ev => onChange(ev)} max={360} />
         <Slider value={saturation} slide={'s'} onChange={ev => onChange(ev)} />
         <Slider value={luminance} slide={'l'} onChange={ev => onChange(ev)} />
      </>
   )
}
export default ColorSliders
