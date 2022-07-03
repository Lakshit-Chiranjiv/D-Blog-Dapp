
import './App.css'

function App() {

  return (
    <div className="App bg-slate-600">
      <nav className='flex justify-around items-center py-6 mx-16'>
        <a href="#">
          <div className="bg-black p-4 rounded cursor-pointer">
            <h1 className="text-4xl text-white"><span className='text-6xl'>D</span> Blog</h1>
          </div>
        </a>
        <div className="flex gap-10 items-center">
          <a href="#">
            <div className="bg-black p-2 rounded cursor-pointer">
              <h3 className="text-xl text-white">Home</h3>
            </div>
          </a>
          <a href="#">
            <div className="bg-black p-2 rounded cursor-pointer">
              <h3 className="text-xl text-white">Create</h3>
            </div>
          </a>
          <a href="#">
            <div className="bg-black p-2 rounded cursor-pointer">
              <h3 className="text-xl text-white">About</h3>
            </div>
          </a>
        </div>
      </nav>
    </div>
  )
}

export default App
