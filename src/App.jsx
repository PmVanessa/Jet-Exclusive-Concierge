import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

const Home         = lazy(() => import('./pages/Home'))
const Protocol     = lazy(() => import('./pages/Protocol'))
const MoDeMoSet    = lazy(() => import('./pages/MoDeMoSet'))
const Christmas2026 = lazy(() => import('./pages/Christmas2026'))
const Summer2026    = lazy(() => import('./pages/Summer2026'))

export default function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/"               element={<Home />} />
          <Route path="/protocol"       element={<Protocol />} />
          <Route path="/modemoset"      element={<MoDeMoSet />} />
          <Route path="/christmas-2026" element={<Christmas2026 />} />
          <Route path="/summer-2026"    element={<Summer2026 />} />
        </Routes>
      </Suspense>
    </>
  )
}
