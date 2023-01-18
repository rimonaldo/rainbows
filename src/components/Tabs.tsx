import React, { useState, useEffect } from 'react'

type ColorScheme = 'monochromatic' | 'analogous' | 'complementary' | 'compound' | 'triadic'

const Tabs: React.FC<{ setTab: (scheme: string) => void }> = ({ setTab }) => {
   const [activeTab, setActiveTab] = useState<string>('monochromatic')

   const handleTabClick = (tab: string) => {
      setActiveTab(tab)
      setTab(tab)
   }

   const tabs = ['triadic', 'analogous', 'analogous', 'analogous', 'complementary', 'monochromatic']

   return (
      <>
            {tabs?.map((tab, i) => {
               return (
                  <li
                     className={`option-${i + 1} tab ${activeTab === tab ? 'active' : ''}`}
                     onClick={() => handleTabClick(tab)}
                  >
                     {tab}
                  </li>
               )
            })}
      </>
   )

   // return (
   //    <div className="tabs">
   //       <button
   //          className={`tab ${activeTab === 'monochromatic' ? 'active' : ''}`}
   //          onClick={() => handleTabClick('monochromatic')}
   //       >
   //          Monochromatic
   //       </button>
   //       <button
   //          className={`tab ${activeTab === 'analogous' ? 'active' : ''}`}
   //          onClick={() => handleTabClick('analogous')}
   //       >
   //          Analogous
   //       </button>
   //       <button
   //          className={`tab ${activeTab === 'complementary' ? 'active' : ''}`}
   //          onClick={() => handleTabClick('complementary')}
   //       >
   //          Complementary
   //       </button>
   //       {/* <button
   //          className={`tab ${activeTab === 'compound' ? 'active' : ''}`}
   //          onClick={() => handleTabClick('compound')}
   //       >
   //          Compound
   //       </button> */}
   //       <button className={`tab ${activeTab === 'triadic' ? 'active' : ''}`} onClick={() => handleTabClick('triadic')}>
   //          Triadic
   //       </button>
   //    </div>
   // )
}

export default Tabs
