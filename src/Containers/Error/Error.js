import React from 'react'
import { Link } from 'react-router-dom'
import './Error.scss'


export default function Error() {
  return (
    <>
    
    <section className='text-white flex items-center justify-center h-screen text-center px-5 '>
      <article className='max-w-3xl mx-auto'>
        <img src="https://cdn.sanity.io/images/k88yshkr/production/cc23561a691feb719332c9cf02f357a965329f9f-864x578.jpg" alt="Error" className='h-64 mx-auto object-cover rounded-2xl'/>
        <h1 className='text-4xl lg:text-5xl mb-8'>Oops! You found a page that doesn't exist.</h1>
        <p className='mb-8 '>
          You seem to have discovered a page on our website that either doesn't exist or may have moved.
        </p>
        <Link to="/" ><button className='btn4'> Homepage</button></Link>
      </article>
    </section>
    </>
  )
}