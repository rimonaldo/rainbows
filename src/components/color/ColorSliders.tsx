import React from 'react'
import { useColorContext } from '../../hooks/useColorContext'
type Props = {
   onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
}

const ColorSliders: React.FC<Props> = ({ onChange }) => {
   const { color,hslVal } = useColorContext()
   return (
      <>
         <input onChange={ev => onChange(ev)} type="range" name="s" value={(color.hsl.s * 100).toFixed(0)} />
         <input onChange={ev => onChange(ev)} type="text" name="s" value={(color.hsl.s * 100).toFixed(0)} />
         <input onChange={ev => onChange(ev)} type="range" name="l" value={(color.hsl.l * 100).toFixed(0)} />
         <input onChange={ev => onChange(ev)} type="text" name="l" value={(color.hsl.l * 100).toFixed(0)} />
      </>
   )
}
export default ColorSliders
