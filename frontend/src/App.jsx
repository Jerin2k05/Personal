import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Nav.jsx'
import Foot from './Components/Footer/Foot.jsx'
import Home from './Components/Content/Home/Home.jsx'
import PrayerRequest from './Components/Content/Request/Req.jsx'
import History from './Components/Content/History/His.jsx'
import Contact from './Components/Content/Contact/Cont.jsx'
import './App.css'

function App() {
  return (
    <div className="site-shell">
      <Navbar />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prayer-request" element={<PrayerRequest />} />
          <Route path="/history" element={<History />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Foot />
    </div>
  )
}

export default App
