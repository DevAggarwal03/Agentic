import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './Pages/LandingPage'
import SwapPage from './Pages/SwapPage'
import TokensPage from './Pages/TokensPage'

function App() {

  return (
    <div className='bg-gray-900 min-h-screen'>
      <Routes>
        <Route index element={<LandingPage/>}/>
        <Route path='/swap' element={<SwapPage/>}/>
        <Route path='/tokens' element={<TokensPage/>}/>
      </Routes>
    </div>
  )
}

export default App
