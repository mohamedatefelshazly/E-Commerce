// import React from 'react'

import axios from "axios";
import { useFormik } from "formik"
import { useContext, useEffect, useState } from "react";
// import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { authContext } from "../../Context/AuthContext/AuthContextProvider";
import { Button } from "@heroui/react";




export default function Register() {
    const { setuserToken } = useContext(authContext)
    const navigate = useNavigate()
    const [errorMessage, seterrorMessage] = useState(null)
    const [successMassage, setsuccessMassage] = useState(null)
    const [isClicked, setisClicked] = useState(false)

    function registerUser(user) {
        setisClicked(true)
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", user).then(
            (res) => {
                setsuccessMassage(res.data.message)
                localStorage.setItem("userToken", res.data.token)
                setuserToken(res.data.token)
                seterrorMessage(null)
                setisClicked(false)
            })
            .catch((error) => {
                seterrorMessage(error.response.data.message)
                setsuccessMassage(null)
                setTimeout(() => { seterrorMessage(null) }, 2000)
                setisClicked(false)
            })
    }
    useEffect(() => {


        return () => {
            clearInterval()
            clearTimeout()
        }
    }, [])

    const registerFormik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        }, onSubmit: registerUser,
        //  validate: (dat) => {
        //     const errors = {}
        //     const nameRegex = /^[a-z0-9_-]{3,15}$/
        //     const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
        //     const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
        //     const phoneRegex = /^01[0125][0-9]{8}$/
        //     if (!dat.name.match(nameRegex)) { errors.name = "Name must be at least 3 characters" }
        //     if (!dat.email.match(emailRegex)) { errors.email = "invalid,Please insert correct email" }
        //     if (!dat.password.match(passwordRegex)) { errors.password = "invalid,Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character" }
        //     if (!dat.phone.match(phoneRegex)) { errors.phone = "invalid,Please insert correct phone" }
        //     if (dat.password != dat.rePassword) { errors.rePassword = "invalid,password not match" }
        //     console.log(errors);

        //     return errors
        // }
        validationSchema: yup.object().shape({
            name: yup.string().required("Name is Required").min(3, "Minimum 3 Characters").max(20, "Maximum 20 charcters"),
            email: yup.string().email("please inserat avalid email").required("Email is Required"),
            password: yup.string().required().min(6, "Min 6 chars").max(10, "Max 10 char"),
            rePassword: yup.string().required().oneOf([yup.ref("password")], "Not Match"),
            phone: yup.string().required().matches(/^01[0125][0-9]{8}$/, "enter a valid phone"),

        })
    })
    return (


        <div className="w-[90%]">
            {errorMessage && <h1 className="text-red-600 text-2xl font-bold text-center m-3">{errorMessage}</h1>}
            {successMassage && <h1 className="text-green-600 text-2xl font-bold text-center m-3">{successMassage}</h1> && navigate("/home")}
            <h1 className="translate-x-[18%] m-3">Register Now</h1>
            <form onSubmit={registerFormik.handleSubmit} className="max-w-md mx-auto">
                <div className="relative z-0 w-full mb-5 group">
                    <input value={registerFormik.values.name} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                    {registerFormik.errors.name && registerFormik.touched.name && <p className="bg-red-300 text-red-800">{registerFormik.errors.name}</p>}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input onChange={registerFormik.handleChange} value={registerFormik.values.email} onBlur={registerFormik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                    {registerFormik.errors.email && registerFormik.touched.email && <p className="bg-red-300 text-red-800">{registerFormik.errors.email}</p>}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input onChange={registerFormik.handleChange} value={registerFormik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">password</label>
                    {registerFormik.errors.password && registerFormik.touched.password && <p className="bg-red-300 text-red-800">{registerFormik.errors.password}</p>}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input onChange={registerFormik.handleChange} value={registerFormik.values.rePassword} onBlur={registerFormik.handleBlur} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">re-password</label>
                    {registerFormik.errors.rePassword && registerFormik.touched.rePassword && <p className="bg-red-300 text-red-800">{registerFormik.errors.rePassword}</p>}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input onChange={registerFormik.handleChange} value={registerFormik.values.phone} onBlur={registerFormik.handleBlur} type="text" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
                    {registerFormik.errors.phone && registerFormik.touched.phone && <p className="bg-red-300 text-red-800">{registerFormik.errors.phone}</p>}
                </div>


                <Button isLoading={isClicked} color="success" type="submit" className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {/* {!isClicked ? "Login" : <RotatingLines
                        visible={true}
                        height="50"
                        width="50"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />} */}
                    Login
                </Button>
            </form>
        </div>

    )
}
