import React from 'react'
import { PaletteType } from '../types'

type Props = {
   paletteIds: string[]
   loadPalette: (paletteId: string) => void
}

const PaletteList = ({ paletteIds, loadPalette }: Props) => {
   const style = {
      border: '1px solid gray',
      display: 'flex',
      'flex-direction': 'column',
   }

   const handleLoadPalette = (paletteId: string) => {
      loadPalette(paletteId)
   }

   return (
      <ul>
         {paletteIds.map((_id,idx) => {
            return (
               <li onClick={() => handleLoadPalette(_id)} key={_id+idx} style={style}>
                  {_id}
               </li>
            )
         })}
      </ul>
   )
}

export default PaletteList
