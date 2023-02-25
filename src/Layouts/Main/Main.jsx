import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../../Pages/Home/Home';
import Post from '../../Pages/Post/Post';
import Search from '../../Pages/Search/Search';
import Login from '../../Pages/Login/Login';

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/post' element={<Post />} />
        <Route path='/search' element={<Search />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </main>
  )
}
export default Main