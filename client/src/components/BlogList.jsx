import React from 'react'
import BlogCard from './BlogCard'
import { snipetizeBody } from './../util/snipetizeBody.js'
import { addressReducer } from './../util/addressReducer.js'
import Loader from './Loader'

const BlogList = ({allBlogs,readBlogHandler,account,blogsLoader,readBlogLoader}) => {
  return (
    <section className='my-8 mx-16 py-4' id='bloglist'>
        <h2 className='text-4xl text-white mb-6 border-b-2 border-gray-400 p-2'>Published D-Blogs</h2>
        {
          blogsLoader ?
          <Loader/>:
          <section className='gap-10 flex-wrap grid lg:grid-cols-3 md:grid-cols-2'>
              {/* <BlogCard title='Blog title' snip='blog snippet' readBy={342} ownerShort='rrcs...4f3'/>
              <BlogCard title='Blog title' snip='blog snippet' readBy={342} ownerShort='rrcs...4f3'/>
              <BlogCard title='Blog title' snip='blog snippet' readBy={342} ownerShort='rrcs...4f3'/>
              <BlogCard title='Blog title' snip='blog snippet' readBy={342} ownerShort='rrcs...4f3'/>
              <BlogCard title='Blog title' snip='blog snippet' readBy={342} ownerShort='rrcs...4f3'/> */}
              {
                allBlogs.map((blog,i) => (
                  <BlogCard bid={blog.id} title={blog.title} snip={snipetizeBody(blog.body)} readBy={blog.readBy} ownerShort={addressReducer(blog.owner)} key={i} readBlogHandler={readBlogHandler} saleStatus={blog.onSale} readBlogLoader={readBlogLoader}/>
                ))
              }
          </section>
        }
        {
          (allBlogs == 0 && account && !blogsLoader) &&
          <p className='text-sm text-yellow-600 bg-white p-4 rounded my-4'>No Published Blogs 😕</p>
        }
        {
          (!account) && 
          <p className='text-sm text-purple-600 bg-white p-4 rounded my-4'>Connect your wallet 👛</p>
        }
    </section>
  )
}

export default BlogList