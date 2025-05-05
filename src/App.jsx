import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyRecipes from './components/MyRecipes'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>   
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/myrecipes" element={<MyRecipes />} />
    </Routes>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App

