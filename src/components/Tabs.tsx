import React, { useState } from 'react'

type ColorScheme = 'monochromatic' | 'analogous' | 'complementary' | 'compound' | 'triadic'

const Tabs: React.FC<{ color: string; setTab: (scheme: string) => void }> = ({ color, setTab }) => {
   const [activeTab, setActiveTab] = useState<ColorScheme>('monochromatic')

   const handleTabClick = (scheme: ColorScheme) => {
      setActiveTab(scheme)
      setTab(scheme)
   }

   return (
      <div className="tabs">
         <button
            className={`tab ${activeTab === 'monochromatic' ? 'active' : ''}`}
            onClick={() => handleTabClick('monochromatic')}
         >
            Monochromatic
         </button>
         <button
            className={`tab ${activeTab === 'analogous' ? 'active' : ''}`}
            onClick={() => handleTabClick('analogous')}
         >
            Analogous
         </button>
         <button
            className={`tab ${activeTab === 'complementary' ? 'active' : ''}`}
            onClick={() => handleTabClick('complementary')}
         >
            Complementary
         </button>
         <button
            className={`tab ${activeTab === 'compound' ? 'active' : ''}`}
            onClick={() => handleTabClick('compound')}
         >
            Compound
         </button>
         <button className={`tab ${activeTab === 'triadic' ? 'active' : ''}`} onClick={() => handleTabClick('triadic')}>
            Triadic
         </button>
      </div>
   )
}

export default Tabs
