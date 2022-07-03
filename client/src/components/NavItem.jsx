import React from 'react'

const NavItem = ({navItemName}) => {
  return (
    <a href="#">
        <div className="bg-black p-2 rounded cursor-pointer">
            <h3 className="text-xl text-white">{navItemName}</h3>
        </div>
    </a>
  )
}

export default NavItem