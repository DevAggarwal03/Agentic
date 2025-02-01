import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './Pages/LandingPage'


function App() {

  return (
    <div>
      <Routes>
        <Route index element={<LandingPage/>}/>
      </Routes>
    </div>
  )
}

export default App
