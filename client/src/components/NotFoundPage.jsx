import React from 'react'
import { Link } from 'react-router-dom'
import lostImg from './../assets/lost.svg'

const NotFoundPage = () => {
  return (
    <div className='h-screen mx-12'>
        <h2 className='text-5xl my-4 mb-6 text-white'>404 Not Found</h2>
        <p className='text-gray-300'>Seems you are Lost</p>

        <div className="flex justify-center items-center p-4 my-6">
            <img src={lostImg} alt="lost" className='w-96' />
        </div>

        <Link to='/'>
          <button className="bg-purple-500 p-4 w-full rounded-lg my-6 hover:scale-95 transition-all">Head Over to the Home</button>
        </Link>
    </div>
  )
}

export default NotFoundPage