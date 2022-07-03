import React from 'react'

const BlogCard = ({title,snip,readBy,ownerShort}) => {
  return (
    <div className='bg-white rounded-lg shadow-2xl py-4 px-6 flex-1 text-left hover:scale-95 transition-all'>
        <h3 className="text-2xl mb-2">{title}</h3>
        <p className="text-sm mb-4">{snip}</p>
        <div className="flex justify-between items-center">
            <div className="mb-4">
                <p className='text-sm'>read by : <span className='text-purple-500 text-md'>{readBy}</span></p>
                <p className='text-sm'>Owner : <span className='text-indigo-500 text-md'>{ownerShort}</span></p>
            </div>
            <button className='bg-purple-300 p-2 rounded hover:scale-95 hover:bg-purple-500 hover:text-white transition-all'>Read</button>
        </div>
    </div>
  )
}

export default BlogCard