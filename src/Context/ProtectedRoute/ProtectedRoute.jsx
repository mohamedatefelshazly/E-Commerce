// import React from 'react'

import { useState } from "react"
import { Navigate } from "react-router-dom"
// import { useNavigate } from "react-router-dom"

export default function ProtectedRoute({ children }) {
    let tkn = false
    if (localStorage.getItem("userToken") != null) { tkn = true }

    return (
        <>
            {tkn && children || <Navigate to={"/login"} />}
        </>
    )
}
