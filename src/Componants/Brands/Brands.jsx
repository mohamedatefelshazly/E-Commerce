import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import LoadingScreen from "../LoadingScreen/LoadingScreen"
import { useContext } from "react"
import { authContext } from "../../Context/AuthContext/AuthContextProvider"

export default function Brands() {
const { userToken, setuserToken } = useContext(authContext)
    if (userToken == null) {
        return <Login />
    }

    function getBrands() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/brands", {
            headers: {
                token: localStorage.getItem("userToken")
            }
        })
    }
    const { data, isLoading, error, isError } = useQuery({
        queryKey: ["Categeroies"],
        queryFn: getBrands,
    })
    if (isLoading) {
        return <LoadingScreen />
    }
    if (isError) {
        console.log(error);
    }



    const allBrands = data?.data?.data;
    return (
        <>
            <div className="grid gap-3 text-center  md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                {allBrands?.map((brand) => <div key={brand._id} className="h-full shadow-black shadow">
                    <img src={brand.image} alt="" />
                    <h1>{brand.name}</h1>
                </div>)}</div>
        </>
    )
}
