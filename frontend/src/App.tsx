import './App.css'

import Navbar from './components/subcomponent/Nav'
import ProductDescription from './components/pages/ProductDescription'
import Search from './components/pages/Search'
import { Routes, Route } from 'react-router-dom';
import Footer from './components/subcomponent/Footer'
import Home from './components/pages/Home'
function App() {
  console.log('====================================');
  console.log(import.meta.env.VITE_SUPABASE_PUBLIC_KEY);
  console.log('====================================');
  return (
    <>
      <div >
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/service" element={<ProductDescription />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
