
import { ethers } from 'ethers'
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
import { addressReducer } from './util/addressReducer'
import { Route, Routes, useNavigate } from 'react-router-dom'
import NotFoundPage from './components/NotFoundPage'
import Loader from './components/Loader'

const dblogContractAddress = '0x46bD031d1eCc579b60baA10BFDac37D2eA926bC2'
const dblogContractABI = dblogAbi.abi

function App() {

  const navigate = useNavigate();

  //input fields
  const blogCreationInitialState = {
    blogTitleInput: "",
    blogBodyInput: "",
    blogPriceInput: 2,
    blogSaleInput: false
  }
  const [blogCreationInputs,setBlogCreationInputs] = useState(blogCreationInitialState);

  const handleBlogCreationInput = (e) => {
    const { name, value, checked, type } = e.target;
    setBlogCreationInputs({
      ...blogCreationInputs,
      [name]: (type === 'checkbox')?checked:value,
    });
  }
  

  //blog details page data

  const detailDisplayInitialState = {
    id: -1,
    title: "",
    body: "",
    price: 0,
    creator: '',
    owner: '',
    readBy: 0,
    onSale: false
  }

  const [detailsPageData,setDetailsPageData] = useState(detailDisplayInitialState);
  const [saleStatusCheck,setSaleStatusCheck] = useState(detailsPageData.onSale);

  const updateDetailPageData = (id,title,body,price,creator,owner,readBy,onSale) => {
    setDetailsPageData({id,title,body,price,creator,owner,readBy,onSale})
  }

  //message
  const [connectMsg,setConnectMsg] = useState('')
  const [publishMsg,setPublishMsg] = useState('')

  //account
  const [account,setAccount] = useState('')

  //blogs
  const [allBlogs,setAllBlogs] = useState([])

  //loaders
  const [blogsLoader,setBlogsLoader] = useState(false)
  const [connectWalletLoader,setConnectWalletLoader] = useState(false)
  const [publishBlogLoader,setPublishBlogLoader] = useState(false)
  const [readBlogLoader,setReadBlogLoader] = useState(false)
  const [buyBlogLoader,setBuyBlogLoader] = useState(false)
  const [saleStatusChangeBlogLoader,setSaleStatusChangeBlogLoader] = useState(false)


  const checkWalletConnection = async () => {
    try {
      const { ethereum } = window

      if(ethereum){
        console.log("ethereum object exists : ",ethereum)
      }
      else{
        console.log("ethereum object doesn't exists, No wallet found")
      }
      setConnectWalletLoader(true)
      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if(accounts.length != 0){
        const userAccount = accounts[0]
        console.log("User connected and authorized with account : "+userAccount)
        setConnectMsg("")
        setAccount(userAccount)
        setConnectWalletLoader(false)
        getAllBlogs()
      }
      else{
        console.log("No user accounts connected or authorized")
        setConnectWalletLoader(false)
      }

    } catch (error) {
      console.log("Message : "+error)
      setConnectWalletLoader(false)
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
        setConnectWalletLoader(true)
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        const userAccount = accounts[0]
        console.log("Connected account : "+userAccount)
        setConnectMsg("")
        setAccount(userAccount)
        setConnectWalletLoader(false)
        getAllBlogs()
      }
    } catch (error) {
      console.log(error)
      setConnectMsg("Connection Error")
      setConnectWalletLoader(false)
    }

  }

  const getAllBlogs = async () => {
    try {
      const { ethereum } = window

      if(ethereum){
        setBlogsLoader(true)
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
        setBlogsLoader(false)
      }
      else{
        console.log("Ethereum object not found, Install Metamask")
        setBlogsLoader(false)
      }

    } catch (error) {
        console.log("Some error occured : "+error)
        setBlogsLoader(false)
    }
  }

  const readBlogHandler = async (blogId) => {
    try {
      const { ethereum } = window

      if(ethereum){
        setReadBlogLoader(true)
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const dblogContract = new ethers.Contract(dblogContractAddress,dblogContractABI,signer)

        let readTxn = await dblogContract.readBlog(blogId);
        await readTxn.wait();
        const blog = await dblogContract.getABlog(blogId);

        updateDetailPageData(blogId,blog.blogTitle,blog.blogBody,Number(ethers.utils.formatEther(blog.salePrice).toString()),addressReducer(blog.blogCreator),blog.blogOwner,Number(blog.numOfReads.toString()),blog.onSale);
        setSaleStatusCheck(blog.onSale);
        setReadBlogLoader(false)
        navigate('/details')
      }

    } catch (error) {
        console.log("Some error occured : "+error)
        setReadBlogLoader(false)
    }
  }

  const createBlogHandler = async (blogTitle,blogBody,blogPrice,blogOnSale) => {
    try {
      const { ethereum } = window

      if(ethereum && blogTitle && blogBody && blogPrice && blogOnSale){
        setPublishBlogLoader(true)
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const dblogContract = new ethers.Contract(dblogContractAddress,dblogContractABI,signer)

        let createTxn = await dblogContract.createBlog(blogTitle,blogBody,blogPrice,blogOnSale, { value: ethers.utils.parseEther("0.01") });
        await createTxn.wait()
        setPublishBlogLoader(false)
        getAllBlogs()
        navigate('/')
      }

    } catch (error) {
        console.log("Some error occured : "+error)
        setPublishBlogLoader(false)
    }
  }

  const buyBlogHandler = async (blogId,blogPrice) => {
    try {
      const { ethereum } = window

      if(ethereum){
        setBuyBlogLoader(true)
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const dblogContract = new ethers.Contract(dblogContractAddress,dblogContractABI,signer)
        let buyTxn = await dblogContract.buyBlog(blogId, { value: ethers.utils.parseEther((Number(blogPrice)).toString()) })
        await buyTxn.wait()
        setBuyBlogLoader(false)
        getAllBlogs()
        navigate('/')
      }

    } catch (error) {
        console.log("Some error occured : "+error)
        setBuyBlogLoader(false)
    }
  }

  const changeBlogSaleStatus = async(status,blogId) => {
    try {
      const { ethereum } = window

      if(ethereum){
        setSaleStatusChangeBlogLoader(true)
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const dblogContract = new ethers.Contract(dblogContractAddress,dblogContractABI,signer)
        let changeTxn 
        if(status === 1)
          changeTxn = await dblogContract.putBlogOnSale(blogId)
        else 
          changeTxn = await dblogContract.removeBlogFromSale(blogId)
          
        await changeTxn.wait()
        setSaleStatusChangeBlogLoader(false)
        getAllBlogs()
        navigate('/')
      }

    } catch (error) {
        console.log("Some error occured : "+error)
        saleStatusChangeBlogLoader(false)
    }
  }

  useEffect(()=>{
    checkWalletConnection()
  },[])


  return (
    <div className="App bg-gradient-to-tl from-slate-500 via-gray-700 to-neutral-400 mb-0">
      <Nav account={account} getAllBlogs={getAllBlogs}/>

      <Routes>
        <Route path='/' element={
          <>
            <Hero account={account} connectMsg={connectMsg} connectWallet={connectWallet} connectWalletLoader={connectWalletLoader}/>
            <BlogList allBlogs={allBlogs} readBlogHandler={readBlogHandler} account={account} blogsLoader={blogsLoader} readBlogLoader={readBlogLoader}/>
          </>
        }/>
        <Route path='/about' element={<About/>}/>
        {
          account && 
          <Route path='/create' element={<CreatePage blogCreationInputs={blogCreationInputs} handleBlogCreationInput={handleBlogCreationInput} createBlogHandler={createBlogHandler} publishBlogLoader={publishBlogLoader}/>}/>
        }
        <Route path='/details' element={<BlogDetailPage detailsPageData={detailsPageData} buyBlogHandler={buyBlogHandler} account={account} addressReducer={addressReducer} changeBlogSaleStatus={changeBlogSaleStatus} saleStatusCheck={saleStatusCheck} setSaleStatusCheck={setSaleStatusCheck} buyBlogLoader={buyBlogLoader} saleStatusChangeBlogLoader={saleStatusChangeBlogLoader}/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>

      <Footer/>
    </div>
  )
}

export default App

//conditional rendering on btn clicks and loaders