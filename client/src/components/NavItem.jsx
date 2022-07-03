import React from 'react'

const NavItem = ({navItemName,linkLoc,navFunc}) => {
  return (
    <a href={linkLoc} onClick={navFunc}>
        <div className="bg-black p-2 rounded cursor-pointer hover:scale-105 transition-all">
            <h3 className="text-xl text-white">{navItemName}</h3>
        </div>
    </a>
  )
}

export default NavItem