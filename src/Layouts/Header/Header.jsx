import React from 'react';
import { useRef } from 'react';
import '../../Assets/Styles/header.css';
import { Link } from "react-router-dom";
import { FaPen, FaSearch } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Header = () => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("nav-open");
  }

  return (
    <header>
      <h1>Anonymyst</h1>
      <nav className='menu'>
        <i className='nav-icon'><AiFillHome size={23}  color='white' title='Home' /></i>
        <i className='nav-icon'><FaPen size={19} color='white' title='Write' /></i>
        <i className='nav-icon'><FaSearch size={20}  color='white' title='Search' /></i>
        <i className='btn'>Sign Up</i>
      </nav>
      <button className='nav-btn' onClick={showNavbar}>
        <HiOutlineMenuAlt3 size={23} color='white' />
      </button>
      <div className='nav-dropdown' ref={navRef}>
        <Link to='/' className='nav-icon menu-item'><AiFillHome size={23}  color='white' title='Home' /><p>Home</p></Link>
        <i className='nav-icon menu-item'><FaPen size={19} color='white' title='Write' /><p>Write</p></i>
        <i className='nav-icon menu-item'><FaSearch size={20}  color='white' title='Search' /><p>Search</p></i>
        <i className='btn menu-item'><p>Sign Up</p></i>
      </div>
    </header>
  )
}

export default Header