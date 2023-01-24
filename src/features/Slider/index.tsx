import React from 'react'
import { useColorContext } from '../../hooks/useColorContext'
import './slider.scss'
type Props = {
   onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
   value: number
   slide: string
   vertical?: boolean
   min?: number
   max?: number
}

const Slider: React.FC<Props> = ({ onChange, value, slide, max = 100, min = 0 }) => {
   return (
      <>
         <input className='input__vertical' onChange={ev => onChange(ev)} type="range" name={slide} value={value} min={min} max={max} />
         <input onChange={ev => onChange(ev)} type="text" name={slide} value={value} min={min} max={max} />
      </>
   )
}
export default Slider
