import React from 'react'
import Button from './Button'

const Hero = ({account,connectMsg,connectWallet}) => {
  return (
    <section className='flex gap-12 justify-around items-center py-6 mb-8 mx-16'>
        <img src="../assets/blog.svg" alt="" className='w-96'/>
        <div>
            {
              !account && 
              <a href="#" onClick={connectWallet}>
                  <Button btnText='Connect With Metamask' txtSize='xl'/>
              </a>  
            }
            {
              account &&
              <p className='text-sm text-green-500 bg-white p-4 rounded mt-4'>Connected <br /> {account}</p>
            }
            {
              connectMsg && 
              <p className='text-sm text-red-600 bg-white p-4 rounded mt-4'>Some error occured <br /> {connectMsg}</p>
            }
        </div>
    </section>
  )
}

export default Hero