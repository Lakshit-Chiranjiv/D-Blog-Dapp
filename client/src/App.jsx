
import { createContext } from 'react'
import { useState } from 'react'
import './App.css'
import About from './components/About'
import BlogDetailPage from './components/BlogDetailPage'
import BlogList from './components/BlogList'
import CreatePage from './components/CreatePage'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Nav from './components/Nav'

export const DetailContext = createContext()

function App() {
  //paging
  const [page,setPage] = useState('home')

  //input fields
  const [blogTitleInput,setBlogTitleInput] = useState('')
  const [blogBodyInput,setBlogBodyInput] = useState('')
  const [blogPriceInput,setBlogPriceInput] = useState(0)
  const [blogSaleInput,setBlogSaleInput] = useState(false)

  //blog details page data
  const [detailPageTitle,setDetailPageTitle] = useState('Blog Title')
  const [detailPageBody,setDetailPageBody] = useState('Blog body lorem ipsum')
  const [detailPagePrice,setDetailPagePrice] = useState(0)
  const [detailPageCreator,setDetailPageCreator] = useState('scsc...3r2')
  const [detailPageOwner,setDetailPageOwner] = useState('scs3...2cs')
  const [detailPageReadBy,setDetailPageReadBy] = useState(0)
  const [detailPageSale,setDetailPageSale] = useState(false)

  const detailContextValue = {
    title: detailPageTitle,
    body: detailPageBody,
    price: detailPagePrice,
    creator: detailPageCreator,
    owner: detailPageOwner,
    readBy: detailPageReadBy,
    onSale: detailPageSale
  }

  return (
    <div className="App bg-gradient-to-tl from-slate-500 via-gray-700 to-neutral-400 mb-0">
      <Nav setPage={setPage}/>
      <button onClick={()=>{
        setPage('details')
      }}>click</button>
      {
        page==='home' && 
        <>
          <Hero/>
          <BlogList/>
        </>
      }
      {
        page==='about' && 
          <About setPage={setPage}/>
      }
      {
        page==='create' &&
        <CreatePage blogTitleInput={blogTitleInput} blogBodyInput={blogBodyInput} setBlogTitleInput={setBlogTitleInput} setBlogBodyInput={setBlogBodyInput} blogPriceInput={blogPriceInput} setBlogPriceInput={setBlogPriceInput} blogSaleInput={blogSaleInput} setBlogSaleInput={setBlogSaleInput}/>
      }
      {
        page==='details' &&
        <DetailContext.Provider value={detailContextValue} >
          <BlogDetailPage/>
        </DetailContext.Provider>
      }
      <Footer/>
    </div>
  )
}

export default App
