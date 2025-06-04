
import Login from "./pages/auth/Login"
import './App.css'

function App() {
  return (
    <div className='h-screen auth-container-phone md:auth-container'>
      <div className="md:w-1/2 bg-violet-900 md:ml-auto h-screen text-center text-white px-10 py-20">
        <Login />
      </div>
    </div>
  )
}

export default App
