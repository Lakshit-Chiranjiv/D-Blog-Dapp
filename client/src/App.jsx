
import './App.css'
import BlogList from './components/BlogList'
import Hero from './components/Hero'
import Nav from './components/Nav'

function App() {

  return (
    <div className="App bg-slate-600">
      <Nav/>
      <Hero/>
      <BlogList/>
    </div>
  )
}

export default App
