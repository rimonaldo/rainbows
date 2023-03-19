import React from 'react'
import { IoSettingsOutline } from 'react-icons/io5'
type Props = {}

function NavBar({}: Props) {
   return (
      <div className="nav-bar-container">
         <div className="nav-bar ">
            <div className="logo flex-1">
               RAINBOW<span>S</span>
            </div>

            <div className="right-container ">
               <button className="setting">
                  <IoSettingsOutline />
               </button>
               <button className="btn-blank">Generate</button>
            </div>
         </div>
      </div>
   )
}

export default NavBar
