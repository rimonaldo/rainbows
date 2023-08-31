import React from 'react'
import { Login } from '../components/Login'
import { User } from '../types'
import { usePaletteStore } from '../store/usePaletteStore'
import PaletteList from '../components/PaletteList'
type Props = { user: User | null }

function AdminBox({ user }: Props) {
   const { loadPalette } = usePaletteStore()
   const style = {
      border: '1px solid black',
      margin: 0,
      padding: 0,
   }
   return (
      <div style={style}>
         <Login></Login>
         <input type="checkbox" />
         {/* <PaletteList loadPalette={loadPalette} paletteIds={user?.savedPalettes || []}></PaletteList> */}
      </div>
   )
}

export default AdminBox
