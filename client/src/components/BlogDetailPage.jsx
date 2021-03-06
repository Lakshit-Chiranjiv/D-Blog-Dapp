import React from 'react'
import { useContext } from 'react'
import { DetailContext } from '../App.jsx'
import Button from './Button'


const BlogDetailPage = () => {

    const detailContextValues = useContext(DetailContext)
    const {title,body,price,creator,owner,readBy,onSale} = detailContextValues

  return (
    <section className='bg-white rounded-xl p-8 mx-16 my-8'>
        <h1 className='text-5xl p-3 border-gray-400 border-b text-left mb-8'>{title}</h1>
        <p className="text-left">{body}</p>

        <div className="flex justify-center items-center p-4 my-6">
            <img src="./../../assets/reading.svg" alt="reading" className='w-96' />
        </div>

        <div className="flex gap-12 justify-evenly items-center my-6">
            <div className="">
                <h4 className="text-2xl">Creator</h4>
                <h5 className="text-xl text-purple-400">{creator}</h5>
            </div>
            <div className="">
                <h4 className="text-2xl">Owner</h4>
                <h5 className="text-xl text-purple-400">{owner}</h5>
            </div>
            <div className="">
                <h4 className="text-2xl">Read by</h4>
                <h5 className="text-xl text-green-400">{readBy}</h5>
            </div>
            <div className="">
                {
                    onSale ?
                    <h4 className="text-2xl bg-green-400 p-4 rounded">On Sale</h4>:
                    <h4 className="text-2xl bg-red-400 p-4 rounded">Not On Sale</h4>
                }
            </div>
        </div>

        <a href="#" onClick={()=>{
            console.log(detailContextValues)
        }}>
            <Button btnText={`Buy Blog at ${price} ETH`} txtSize='xl' extraClasses='mt-6 bg-green-400 shadow-none w-full hover:bg-gradient-to-bl from-gray-200 via-gray-900 to-green-600'/>
        </a>
    </section>
  )
}

export default BlogDetailPage