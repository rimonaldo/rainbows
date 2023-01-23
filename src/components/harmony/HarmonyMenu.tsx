import React, { useState } from 'react'
import { HarmonyTitle } from '../../types/HarmonyType'
import uuid from 'react-uuid'

type MenuProps = {
   setTab: (scheme: HarmonyTitle) => void
}
const HarmonyMenu: React.FC<MenuProps> = ({ setTab }) => {
   const [activeTab, setActiveTab] = useState<string>('analogous')
   const tabs = [HarmonyTitle.Analogous, HarmonyTitle.Triadic, HarmonyTitle.Complementary, HarmonyTitle.Monochromatic]

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
               >
                  <span> {tab}</span>
               </li>
            )
         })}
      </ul>
   )
}

export default HarmonyMenu
