

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import LoadingScreen from "../LoadingScreen/LoadingScreen"
import { useContext } from "react"
import { authContext } from "../../Context/AuthContext/AuthContextProvider"
import Login from "../Login/Login"

export default function Categeroies() {
    const { userToken, setuserToken } = useContext(authContext)
    if (userToken == null) {
        return <Login />
    }
    function getCategeroies() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories", {
            headers: {
                token: localStorage.getItem("userToken")
            }
        })
    }
    const { data, isLoading, error, isError } = useQuery({
        queryKey: ["Categeroies"],
        queryFn: getCategeroies,
    })
    if (isLoading) {
        return <LoadingScreen />
    }
    if (isError) {
        console.log(error);
    }



    const allCategeroies = data?.data?.data;

    return (
        <>
            <div className="grid gap-3 text-center  md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                {allCategeroies?.map((categ) => <div key={categ._id} className="h-full shadow-black shadow">
                    <img src={categ.image} alt="" />
                    <h1>{categ.name}</h1>
                </div>)}</div>
        </>
    )
}
