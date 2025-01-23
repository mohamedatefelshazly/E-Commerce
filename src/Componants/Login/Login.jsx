// import React from 'react'
import axios from "axios";
import { useFormik } from "formik"
import { useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { authContext } from "../../Context/AuthContext/AuthContextProvider";

export default function Login() {
    const { setuserToken } = useContext(authContext)
    const navigate = useNavigate()
    const [errorMessage, seterrorMessage] = useState(null)
    const [successMassage, setsuccessMassage] = useState(null)
    const [isClicked, setisClicked] = useState(false)

    function registerUser(user) {
        setisClicked(true)
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", user).then(
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

            email: "",
            password: "",
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

            email: yup.string().email("please inserat avalid email").required("Email is Required"),
            password: yup.string().required().min(6, "Min 6 chars").max(10, "Max 10 char"),

        })
    })
    return (
        <div>
            {errorMessage && <h1 className="text-red-600 text-2xl font-bold text-center m-3">{errorMessage}</h1>}
            {successMassage && <h1 className="text-green-600 text-2xl font-bold text-center m-3">{successMassage}</h1> && navigate("/home")}
            <h1 className="translate-x-[24%] m-3">Register Now</h1>
            <form onSubmit={registerFormik.handleSubmit} className="max-w-md mx-auto">

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




                <button type="submit" className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {!isClicked ? "Login" : <RotatingLines
                        visible={true}
                        height="50"
                        width="50"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />}</button>
            </form>
        </div>

    )
}
