// import React from 'react'

import { Button } from "@heroui/react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bounce, toast } from 'react-toastify';


export default function Product(probs) {
    const [isLoading, setisLoading] = useState(false)
    const { title, imageCover, price, _id } = probs.prod
    function addProductToCart(productId) {
        setisLoading(true)
        axios.post("https://ecommerce.routemisr.com/api/v1/cart", { productId }, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }).then((res) => {
            setisLoading(false)
            toast.success(res.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

        })
    }



    return (
        <>
            <div className="product">
                <Link to={("/productdetails/" + _id)}>
                    <div className="  cursor-pointer border rounded-md  p-2">
                        <img src={imageCover} alt={title} className='w-full' />
                        <h1 className="font-bold">{title.split(" ").splice(0, 2).join(" ")}</h1>
                        <span>price: <strong className="text-blue-700">{price}</strong>  EGP</span>
                    </div>
                </Link>

                <button onClick={() => addProductToCart(_id)} className="text-center btn mx-auto gap-4 items-center block w-full">

                    <Button onPress={() => addProductToCart(_id)} isLoading={isLoading} className="w-full p-0 bg-green-500 rounded-md"><div
                        className="flex items-center w-full  justify-center gap-2 bg-green-500 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none  rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        role="button"
                    >
                        <i className="fa fa-cart-arrow-down"></i> Add to Cart
                    </div></Button>


                </button>
            </div> </>
    )
}
