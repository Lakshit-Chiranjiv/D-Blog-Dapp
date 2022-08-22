import React from 'react'
import NavItem from './NavItem'

const Nav = ({}) => {
  return (
    <nav className='flex justify-around items-center py-6 mb-8 mx-16'>
        <a href="#" onClick={()=>{}}>
            <div className="bg-black p-4 rounded cursor-pointer">
                <h1 className="text-4xl text-white"><span className='text-6xl'>D</span> Blog</h1>
            </div>
        </a>
        <div className="flex gap-10 items-center">
            <NavItem navItemName='Read' linkLoc='#bloglist' navFunc={()=>{}}/>
            <NavItem navItemName='Create' navFunc={()=>{}}/>
            <NavItem navItemName='About' navFunc={()=>{}}/>
        </div>
    </nav>
  )
}

export default Nav