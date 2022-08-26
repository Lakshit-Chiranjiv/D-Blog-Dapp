import React from 'react'
import Button from './Button'
import Loader from './Loader'
import publishImg from './../assets/publish.svg'

const CreatePage = ({blogCreationInputs,handleBlogCreationInput,createBlogHandler,publishBlogLoader,publishMsg}) => {
  return (
    <section className='mx-16 my-8'>
        <h2 className='text-3xl text-white mb-8'>Create your Blog </h2>
        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-16">
            <img src={publishImg} alt="publish" className='w-96' />
            <div className="p-6">
                <label htmlFor="name" className='text-left text-white '>Blog Title</label>
                <input type="text" name='blogTitleInput' className='w-full my-2 rounded p-4 h-12 border-none mb-6' value={blogCreationInputs.blogTitleInput} onChange={handleBlogCreationInput} placeholder='Enter blog title'/>

                <label htmlFor="name" className='text-left text-white '>Blog Body</label>
                <textarea name="blogBodyInput" id="blogbody" cols="30" rows="10" className='my-2 w-full rounded p-4 border-none mb-6 h-48' value={blogCreationInputs.blogBodyInput} onChange={handleBlogCreationInput} placeholder='Enter blog body'></textarea>

                <label htmlFor="price" className='text-left text-white '>Blog Price</label>
                <input type="number" min={2} name='blogPriceInput' className='w-full my-2 rounded p-4 h-12 border-none' value={blogCreationInputs.blogPriceInput} onChange={handleBlogCreationInput}/>
                <p className='text-red-400 mb-6 text-[12px]'>Note : Entered value will be multiplied by 0.001 eth</p>

                <div className="flex justify-center items-center gap-2 mb-6">
                    <input type="checkbox" name="blogSaleInput" id="onsale" className='h-6 w-8' checked={blogCreationInputs.blogSaleInput} onChange={(e)=>{
                        handleBlogCreationInput(e)
                    }}/>
                    <label htmlFor="onsale" className='text-white'>On sale</label>
                </div>

                {
                    publishBlogLoader ? 
                    <Loader/>:
                    <a onClick={()=>{
                        createBlogHandler(blogCreationInputs.blogTitleInput,blogCreationInputs.blogBodyInput,blogCreationInputs.blogPriceInput,blogCreationInputs.blogSaleInput)
                    }}>
                        <Button extraClasses='w-full' btnText='Publish Blog' txtSize='lg'/>
                    </a>
                }
                {
                    publishMsg && 
                    <p className={`${publishMsg === 'Published Successfully'? 'text-green-500': 'text-red-400'}  my-6 text-[12px]`}>{publishMsg}</p>
                }
            </div>
        </div>
    </section>
    )
}

export default CreatePage