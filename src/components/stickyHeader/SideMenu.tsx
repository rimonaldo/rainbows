import React, { useEffect, useState } from 'react'
import './style/side-menu.scss'
import BrandColors from './BrandColorList'

type Props = {
   isOpen: boolean
}

const SideMenu = ({ isOpen }: Props) => {
   const [prevScrollPos, setPrevScrollPos] = useState(0)
   const colorHexs = ['#C14000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF']
   const colorRoles = ['primary', 'secondary', 'neutral', 'success', 'danger', 'warning', 'info']
   const openStyle = {
      transform: 'translateX(0)',
   }

   const closeStyle = {
      transform: 'translateX(-100%)',
   }

   const handleColorChange = (ev: React.ChangeEvent<HTMLInputElement>, role: string) => {
      //   editPaletteColor(role, ev.target.value)
      const newHex = ev.target.value
      console.log(newHex)
   }

   return (
      <div className="mobile-menu" style={{ left: isOpen ? '0' : '-100%' }}>
         <div className="logo">Rainbows</div>
         <BrandColors colorHexs={colorHexs} colorRoles={colorRoles} onColorChange={() => handleColorChange} />
      </div>
   )
}

export default SideMenu
