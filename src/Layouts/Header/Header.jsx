import React from 'react';
import { useRef } from 'react';
import '../../Assets/Styles/header.css';
import { Link } from "react-router-dom";
import { FaPen, FaSearch } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

import logo from '../../Assets/Images/anonymyst-logo-nbg.png'

const Header = () => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("nav-open");
  }

  return (
    <header>
      <Link className='header-logo' to='/'><img src={ logo } id='header-logo-img' alt='Anonymyst logo'/><h1>Anonymyst</h1></Link>
      <nav className='menu'>
        <Link to='/' className='nav-icon'><AiFillHome size={23}  color='white' title='Home' /></Link>
        <Link to='/post' className='nav-icon'><FaPen size={19} color='white' title='Write' /></Link>
        <Link to='/search' className='nav-icon'><FaSearch size={20}  color='white' title='Search' /></Link>
        <Link to='/login' className='btn'>Sign Up</Link>
      </nav>
      <div className='nav-main'>
        <Link to='/post' className='btn' id='nav-main-btn'>Write</Link>
        <button className='nav-btn' onClick={showNavbar}>
          <HiOutlineMenuAlt3 size={23} color='white' />
        </button>
        <div className='nav-dropdown' ref={navRef}>
          <Link to='/' className='nav-icon menu-item'><AiFillHome size={23}  color='white' title='Home' /><p>Home</p></Link>
          <Link to='/post'  className='nav-icon menu-item'><FaPen size={19} color='white' title='Write' /><p>Write</p></Link>
          <Link to='/search'  className='nav-icon menu-item'><FaSearch size={20}  color='white' title='Search' /><p>Search</p></Link>
          <Link to='/login'  className='btn menu-item'><p>Sign Up</p></Link>
        </div>
      </div>
    </header>
  )
}

export default Header