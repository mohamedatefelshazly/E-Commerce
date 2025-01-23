import { createContext, useEffect, useState } from "react"

// import React from 'react'
export const authContext = createContext()
export default function AuthContextProvider({ children }) {
    const [userToken, setuserToken] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("userToken") != null) {
            setuserToken(localStorage.getItem("userToken"))
        }
    
      return () => {
      }
    }, [])
    
    return (

        <authContext.Provider value={{ setuserToken, userToken, }}>
            {children}
        </authContext.Provider>

    )
}
