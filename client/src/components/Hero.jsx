import React from 'react'
import Button from './Button'

const Hero = () => {
  return (
    <section className='flex gap-12 justify-around items-center py-6 mb-8 mx-16'>
        <img src="../assets/blog.svg" alt="" className='w-96'/>
        <div>
            <a href="#">
                <Button btnText='Connect With Metamask' txtSize='xl'/>
            </a>
            <p className='text-sm text-red-600 bg-white p-4 rounded mt-4'>Some error occured</p>
            <p className='text-sm text-green-500 bg-white p-4 rounded mt-4'>Connected <br /> 0x279ef018cffdd199d42c68e2df2911f3bb94040f</p>
        </div>
    </section>
  )
}

export default Hero