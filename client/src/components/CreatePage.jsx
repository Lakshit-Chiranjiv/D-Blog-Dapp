import React from 'react'
import Button from './Button'

const CreatePage = ({blogTitleInput,setBlogTitleInput,blogBodyInput,setBlogBodyInput,blogSaleInput,setBlogSaleInput}) => {
  return (
    <section className='mx-16 my-8'>
        <h2 className='text-3xl text-white '>Create your Blog </h2>
        <div className="flex justify-center items-center gap-16">
            <img src="./../assets/publish.svg" alt="publish" className='w-96' />
            <div className="p-6">
                <label htmlFor="name" className='text-left text-white '>Blog Title</label>
                <input type="text" className='w-full my-2 rounded p-4 h-12 border-none mb-6' value={blogTitleInput} onChange={(e) => {setBlogTitleInput(e.target.value)}}/>
                <label htmlFor="name" className='text-left text-white '>Blog Body</label>
                <textarea name="body" id="blogbody" cols="30" rows="10" className='my-2 w-full rounded p-4 border-none mb-6 h-48' value={blogBodyInput} onChange={(e) => {setBlogBodyInput(e.target.value)}}></textarea>
                <div className="flex justify-center items-center gap-2 mb-6">
                    <input type="checkbox" name="onsale" id="onsale" className='h-6 w-8' checked={blogSaleInput} onChange={(e)=>{setBlogSaleInput(e.target.checked)}}/>
                    <label htmlFor="onsale" className='text-white'>On sale</label>
                </div>
                <Button extraClasses='w-full' btnText='Publish Blog' txtSize='lg'/>
            </div>
        </div>
    </section>
    )
}

export default CreatePage