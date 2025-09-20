import React from 'react'
import Navbar from '../Components/common/Navbar'
import Hero from '../Components/common/Hero'
import Features from '../Components/common/Features'

import Footer from '../Components/common/Footer'
import Contact from '../Components/common/Contact'

function Homepage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Contact />
      <Footer />
    </div>
  )
}

export default Homepage