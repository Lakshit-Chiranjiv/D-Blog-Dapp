
import { useState } from 'react'
import './App.css'
import About from './components/About'
import BlogDetailPage from './components/BlogDetailPage'
import BlogList from './components/BlogList'
import CreatePage from './components/CreatePage'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Nav from './components/Nav'

function App() {
  const [page,setPage] = useState('home')
  const [blogTitleInput,setBlogTitleInput] = useState('')
  const [blogBodyInput,setBlogBodyInput] = useState('')
  const [blogPriceInput,setBlogPriceInput] = useState(0)
  const [blogSaleInput,setBlogSaleInput] = useState(false)

  return (
    <div className="App bg-gradient-to-tl from-slate-500 via-gray-700 to-neutral-400 mb-0">
      <Nav setPage={setPage}/>
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
        <BlogDetailPage title='Blog Title' body='lorem ipsum' creator='4f33...fv2' owner='4f33...fv2' onSale={true}/>
      }
      <Footer/>
    </div>
  )
}

export default App
