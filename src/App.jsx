/*
 * COMPONENT: App
 * WHAT IT DOES: Routes between the main landing page and the Legal page.
 *   Landing page order:
 *   Hero → Services → About → Team → Solutions → Portfolio →
 *   Partners → Blog → Contact → Footer
 * HOW TO TWEAK:
 *  • Reorder sections by moving the JSX lines in the Home route
 *  • All section content lives in src/constants/data.js
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Team from './components/Team'
import Solutions from './components/Solutions'
import Portfolio from './components/Portfolio'
import Partners from './components/Partners'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Legal from './pages/Legal'
import ScrollToTop from './components/ScrollToTop'
import Admin from './pages/Admin'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'

function Home() {
  return (
    <div className="w-full overflow-x-hidden bg-canvas text-ink">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Team />
        <Solutions />
        <Portfolio />
        <Partners />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  )
}
