import React from 'react'
import { IoSettingsOutline } from 'react-icons/io5'
import { Avatar } from '../components/Avatar'
import { useState } from 'react'
import { User } from '../types'
type Props = {
   user: User | null
   toggleMenu: () => void
}

function NavBar({ user, toggleMenu }: Props) {
   return (
      <div className="nav-bar-container">
         <div className="nav-bar ">
            <div className="logo flex-1" onClick={toggleMenu}>
               RAINBOW<span>S</span>
            </div>
            {/* <Avatar user={user}></Avatar> */}

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
