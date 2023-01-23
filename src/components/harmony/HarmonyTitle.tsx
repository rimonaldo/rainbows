import React from 'react'
import { HarmonyType } from '../../types/HarmonyType'

type TitleProps = {
   harmony: HarmonyType
}
const Title: React.FC<TitleProps> = ({ harmony }) => {
   return (
      <h2
         className="title"
         style={{
            color: harmony?.title === 'monochromatic' ? harmony.colors[0] : harmony.colors[2] || harmony.colors[1],
         }}
      >
         {harmony.title}
      </h2>
   )
}

export default Title
