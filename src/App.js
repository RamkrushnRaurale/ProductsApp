// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Navbar from './components/Navbar';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import TextArea from './components/Dashboard/TextArea';
import Dashboard from './components/Dashboard/Dashboard';
import Products from './components/Products/Products';
import Home from './components/Dashboard/sidebarComp/Home';



function App() {
  return (
    <>
      <BrowserRouter basename="/FoodApp">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route exact path='/SignUP' element={<SignUp />} />
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/TextArea' element={<TextArea />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/Products' element={<Products />} />
          <Route path='/Home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
