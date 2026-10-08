import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BookingPage from './pages/BookingPage'
import GalleryPage from './pages/GalleryPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App