
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

const dblogContractAddress = '0xeA79C1Df5cc7b62A37ba29066010F0C3E9B4C38D'
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

        let readTxn = await dblogContract.readBlog(blogId);
        await readTxn.wait();
        const blog = await dblogContract.getABlog(blogId);

        updateDetailPageData(blogId,blog.blogTitle,blog.blogBody,Number(ethers.utils.formatEther(blog.salePrice).toString()),addressReducer(blog.blogCreator),blog.blogOwner,Number(blog.numOfReads.toString()),blog.onSale);
        navigate('/details')
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
        navigate('/')
      }

    } catch (error) {
        console.log("Some error occured : "+error)
    }
  }

  const buyBlogHandler = async (blogId,blogPrice) => {
    try {
      const { ethereum } = window

      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const dblogContract = new ethers.Contract(dblogContractAddress,dblogContractABI,signer)
        let buyTxn = await dblogContract.buyBlog(blogId, { value: ethers.utils.parseEther((Number(blogPrice)).toString()) })
        await buyTxn.wait()
        getAllBlogs()
        navigate('/')
      }

    } catch (error) {
        console.log("Some error occured : "+error)
    }
  }

  const changeBlogSaleStatus = async(status,blogId) => {
    try {
      const { ethereum } = window

      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const dblogContract = new ethers.Contract(dblogContractAddress,dblogContractABI,signer)
        let changeTxn 
        if(status === 1)
          changeTxn = await dblogContract.putBlogOnSale(blogId)
        else 
          changeTxn = await dblogContract.removeBlogFromSale(blogId)
          
        await changeTxn.wait()
        getAllBlogs()
        navigate('/')
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
      <Nav account={account}/>
      <button onClick={()=>{
        console.log(detailsPageData);
      }}>click</button>

      <Routes>
        <Route path='/' element={
          <>
            <Hero account={account} connectMsg={connectMsg} connectWallet={connectWallet}/>
            <BlogList allBlogs={allBlogs} readBlogHandler={readBlogHandler} account={account} />
          </>
        }/>
        <Route path='/about' element={<About/>}/>
        {
          account && 
          <Route path='/create' element={<CreatePage blogCreationInputs={blogCreationInputs} handleBlogCreationInput={handleBlogCreationInput} createBlogHandler={createBlogHandler}/>}/>
        }
        {
          detailsPageData.title && 
          <Route path='/details' element={<BlogDetailPage detailsPageData={detailsPageData} buyBlogHandler={buyBlogHandler} account={account} addressReducer={addressReducer}/>}/>
        }
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>

      <Footer/>
    </div>
  )
}

export default App


//implement react router...x
//wire all react router links and navigations...x
//conditional rendering based on blog owner...x
//conditional rendering on btn clicks and loaders
//blog put on and off sale feature based on conditions if the user is owner itself functions
//conditionally hiding the buy btn if its the owner...x
//notfound page...x
//notfound page render conditionally on create and details route...x
// responsiveness
//contract feature, the creator won't get ethers if he/she himself doing reads on his/her blog which has been bought
//createPage onsale input error resolve...x