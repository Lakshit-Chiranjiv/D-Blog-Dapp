import React from 'react'
import { addressReducer } from '../util/addressReducer'
import Button from './Button'
import Loader from './Loader'
import blogImg from './../assets/blog.svg'

const Hero = ({account,connectMsg,connectWallet,connectWalletLoader}) => {

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 items-center gap-12 py-6 mb-8 mx-16'>
        <img src={blogImg} alt="" className='w-96'/>
        <div>
          {
            connectWalletLoader ? 
            <Loader/>:
            <>
              {
                !account && 
                <a href="#" onClick={connectWallet}>
                    <Button btnText='Connect With Metamask' txtSize='xl'/>
                </a>  
              }
              {
                account &&
                <p className='text-sm text-green-500 bg-white p-4 rounded mt-4'>Connected <br /> {((window.innerWidth < 1025 && window.innerWidth > 767) || (window.innerWidth < 565))?addressReducer(account):account}</p>
              }
              {
                connectMsg && 
                <p className='text-sm text-red-600 bg-white p-4 rounded mt-4'>Some error occured <br /> {connectMsg}</p>
              }
            </>
          }
        </div>
    </section>
  )
}

export default Hero