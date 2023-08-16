import React from 'react'

type Props = {
   isOpen: boolean
}

function SideBar({ isOpen }: Props) {
   return <>{isOpen ? <div className="side-bar">SideBar</div> : null}</>
}

export default SideBar
