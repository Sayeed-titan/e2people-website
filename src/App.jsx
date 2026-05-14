import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Solutions from './components/Solutions'
import Products from './components/Products'
import Partners from './components/Partners'
import Team from './components/Team'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="w-full overflow-x-hidden bg-white">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Solutions />
      <Products />
      <Partners />
      <Team />
      <Contact />
      <Footer />
    </div>
  )
}
