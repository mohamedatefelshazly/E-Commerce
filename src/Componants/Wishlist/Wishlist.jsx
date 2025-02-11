
// import React from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'

import { Button } from '@heroui/react'

import { authContext } from '../../Context/AuthContext/AuthContextProvider'
import { Bounce, toast } from 'react-toastify'
import { cartNumber } from '../../Redux/CartCounterSlice'
import { useDispatch } from 'react-redux'

export default function Wishlist() {
    const dispatch=useDispatch()
    const [isEdited, setisEdited] = useState(false)
    const { setcartNum, setwishNum, wishNum } = useContext(authContext)
    const [isLoading, setisLoading] = useState(true)
    const [wishList, setwishList] = useState(wishNum)

    useEffect(() => {
        axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }).then(({ data }) => {
            setwishList(data?.data);
            setwishNum(data?.count)
            setisLoading(false)

        })


    }, [wishNum]);




    function removeProduct(id) {
        setisEdited(false)
        axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }).then(({ data }) => {
            console.log(data, data.data.length);
            setwishNum(data?.data?.length);

            toast.success(data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            setisEdited(true)
        })


    }

    function addProductToCart(productId) {

        axios.post("https://ecommerce.routemisr.com/api/v1/cart", { productId }, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }).then((res) => {

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
            dispatch(cartNumber());
            // axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
            //     headers: {
            //         token: localStorage.getItem("userToken")
            //     }
            // }).then(({ data }) => {
            //     setcartNum(data.data.products.length);
            // });
            // setcartNum(cartNum + 1);
        })
    }
    return (
        <>
            {isLoading ? <LoadingScreen /> : <>
                {wishList?.length > 0 ? <section className="bg-white py-8 antialiased lg:w-[82%] dark:bg-gray-900 md:py-16">
                    <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">whishlist</h2>

                        </div>
                        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                                <div className="space-y-6">
                                    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                                        {wishList?.map((product, index) => <div key={index} className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0 my-2 border-b-2">
                                            <a href="#" className="shrink-0 md:order-1">
                                                <img className="h-20 w-20 rounded-full dark:hidden" src={product?.imageCover} alt="imac image" />
                                            </a>
                                            <div className="flex items-center justify-between md:order-3 md:justify-end">

                                                <div className="text-end md:order-4 md:w-32">
                                                    <p className="text-base font-bold text-gray-900 dark:text-white">EGP {product.price}</p>
                                                </div>
                                            </div>

                                            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">{product?.title}</a>

                                                <div className="flex items-center gap-4">


                                                    <Button isLoading={isLoading} onPress={() => removeProduct(product?._id)} className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                                        <i className="fa fa-close"></i>
                                                        <span>Remove from wishlist</span>
                                                    </Button>

                                                    <button
                                                        onClick={() => addProductToCart(product?._id)}

                                                        className="flex items-center justify-center gap-2 bg-green-500 p-2 text-sm font-medium text-gray-900 focus:outline-none btn rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                                        role="button"
                                                    >
                                                        <i className="fa fa-cart-arrow-down"></i> Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>)}

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section> : <h1 className="text-center font-bold text-2xl">Your list is Empty</h1>}</>}

        </>
    )
}
