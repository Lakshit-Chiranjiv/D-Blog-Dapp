import { ethers } from 'ethers'
import React from 'react'
import Button from './Button'
import Loader from './Loader'
import readingImg from './../assets/reading.svg'


const BlogDetailPage = ({detailsPageData,buyBlogHandler,account,addressReducer,changeBlogSaleStatus,saleStatusCheck,setSaleStatusCheck,buyBlogLoader,saleStatusChangeBlogLoader}) => {

    const {id,title,body,price,creator,owner,readBy,onSale} = detailsPageData

  return (
    <section className='bg-white rounded-xl p-8 mx-16 my-8'>
        <h1 className='text-5xl p-3 border-gray-400 border-b text-left mb-8'>{title}</h1>
        <p className="text-left">{body}</p>

        <div className="flex justify-center items-center p-4 my-6">
            <img src={readingImg} alt="reading" className='w-96' />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 items-center my-6">
            <div className="">
                <h4 className="text-2xl">Creator</h4>
                <h5 className="text-xl text-purple-400">{creator}</h5>
            </div>
            <div className="">
                <h4 className="text-2xl">Owner</h4>
                <h5 className="text-xl text-purple-400">{addressReducer(owner)}</h5>
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
        {
            (ethers.utils.getAddress(account) !== owner) ?
            (
                onSale &&
                (
                    buyBlogLoader ?
                    <Loader/>:
                    <a onClick={()=>{
                
                        buyBlogHandler(id,price)
                    }}>
                        <Button btnText={`Buy Blog at ${price} ETH`} txtSize='xl' extraClasses='mt-6 bg-green-400 shadow-none w-full hover:bg-gradient-to-bl from-gray-200 via-gray-900 to-green-600'/>
                    </a>
                )
            ):
            <div className='grid sm:grid-cols-2 justify-items-center items-center'>
                <div className="flex justify-center items-center gap-2 my-6">
                    <input type="checkbox" name="blogSaleStatusChanger" id="onsale" className='h-6 w-8' checked={saleStatusCheck} onChange={(e)=>{
                        setSaleStatusCheck(e.target.checked)
                    }}/>
                    <label htmlFor="onsale" className=''>Put ON/OFF Sale</label>
                </div>
                {
                    saleStatusChangeBlogLoader ?
                    <Loader/>:
                    <button className='bg-gradient-to-tr from-slate-500 via-green-200 to-green-900 p-4 shadow rounded transition-all hover:scale-105 hover:bg-gradient-to-t from-teal-600 via-green-200 to-emerald-600' onClick={()=>{
                    let status = (saleStatusCheck)?1:0;
                    if(onSale !== saleStatusCheck)
                        changeBlogSaleStatus(status,id);
                    else
                        console.log("Same status value");
                    }}>Save new Sale Status</button>
                }
            </div>
        }

    </section>
  )
}

export default BlogDetailPage