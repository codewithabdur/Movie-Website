import React from 'react'
import './Homepage.scss'
import {NavBar} from '../../Components'
import LandingPage from '../LandingPage/LandingPage'
import Footer from '../Footer/Footer'

const HomePage = () => {
  return (
    <div className='main-container overflow-hidden'>
   <NavBar />
   <LandingPage />
   <Footer />

   </div>
  )
}

export default HomePage
