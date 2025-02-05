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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Categeroies from './Componants/Categeroies/Categeroies';
import Brands from './Componants/Brands/Brands';
import AddAddress from './Componants/AddAddress/AddAddress';
import Allorders from './Componants/AllOrders/Allorders';
import Wishlist from './Componants/Wishlist/Wishlist';


const client = new QueryClient({
  defaultOptions: {
    // refetch
  }
})
function App() {
  const route = createBrowserRouter([{
    path: "", element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "home", element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "categeroies", element: <ProtectedRoute><Categeroies /></ProtectedRoute> },
      { path: "addAdress/:cartId", element: <ProtectedRoute><AddAddress /></ProtectedRoute> },
      { path: "allorders", element: <ProtectedRoute><Allorders /></ProtectedRoute> },
      { path: "wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "productdetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "*", element: <NotFound /> }
    ]
  }])


  return (
    <>
      <QueryClientProvider client={client}>
        <AuthContextProvider>
          <HeroUIProvider>
            <RouterProvider router={route} />
            <ToastContainer />
          </HeroUIProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
