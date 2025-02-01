import axios from "axios";
import { createContext, useEffect, useState } from "react"

// import React from 'react'
export const authContext = createContext()
export default function AuthContextProvider({ children }) {
    const [userToken, setuserToken] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("userToken") != null) {
            axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
                headers: { token: localStorage.getItem("userToken") }
            }).then((res) => {
                if (res.data.message == "verified") {
                    setuserToken(localStorage.getItem("userToken"))
                } else {
                    localStorage.removeItem("userToken")
                    setuserToken(null)
                }

            })

        }
    }, [])

    return (

        <authContext.Provider value={{ setuserToken, userToken, }}>
            {children}
        </authContext.Provider>

    )
}
