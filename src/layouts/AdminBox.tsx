import React from 'react'
import { Login } from '../components/Login'
import { User } from '../types'
import { usePaletteStore } from '../store/usePaletteStore'
import PaletteList from '../components/PaletteList'
type Props = { user: User | null }

function AdminBox({ user }: Props) {
   const { loadPalette } = usePaletteStore()
   return (
      <>
         <Login></Login>
         <input type="checkbox" />
         <PaletteList loadPalette={loadPalette} paletteIds={user?.savedPalettes || []}></PaletteList>
      </>
   )
}

export default AdminBox
