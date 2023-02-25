import React from 'react';
import '../../Assets/Styles/header.css';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { FaPen, FaSearch } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";

const Header = () => {
  return (
    <header>
      <h1>Anonymyst</h1>
      <nav>
        <i className='nav-icon'><AiFillHome size={23}  color='white' /></i>
        <i className='nav-icon'><FaPen size={19} color='white' /></i>
        <i className='nav-icon'><FaSearch size={20}  color='white' /></i>
        <button className='btn'>Sign Up</button>
      </nav>
    </header>
  )
}

export default Header