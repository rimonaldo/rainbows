import React, { useState } from 'react'
type MenuProps = {
   setTab: (scheme: string) => void
}
const HarmonyMenu: React.FC<MenuProps> = ({ setTab }) => {
   const [activeTab, setActiveTab] = useState<string>('monochromatic')
   const tabs = ['triadic', 'analogous', 'complementary', 'monochromatic']
   // const tabs = ['triadic',  'analogous', 'complementary', 'monochromatic']

   const handleTabClick = (tab: string) => {
      setActiveTab(tab)
      setTab(tab)
   }
   return (
      <ul className="harmony-menu layout">
         
         {tabs?.map((tab, i) => {
            return (
               <li
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
