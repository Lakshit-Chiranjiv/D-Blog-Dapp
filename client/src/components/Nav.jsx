import React from 'react'
import { useNavigate } from 'react-router-dom'
import NavItem from './NavItem'

const Nav = ({account,getAllBlogs}) => {

  const navigate = useNavigate();

  return (
    <nav className='grid grid-cols-1 md:grid-cols-2 gap-6 py-6 mb-8 mx-16'>
        <a href="#" onClick={()=>{
          getAllBlogs();
          navigate('/')
        }}>
            <div className="bg-black p-4 rounded cursor-pointer">
                <h1 className="text-4xl text-white"><span className='text-6xl'>D</span> Blog</h1>
            </div>
        </a>
        <div className="flex gap-10 items-center justify-center">
            <NavItem navItemName='Read' linkLoc='#bloglist' navFunc={()=>{navigate('/')}}/>
            {
              account &&
              <NavItem navItemName='Create' navFunc={()=>{navigate('/create')}}/>
            }
            <NavItem navItemName='About' navFunc={()=>{navigate('/about')}}/>
        </div>
    </nav>
  )
}

export default Nav