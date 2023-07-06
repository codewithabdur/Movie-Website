import React, { useEffect, useState } from 'react'
import './Footer.scss'
import { Link } from 'react-router-dom'
import client from '../../lib/client'

const Footer = () => {
  const[posts, setPosts] = useState([])

  useEffect(() => {
    client.fetch(
      `
      *[_type == "needThings"]{
        title,
        navImg{
          asset ->{
            _id,
            url
          }
        }
      }

      `
    ).then((data)=>{
      setPosts(data)
    }).catch(console.error)
  },[])
  return (
    <>
   {posts[0] && <footer className=" text-white flex items-center h-32 footer-container py-28">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-around">
      {/* Logo */}
      <div className="flex items-center mb-4 md:mb-0">
        <Link to="https://imaginary-realms.in" target='_blank'>{posts[0] && <img
          src={posts[0].navImg.asset.url}
          alt="Logo"
          className=" w-40 mr-2"
        />}</Link>
      </div>

      {/* Navigation */}
      <ul className="flex flex-wrap justify-center space-x-4">
        <li>
          <Link to="https://imaginary-realms.in" target='_blank'
            className="text-gray-300 hover:text-black hover:bg-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Official Website
          </Link>
        </li>
        <li>
          <Link
            to="https://codewithabdur.netlify.app" target='_blank'
            className="text-gray-300 hover:text-black hover:bg-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Portfolio
          </Link>
        </li>
        <li>
          <Link
            to="https://cwa-music-app.netlify.app" target='_blank'
            className="text-gray-300 hover:text-black hover:bg-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Music-Website
          </Link>
        </li>
        {/* <li>
          <a
            href="/contact"
            className="text-gray-300 hover:text-black hover:bg-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Contact
          </a>
        </li> */}
      </ul>
    </div>
  </footer>}
  </>
  )
}

export default Footer
