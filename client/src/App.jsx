
import { ethers } from 'ethers'
import { createContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import About from './components/About'
import BlogDetailPage from './components/BlogDetailPage'
import BlogList from './components/BlogList'
import CreatePage from './components/CreatePage'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Nav from './components/Nav'
import dblogAbi from './util/dblogContract.json'

export const DetailContext = createContext()

const dblogContractAddress = '0x93354F774D4D91ddEa0CF6c86541406280571Ded'
const dblogContractABI = dblogAbi.abi

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

  //message
  const [connectMsg,setConnectMsg] = useState('')
  const [publishMsg,setPublishMsg] = useState('')

  //account
  const [account,setAccount] = useState('')

  //blogs
  const [allBlogs,setAllBlogs] = useState([])

  const detailContextValue = {
    title: detailPageTitle,
    body: detailPageBody,
    price: detailPagePrice,
    creator: detailPageCreator,
    owner: detailPageOwner,
    readBy: detailPageReadBy,
    onSale: detailPageSale
  }

  const checkWalletConnection = async () => {
    try {
      const { ethereum } = window

      if(ethereum){
        console.log("ethereum object exists : ",ethereum)
      }
      else{
        console.log("ethereum object doesn't exists, No wallet found")
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if(accounts.length != 0){
        const userAccount = accounts[0]
        console.log("User connected and authorized with account : "+userAccount)
        setConnectMsg("")
        setAccount(userAccount)
        getAllBlogs()
      }
      else{
        console.log("No user accounts connected or authorized")
      }

    } catch (error) {
      console.log("Message : "+error)
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if(!ethereum){
        console.log("No Wallet found, Install Metamask")
        setConnectMsg("No Wallet found, Install Metamask")
      }
      else{
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        const userAccount = accounts[0]
        console.log("Connected account : "+userAccount)
        setConnectMsg("")
        setAccount(userAccount)
        getAllBlogs()
      }
    } catch (error) {
      console.log(error)
      setConnectMsg("Connection Error")
    }

  }

  const getAllBlogs = async () => {
    try {
      const { ethereum } = window

      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const dblogContract = new ethers.Contract(dblogContractAddress,dblogContractABI,signer)

        const blogList = await dblogContract.getAllBlogs()

        const furnishedBlogList = blogList.map(blog => (
          {
            id: blog.blogId,
            title: blog.blogTitle,
            body: blog.blogBody,
            owner: blog.blogOwner,
            creator: blog.blogCreator,
            readBy: blog.numOfReads,
            price: blog.salePrice,
            onSale: blog.onSale
          }
        ))
        console.log(furnishedBlogList)
        setAllBlogs(furnishedBlogList.reverse())
        // setListLoading(false)
      }
      else{
        console.log("Ethereum object not found, Install Metamask")
      }

    } catch (error) {
        console.log("Some error occured : "+error)
    }
  }

  const readBlogHandler = async (blogId) => {
    try {
      const { ethereum } = window

      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const dblogContract = new ethers.Contract(dblogContractAddress,dblogContractABI,signer)

        await dblogContract.readBlog(blogId);
        setPage('details')
      }

    } catch (error) {
        console.log("Some error occured : "+error)
    }
  }

  const createBlogHandler = async (blogTitle,blogBody,blogPrice,blogOnSale) => {
    try {
      const { ethereum } = window

      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const dblogContract = new ethers.Contract(dblogContractAddress,dblogContractABI,signer)

        let createTxn = await dblogContract.createBlog(blogTitle,blogBody,blogPrice,blogOnSale, { value: ethers.utils.parseEther("0.01") });
        await createTxn.wait()
        getAllBlogs()
      }

    } catch (error) {
        console.log("Some error occured : "+error)
    }
  }

  useEffect(()=>{
    checkWalletConnection()
  },[])


  return (
    <div className="App bg-gradient-to-tl from-slate-500 via-gray-700 to-neutral-400 mb-0">
      <Nav setPage={setPage}/>
      <button onClick={()=>{
        setPage('details')
      }}>click</button>
      {
        page==='home' && 
        <>
          <Hero account={account} connectMsg={connectMsg} connectWallet={connectWallet}/>
          <BlogList allBlogs={allBlogs} readBlogHandler={readBlogHandler} />
        </>
      }
      {
        page==='about' && 
          <About setPage={setPage}/>
      }
      {
        page==='create' &&
        <CreatePage blogTitleInput={blogTitleInput} blogBodyInput={blogBodyInput} setBlogTitleInput={setBlogTitleInput} setBlogBodyInput={setBlogBodyInput} blogPriceInput={blogPriceInput} setBlogPriceInput={setBlogPriceInput} blogSaleInput={blogSaleInput} setBlogSaleInput={setBlogSaleInput} createBlogHandler={createBlogHandler}/>
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
