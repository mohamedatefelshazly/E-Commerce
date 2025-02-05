// import React from 'react'

import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom"
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Slider from "react-slick";
import Product from "../product/Product";
import { Bounce, toast } from "react-toastify";
import { authContext } from "../../Context/AuthContext/AuthContextProvider";
import { Button } from "@heroui/react";


export default function productDetails() {
    const { setcartNum, setwishNum } = useContext(authContext)
    const [isLoading1, setisLoading1] = useState(false)
    const [prod, setProd] = useState({})
    const [isLoading, setisLoading] = useState(true)
    let { id } = useParams()
    const [relatedProducts, setrelatedProducts] = useState([])

    useEffect(() => {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then((res) => {
            setProd(res.data.data)
            setisLoading(false)
            axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${res.data.data.category._id}`).then((res) => {
                setrelatedProducts(res.data.data);

            })
        }
        ).catch((error) => console.log(error))
    }, [id])


    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

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
            })
            axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: {
                    token: localStorage.getItem("userToken")
                }
            }).then(({ data }) => {
                setcartNum(data.data.products.length);
            });
        })
    }

    function AddProductToWishList(id) {
        setisLoading1(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { "productId": id }, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }).then(({ data }) => {
            console.log(data);
            setisLoading1(false)
            toast.success(data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: {
                    token: localStorage.getItem("userToken")
                }
            }).then(({ data }) => {
                setwishNum(data?.data?.length);
            });
        })

    }










    return (<>
        {isLoading && <LoadingScreen /> ||
            <div>
                {/* <div className="container mx-auto flex justify-center items-center">
                    <div className="w-1/4">
                        <img src={prod.imageCover} alt={prod.title} />
                    </div>
                    <div className="w-3/4 grid">
                        <h1>{prod.title}</h1>
                        <p>{prod.description}</p>
                        <div className="flex justify-between">
                            <h3>{prod.price}</h3>
                            <div className="flex justify-center items-center">
                                <h3>rate: {prod.ratingsAverage}</h3>
                                <div className="bg-clip-text bg-yellow-400 bg-gradient-to-r">
                                    <i className="fa fa-star text-transparent"></i>
                                    <i className="fa fa-star text-transparent"></i>
                                    <i className="fa fa-star text-transparent"></i>
                                    <i className="fa fa-star text-transparent"></i>
                                    <i className="fa fa-star text-transparent"></i></div>
                            </div>
                        </div>
                        <button className="bg-green-400"> Add to Cart</button>
                    </div>

                </div> */}
                <div>
                    <section className="py-8  bg-white md:py-16 dark:bg-gray-900 antialiased">
                        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                                <div className="shrink-0 rounded-md p-1 max-w-md lg:max-w-lg mx-auto">
                                    <img className="w-full " src={prod.imageCover} alt={prod.title} />

                                </div>

                                <div className="mt-6 sm:mt-8 lg:mt-0">

                                    <h1
                                        className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
                                    >
                                        {prod.title} <Button isLoading={isLoading1} onPress={() => AddProductToWishList(prod._id)} className="text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                                            <i className="fa-regular fa-heart"></i><span></span>
                                        </Button>
                                    </h1>
                                    <div className="mt-4 sm:items-center sm:gap-4 sm:flex lg:grid">
                                        <p
                                            className="text-xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
                                        >
                                            EGP {prod.price}
                                        </p>

                                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                            <div className="flex items-center gap-1 bg-yellow-400 bg-clip-text">
                                                <i className="fa fa-star text-transparent"></i>
                                                <i className="fa fa-star text-transparent"></i>
                                                <i className="fa fa-star text-transparent"></i>
                                                <i className="fa fa-star text-transparent"></i>
                                                <i className="fa fa-star text-transparent"></i>
                                            </div>
                                            <p
                                                className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
                                            >
                                                ({prod.ratingsAverage})
                                            </p>
                                            <a
                                                href="#"
                                                className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                                            >
                                                {prod.ratingsQuantity} Reviews
                                            </a>
                                        </div>
                                    </div>

                                    <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                                        <button
                                            onClick={() => addProductToCart(prod._id)}

                                            className="flex items-center justify-center gap-2 bg-green-500 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none btn rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                            role="button"
                                        >
                                            <i className="fa fa-cart-arrow-down"></i> Add to Cart
                                        </button>


                                    </div>

                                    <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                                    <p className="mb-6 text-gray-500 dark:text-gray-400">
                                        {prod.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div>
                    <Slider {...settings}>
                        {relatedProducts.map((product) => <div className="px-2"><Product key={product._id} prod={product} /></div>)}

                    </Slider></div>
            </div>}
    </>
    )
}
