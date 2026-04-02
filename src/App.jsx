import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Protocol from './pages/Protocol'
import Contact from './pages/Contact'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/protocol" element={<Protocol />} />
        <Route path="/contact"  element={<Contact />} />
      </Routes>
    </>
  )
}
