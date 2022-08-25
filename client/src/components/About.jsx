import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="my-8 text-white mx-16">
        <h2 className='text-3xl my-4 mb-6'>About Me</h2>
        <p>Hello All, I am <span className='text-purple-300'>Lakshit Chiranjiv Sagar</span>, too much passionate about <span className='text-purple-300'>Software Development</span></p><br /><br />

        <p>This is a <span className='text-purple-300'>Decentralized Blog Web Application</span> which rewards users and allows them to write and store their blogs on <span className="text-purple-300">ethereum blockchain</span>. I built this using <span 
        className="text-purple-300">React JS</span> and <span className="text-purple-300">Hardhat</span>. Also I am using <span className='text-purple-300'>Alchemy</span> as a node provider.</p><br /><br />

        <p>This Application allows user to create blogs with a fees and when someone reads that blog, the owner earns a small amount everytime. Here users can also sell there blogs and on each blog transaction almost 90% of listed blog price is given to the blog owner and 10% amount is earned by this application owner. Its a very dynamic application and I hope the users will love to use this.</p>

        <h3 className='text-xl my-4 mt-8'>Contact Me</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 justify-items-center gap-8 my-8">
            <a href="#" className='bg-black p-2 px-6 min-w-[150px] rounded hover:scale-105 transition-all'>Github</a>
            <a href="#" className='bg-blue-600 p-2 px-6 min-w-[150px] rounded hover:scale-105 transition-all'>LinkedIn</a>
            <a href="#" className='bg-sky-400 p-2 px-6 min-w-[150px] rounded hover:scale-105 transition-all'>Twitter</a>
        </div>

        <Link to='/'>
          <button className="bg-purple-500 p-4 w-full rounded-lg my-6 hover:scale-95 transition-all">Head Over to the Home</button>
        </Link>

    </div>
  )
}

export default About