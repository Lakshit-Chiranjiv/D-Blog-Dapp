import React from 'react'
import Loader from './Loader'

const BlogCard = ({bid,title,snip,readBy,ownerShort,readBlogHandler,saleStatus,readBlogLoader}) => {
  return (
    <div className='bg-white rounded-lg shadow-2xl py-4 px-6 flex-1 text-left hover:scale-95 transition-all'>
        <h3 className="text-2xl mb-2">{title}</h3>
        <p className="text-sm mb-4">{snip}</p>
        <div className="flex justify-between items-center mt-4">
            <div className="mb-4">
                <p className='text-sm'>read by : <span className='text-purple-500 text-md'>{Number(readBy.toString())}</span></p>
                <p className='text-sm'>Owner : <span className='text-indigo-500 text-md'>{ownerShort}</span></p>
                {
                  saleStatus?
                  <div className='w-2 h-2 mt-2 rounded-full bg-green-500'></div>:
                  <div className='w-2 h-2 mt-2 rounded-full bg-red-500'></div>
                }
            </div>
            {
              readBlogLoader ?
              <Loader/>:
              <button className='bg-purple-300 p-2 px-4 rounded hover:scale-95 hover:bg-purple-500 hover:text-white transition-all' onClick={()=>{readBlogHandler(bid)}}>Read</button>
            }
        </div>
    </div>
  )
}

export default BlogCard