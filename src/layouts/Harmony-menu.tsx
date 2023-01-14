import React, { useState } from 'react'
type HarmoniesProps = {
   setTab: (scheme: string) => void
}
const Harmonies: React.FC<HarmoniesProps> = ({ setTab }) => {
   const [activeTab, setActiveTab] = useState<string>('monochromatic')

   const handleTabClick = (tab: string) => {
      setActiveTab(tab)
      setTab(tab)
   }
   const tabs = ['triadic', 'analogous', 'analogous', 'analogous', 'complementary', 'monochromatic']
   // const tabs = ['triadic',  'analogous', 'complementary', 'monochromatic']
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

export default Harmonies
