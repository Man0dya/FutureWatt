import React from 'react'
import "./Home.css"
import About from './About/About'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Hero from './Hero/Hero'
import ImageSlider from './ImageSlider/ImageSlider'
import Testimonials from './Testimonials/Testimonials'
import Welcome from './Welcome/Welcome'
import Services from "./Services/Services"
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton'
import FloatingIcon from '../FloatingIcon/FloatingIcon'
import Chatbot from './Chatbot/Chatbot'


function Home() {
  return (
    <div>
      <Header/>
      <Hero/>
      <Welcome/>
      <About/>
      <ImageSlider/>
      <Services/>
      <Testimonials/>
      {/* <WhatsAppButton/> */}
      <Chatbot/>
      <FloatingIcon/> 
      <Footer/>
    </div>
  )
}

export default Home
