import React from 'react'
import BlogCard from './BlogCard'

const BlogList = () => {
  return (
    <section className='my-8 mx-16 py-4' id='bloglist'>
        <h2 className='text-4xl text-white mb-6 border-b-2 border-gray-400 p-2'>Published D-Blogs</h2>
        <section className='gap-10 flex-wrap grid lg:grid-cols-3 md:grid-cols-2'>
            <BlogCard title='Blog title' snip='blog snippet' readBy={342} ownerShort='rrcs...4f3'/>
            <BlogCard title='Blog title' snip='blog snippet' readBy={342} ownerShort='rrcs...4f3'/>
            <BlogCard title='Blog title' snip='blog snippet' readBy={342} ownerShort='rrcs...4f3'/>
            <BlogCard title='Blog title' snip='blog snippet' readBy={342} ownerShort='rrcs...4f3'/>
            <BlogCard title='Blog title' snip='blog snippet' readBy={342} ownerShort='rrcs...4f3'/>
        </section>
    </section>
  )
}

export default BlogList