import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Experience from '../components/Experience'
import DanceStyles from '../components/DanceStyles'
import Instructor from '../components/Instructor'
import Event from '../components/Event'
import Gallery from '../components/Gallery'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Experience />
        <DanceStyles />
        <Instructor />
        <Event />
        <Gallery />
        <FAQ />
        <Footer />
      </main>
    </>
  )
}

export default Home