import axios from "axios";
import { createContext, useEffect, useState } from "react"

// import React from 'react'
export const authContext = createContext()
export default function AuthContextProvider({ children }) {
    const [userToken, setuserToken] = useState(null);
    const [cartNum, setcartNum] = useState(0)

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

        <authContext.Provider value={{ setuserToken, userToken,cartNum, setcartNum }}>
            {children}
        </authContext.Provider>

    )
}
