

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

    function getSpacificCateg(id) {
        console.log(id);
        
        axios.get(`https://route-ecommerce.vercel.app/api/v1/categories/${id}`, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }).then(({ data }) => console.log(data)).catch((error) => console.log(error))
    }

    return (
        <>
            <div className="grid gap-3 text-center  md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                {allCategeroies?.map((categ) => <div onClick={() => getSpacificCateg(categ._id)} key={categ._id} className="cursor-pointer h-full shadow-black shadow">
                    <img src={categ.image} alt="" />
                    <h1>{categ.name}</h1>
                </div>)}</div>
        </>
    )
}
