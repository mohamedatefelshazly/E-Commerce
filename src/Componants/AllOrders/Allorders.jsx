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
        <><div className="grid md:grid-cols-4 gap-3" >
            {allOrders?.map((order) =>
                <div className="grid shadow shadow-black" key={order.id}>
                    <h1>{order.totalOrderPrice}</h1>
                    <h2>{order.paymentMethodType}</h2>
                    <p>{order.isDelivered ? "Delived" : "Not Deliverd Yet"}</p>

                </div>


            )}</div>
        </>
    )
}
