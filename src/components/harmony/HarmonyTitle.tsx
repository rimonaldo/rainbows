import React from 'react'
import { SchemeType } from '../../services/harmony/type'

type TitleProps = {
   scheme: SchemeType
}
const Title: React.FC<TitleProps> = ({ scheme }) => {
   return (
      <h2
         // className="title"
         // style={{
         //    color: scheme?.title === 'monochromatic' ? scheme.colors[0] : scheme.colors[2] || scheme.colors[1],
         // }}
      >
         {scheme.title}
      </h2>
   )
}

export default Title
