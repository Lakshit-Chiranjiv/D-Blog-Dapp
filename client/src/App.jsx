
import './App.css'
import BlogList from './components/BlogList'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Nav from './components/Nav'

function App() {

  return (
    <div className="App bg-slate-600 mb-0">
      <Nav/>
      <Hero/>
      <BlogList/>
      <Footer/>
    </div>
  )
}

export default App
