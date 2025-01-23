// import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Componants/Layout/Layout'
import { HeroUIProvider } from "@heroui/react";
import Home from './Componants/Home/Home';
import Register from './Componants/Register/Register';
import NotFound from './Componants/NotFound/NotFound';
import Login from './Componants/Login/Login';
import ProductDetails from './Componants/ProductDetails/productDetails';
import AuthContextProvider from './Context/AuthContext/AuthContextProvider';
import ProtectedRoute from './Context/ProtectedRoute/ProtectedRoute';
import Cart from './Componants/Cart/Cart';
import { ToastContainer } from 'react-toastify';



function App() {
  const route = createBrowserRouter([{
    path: "", element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "home", element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><h1>Brands</h1></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "productdetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "*", element: <NotFound /> }
    ]
  }])


  return (
    <>
      <AuthContextProvider>
        <HeroUIProvider>
          <RouterProvider router={route} />
          <ToastContainer />
        </HeroUIProvider>
      </AuthContextProvider>

    </>
  )
}

export default App
