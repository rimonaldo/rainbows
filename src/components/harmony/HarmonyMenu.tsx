import React, { useState } from 'react'
import { HarmonyTitle } from '../../services/harmony/type'
import uuid from 'react-uuid'
import { usePaletteContext } from '../../hooks/usePaletteContext'

type MenuProps = {
   setTab: (scheme: HarmonyTitle) => void
}
const HarmonyMenu: React.FC<MenuProps> = ({ setTab }) => {
   const [activeTab, setActiveTab] = useState<string>('analogous')
   const tabs = [HarmonyTitle.Analogous, HarmonyTitle.Triadic, HarmonyTitle.Complementary, HarmonyTitle.Monochromatic]
   const { palette } = usePaletteContext()

   const handleTabClick = (tab: HarmonyTitle) => {
      setActiveTab(tab)
      setTab(tab)
   }

   return (
      <ul className="harmony-menu layout">
         {tabs?.map((tab, i) => {
            return (
               <li
                  key={uuid()}
                  className={`option-${i + 1} tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => handleTabClick(tab)}
                  style={{ color: activeTab === tab ? palette.primary.shade[300].hex : 'white', }}
               >
                  <span> {tab}</span>
               </li>
            )
         })}
      </ul>
   )
}

export default HarmonyMenu
