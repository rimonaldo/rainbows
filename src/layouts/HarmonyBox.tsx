import React from 'react'

function HarmonyBox() {
   return (
      <div>
         <div className="container">
            <div className="header"></div>

            <div className="harmony-menu">
               <div className="option-1"></div>
               <div className="option-2"></div>
               <div className="option-3"></div>
               <div className="option-4"></div>
               <div className="option-5"></div>
               <div className="option-6"></div>
            </div>

            <div className="color-container">
               <div className="color-picker"></div>
            </div>
            <div className="harmony-container">
               <div className="title"></div>
               <div className="base-colors"></div>
            </div>

            <div className="palette">
               <div className="primary"></div>
               <div className="accent-1"></div>
               <div className="accent-2"></div>
               <div className="accent-3"></div>
               <div className="typo"></div>
            </div>
         </div>
      </div>
   )
}

export default HarmonyBox
