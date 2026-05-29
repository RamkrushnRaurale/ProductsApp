// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
// import Navbar from './components/Navbar';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import TextArea from './components/Dashboard/TextArea';
import Dashboard from './components/Dashboard/Dashboard';
import Products from './components/Products/Products';
import Home from './components/Dashboard/sidebarComp/Home';
import { AuthProvider, useAuth } from "./components/SignIn/AuthContext";
import ForgotPassword from "./components/SignIn/ForgotPassword";
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/SignIn" />;
};

function App() {
  return (
    <>

      <AuthProvider>
        <BrowserRouter basename="/Authentication">
          <Routes>
            <Route path="/SignIn" element={<SignIn />} />

            <Route
              path="/Dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<Navigate to="/SignIn" />} />
            <Route path="/" element={<SignIn />} />
            <Route exact path='/SignUP' element={<SignUp />} />
            <Route path='/SignIn' element={<SignIn />} />
            <Route path='/TextArea' element={<TextArea />} />
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/Products' element={<Products />} />
            <Route path='/Home' element={<Home />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </>
  );
}

export default App;
