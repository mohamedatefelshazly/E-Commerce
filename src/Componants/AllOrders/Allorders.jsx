// import React from 'react'

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function Allorders() {
    function getOrders() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/orders/")
    }

    const { data, isError, error, isLoading, isFetching, isFetched } = useQuery({
        queryKey: ['getOrders'],
        queryFn: getOrders,
        // refetchOnWindowFocus:false,
        // refetchInterval:3000,
        // retry:2,
        // retryDelay:1000,
        // staleTime:200000,
        // refetchOnMount:true,
        gcTime: Infinity,
        placeholderData: keepPreviousData,
    })

    if (isLoading) {
        return <LoadingScreen />
    }
    const allOrders = data?.data?.data
    console.log(allOrders);

    if (isError) {
        console.log(error);
    }
    return (
        <><div className="grid md:grid-cols-2 gap-3" >
            {allOrders?.map((order) =>
                <div className="grid shadow shadow-black overflow-hidden p-2" key={order.id}>
                    <h1 className="text-xl text-center font-bold leading-none text-gray-900 dark:text-white">Order No. <span className="text-blue-600">{order.id}</span></h1>
                    <h1>Total Price: <span>{order.totalOrderPrice}</span></h1>
                    <div className="flex justify-between">
                        <h2>pay method: {order.paymentMethodType}</h2>
                        <p>status: {order.isPaid ? "Paid" : "Not Paid Yet"}</p>
                    </div>
                    <div className="grid ">
                        <h2>City: {order?.shippingAddress?.city}</h2>
                        <p>Details: {order?.shippingAddress?.details}</p>
                        <p>Phone: {order?.shippingAddress?.phone}</p>
                    </div>
                    <p>status: {order.isDelivered ? "Delived" : "Not Deliverd Yet"}</p>
                    <div className="flex flex-col">
                        <div className="w-full max-w-md p-2 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Products</h5>
                            </div>

                            <div className="grid">
                                <ul role="list" className=" divide-gray-200 dark:divide-gray-700">
                                    {order?.cartItems?.map((product) => <li className="py-3 sm:py-4" key={product?.product.id}>
                                        <div className="flex items-center">
                                            <div className="shrink-0">
                                                <img className="w-8 h-8 rounded-full" src={product?.product.imageCover} alt={product?.product.title} />
                                            </div>
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {product?.product.title}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    Count: {product?.count}
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                EGP {product?.price}
                                            </div>
                                        </div>
                                    </li>
                                    )}

                                </ul>
                            </div>
                        </div>

                    </div>

                </div>


            )}</div>
        </>
    )
}
