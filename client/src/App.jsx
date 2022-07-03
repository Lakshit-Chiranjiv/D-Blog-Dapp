
import './App.css'
import Nav from './components/Nav'

function App() {

  return (
    <div className="App bg-slate-600">
      <Nav/>
      <section className='flex gap-12 justify-around items-center py-6 mb-8 mx-16'>
        <img src="../assets/blog.svg" alt="" className='w-96'/>
        <div>
          <a href="#">
            <button className="bg-white rounded py-4 px-8 text-xl">
              Connect with Metamask
            </button>
          </a>
          <p className='text-sm text-red-600 bg-white p-4 rounded mt-4'>Some error occured</p>
          <p className='text-sm text-green-500 bg-white p-4 rounded mt-4'>Connected <br /> 0x279ef018cffdd199d42c68e2df2911f3bb94040f</p>
        </div>
      </section>
    </div>
  )
}

export default App
