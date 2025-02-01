// import React from 'react'

import { Button } from "@heroui/react";
import axios from "axios"
import { useState } from "react";



export default function CartProduct({ prod, setisEdited }) {

    const [isLoading, setisLoading] = useState(false)
    const [isLoading1, setisLoading1] = useState(false)
    const [productCount, setproductCount] = useState(prod.count)
    function removeProduct(id) {
        setisLoading(true)
        axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }).then(({ data }) => {
            console.log(data);
            setisLoading(false)
            setisEdited(true)
        })

    }
    function AddProductToWishList(id) {
        setisLoading1(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{"productId":id}, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }).then(({ data }) => {
            console.log(data);
            setisLoading1(false)
        })

    }

    function updateCount(id, count) {
        setproductCount(count)
        axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count }, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }).then(() => {
            setisEdited(true)

        })


    }

    return (
        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0 my-2 border-b-2">
            <a href="#" className="shrink-0 md:order-1">
                <img className="h-20 w-20 dark:hidden" src={prod?.product?.imageCover} alt="imac image" />
            </a>

            <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
            <div className="flex items-center justify-between md:order-3 md:justify-end">
                <div className="flex items-center">

                    <button onClick={() => updateCount(prod?.product?._id, productCount - 1)} id="decrement-button" className="inline-flex h-5 w-5 shrink items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                        <i className="fa fa-minus  text-gray-900 dark:text-white" ></i>
                    </button>
                    <input onChange={(e) => setproductCount(e.target.value)} onBlur={(e) => updateCount(prod.product._id, e.target.value)} value={productCount} type="text" id="counter-input" data-input-counter className="w-14 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" required />

                    <button onClick={() => updateCount(prod?.product?._id, productCount * 1 + 1)} id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                        <i className="fa fa-plus p-3"></i>
                    </button>
                </div>
                <div className="text-end md:order-4 md:w-32">
                    <p className="text-base font-bold text-gray-900 dark:text-white">EGP {prod.price}</p>
                </div>
            </div>

            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">{prod?.product?.title}</a>

                <div className="flex items-center gap-4">
                    <Button isLoading={isLoading1} onPress={() => AddProductToWishList(prod?.product?._id)} className="text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                        <i className="fa fa-heart"></i><span>Add to Wishlist</span>
                    </Button>

                    <Button isLoading={isLoading} onPress={() => removeProduct(prod?.product?._id)} className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                        <i className="fa fa-close"></i>
                        <span>Remove</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
