
import './App.css'
import About from './components/About'
import BlogList from './components/BlogList'
import Button from './components/Button'
import CreatePage from './components/CreatePage'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Nav from './components/Nav'

function App() {

  return (
    <div className="App bg-slate-600 mb-0">
      <Nav/>
      <Hero/>
      <BlogList/>
      <About/>
      <CreatePage/>
      <Footer/>
    </div>
  )
}

export default App
