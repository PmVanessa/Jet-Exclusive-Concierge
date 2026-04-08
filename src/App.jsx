import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Protocol from './pages/Protocol'
import MoDeMoSet from './pages/MoDeMoSet'
import Christmas2026 from './pages/Christmas2026'
import Summer2026    from './pages/Summer2026'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/protocol"       element={<Protocol />} />
        <Route path="/modemoset"      element={<MoDeMoSet />} />
        <Route path="/christmas-2026" element={<Christmas2026 />} />
        <Route path="/summer-2026"    element={<Summer2026 />} />
      </Routes>
    </>
  )
}
