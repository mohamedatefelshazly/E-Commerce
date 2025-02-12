// import React from 'react'
import { Button } from "@heroui/react";
import axios from "axios";
import { useFormik } from "formik"
import { useEffect, useState } from "react";
// import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup';


export default function AddAddress() {
    const navigate = useNavigate()
    const [allAddress, setallAddress] = useState([])
    const [errorMessage, seterrorMessage] = useState(null)
    const [successMassage, setsuccessMassage] = useState(null)
    const [isClicked, setisClicked] = useState(false)
    let { cartId } = useParams()

    function AddAddressAndGoToPay(user) {
        setisClicked(true)
        setAddress()
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, user, {
            headers: {
                token: localStorage.getItem("userToken")
            }, params: { url: "https://e-commerce-nine-eta-25.vercel.app/" }

        }).then(
            (res) => {
                // setsuccessMassage(res.data)
                console.log(res.data.session.url);
                window.location.href = res.data.session.url
                seterrorMessage(null)
                setisClicked(false)
            })
            .catch(() => {
                // seterrorMessage(error?.response?.data?.message)
                setsuccessMassage(null)
                // setTimeout(() => { seterrorMessage(null) }, 2000)
                setisClicked(false)
            })
    }
    function pay(x) {
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, x, {
            headers: {
                token: localStorage.getItem("userToken")
            }, params: { url: "http://localhost:5173" }
        }).then(
            (res) => {
                // setsuccessMassage(res.data)
                console.log(res.data.session.url);
                window.location.href = res.data.session.url
                seterrorMessage(null)
                setisClicked(false)
            })
    }
    useEffect(() => {
        getAllAddress()

        return () => {
            clearInterval()
            clearTimeout()
        }
    }, [])

    const registerFormik = useFormik({
        initialValues: {
            // name: "Home",
            details: "",
            phone: "",
            city: ""
        }, onSubmit: AddAddressAndGoToPay,
        validationSchema: yup.object().shape({

            // name: yup.string().min(3,"please insert a valid name ").required("it is Required"),
            phone: yup.string().required().matches(/^01[0125][0-9]{8}$/, "enter a valid phone"),
            details: yup.string().required("Details Required"),
            city: yup.string().required("City Required"),

        })
    })

    function getAllAddress() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/addresses`, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }).then(({ data }) => {
            setallAddress(data.data);
            console.log(data.data);

        })

    }
    function setAddress() {
        axios.post(`https://ecommerce.routemisr.com/api/v1/addresses`, {
            name: "work",
            details: "Home details",
            phone: "01010700700",
            city: "Cairo"
        }, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        })
        // .then(({ data }) => {
        //     // console.log(data);
        // })

    }

    return (
        <div className="w-[95%]">
            {errorMessage && <h1 className="text-red-600 text-2xl font-bold text-center m-3">{errorMessage}</h1>}
            {successMassage && <h1 className="text-green-600 text-2xl font-bold text-center m-3">{successMassage}</h1> && navigate("/home")}
            <h1 className="translate-x-[20%] m-3">Add New Address</h1>
            <form onSubmit={registerFormik.handleSubmit} className="max-w-md mx-auto">

                {/* <div className="relative z-0 w-full mb-5 group">
                    <input onChange={registerFormik.handleChange} value={registerFormik.values.name} onBlur={registerFormik.handleBlur} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address Name</label>
                    {registerFormik.errors.name && registerFormik.touched.name && <p className="bg-red-300 text-red-800">{registerFormik.errors.name}</p>}
                </div> */}
                <div className="relative z-0 w-full mb-5 group">
                    <input onChange={registerFormik.handleChange} value={registerFormik.values.details} onBlur={registerFormik.handleBlur} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address details</label>
                    {registerFormik.errors.details && registerFormik.touched.details && <p className="bg-red-300 text-red-800">{registerFormik.errors.details}</p>}
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input onChange={registerFormik.handleChange} value={registerFormik.values.phone} onBlur={registerFormik.handleBlur} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone</label>
                    {registerFormik.errors.phone && registerFormik.touched.phone && <p className="bg-red-300 text-red-800">{registerFormik.errors.phone}</p>}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input onChange={registerFormik.handleChange} value={registerFormik.values.city} onBlur={registerFormik.handleBlur} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">city</label>
                    {registerFormik.errors.city && registerFormik.touched.city && <p className="bg-red-300 text-red-800">{registerFormik.errors.city}</p>}
                </div>





                <Button isLoading={isClicked} type="submit" className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {/* {!isClicked ? "Add Address & Go to pay" : <RotatingLines
                        visible={true}
                        height="50"
                        width="50"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />} */}
                    Add Address & Go to pay</Button>
            </form>
            <div className="w-full mt-2  p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h1 className="text-3xl text-center font-bold text-gray-900 dark:text-white">Your Last Addresses</h1>
                <div className="grid md:grid-cols-2 gap-3">
                    {allAddress?.map((address, index) => <div key={index} className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">

                        <div className="flex items-baseline text-gray-900 dark:text-white">
                            <span className="text-3xl font-semibold">Name : {address.name}</span>

                        </div>
                        <ul role="list" className="space-y-5 my-7">
                            <li className="flex items-center">
                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">phone: {address.phone}</span>
                            </li>
                            <li className="flex items-center">
                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">City: {address.city}</span>
                            </li>
                            <li className="flex items-center">
                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Details: {address.details}</span>
                            </li>

                        </ul>
                        <button onClick={() => {
                            pay({
                                details: address.details,
                                phone: address.phone,
                                city: address.city,
                            })
                        }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Use this and go to Pay</button>
                    </div>)}

                </div>
            </div>
        </div>

    )
}
