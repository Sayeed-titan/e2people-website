/*
 * COMPONENT: App
 * WHAT IT DOES: Composes the page in the intended order:
 *   Hero → Services → About → Team → Solutions (dark) → Portfolio →
 *   Partners → Blog → Contact → Footer
 * HOW TO TWEAK:
 *  • Reorder sections by moving the JSX lines below
 *  • All section content lives in src/constants/data.js
 */
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

export default function App() {
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
