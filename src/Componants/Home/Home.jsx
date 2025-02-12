import axios from "axios";
// import { useEffect, useState } from "react";
import Product from "../product/Product";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Slider from "react-slick";
import img1 from "../../assets/E-Commerce assets/images/slider-image-1.jpeg"
import img2 from "../../assets/E-Commerce assets/images/slider-image-2.jpeg"
import img3 from "../../assets/E-Commerce assets/images/slider-image-3.jpeg"
import img4 from "../../assets/E-Commerce assets/images/banner-4.jpeg"
import img5 from "../../assets/E-Commerce assets/images/grocery-banner-2.jpeg"
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import Login from "../Login/Login";
import { authContext } from "../../Context/AuthContext/AuthContextProvider";
import { getCategories } from "../../Redux/categoriesSlice"
import { useDispatch, useSelector } from "react-redux";
// import { head } from "framer-motion/client";
// import { storeRedux } from "../../Redux/reduxStore";


export default function Home() {
    const { data, isError, error, isLoading } = useQuery({
        queryKey: ['getProducts'],
        queryFn: getProducts2,
        // refetchOnWindowFocus:false,
        // refetchInterval:3000,
        // retry:2,
        // retryDelay:1000,
        // staleTime:200000,
        // refetchOnMount:true,
        gcTime: Infinity,
        placeholderData: keepPreviousData,
    })
    const { AllCategories } = useSelector((store) => store.categoriesReducer)
    const dispatch = useDispatch()
    const { userToken } = useContext(authContext)
    const [categProducts, setcategProducts] = useState(null)
    useEffect(() => {
        dispatch(getCategories())
    }, [])


    if (userToken == null) {
        return <Login />
    }
    // const [allProducts, setallProducts] = useState([])
    // const [isLoading, setisLoading] = useState(true)

    // useEffect(() => {
    //     axios.get("https://ecommerce.routemisr.com/api/v1/products", {})
    //         .then((res) => {
    //             setallProducts(res?.data?.data)
    //             setisLoading(false)
    //         }
    //         ).catch((error) => console.log(error))

    //     return () => {
    //         console.log("Home will unmount");

    //     }
    // }, [])
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    };
    const settings1 = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
    };
    function getProducts2() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products")
    }
    function selectCateg(id) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }).then((res) => {
            setcategProducts(res.data.data);
        })
    }




    if (isLoading) {
        return <LoadingScreen />
    }
    let allProducts = data?.data?.data
    if (categProducts) {
        allProducts = categProducts
    }

    if (isError) {
        console.log(error);
    }


    return (
        <>



            <div className="p-1 container overflow-hidden mx-auto">
                <Slider {...settings}>
                    <div className="p-2"><img className="w-full" src={img1} alt="img1" /></div>
                    <div className="p-2"><img className="w-full mb-2" src={img4} alt="img4" />
                        <img className="w-full" src={img5} alt="img5" />
                    </div>

                    <div className="p-2"><img className="w-full" src={img2} alt="img2" /></div>
                    <div className="p-2"><img className="w-full" src={img3} alt="img3" /></div>

                </Slider>
            </div>
            <div className="p-1 container mx-auto">
                <Slider {...settings1} >
                    {AllCategories?.map((categ) => <div onClick={() => selectCateg(categ._id)} key={categ._id} className="cursor-pointer m-2 shadow-black shadow">
                        <img className="w-full" src={categ.image} alt="" />
                        <h1>{categ.name}</h1>
                    </div>)}
                </Slider>
            </div>
            <div className="container grid sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-4 mx-auto gap-3 py-4">

                {allProducts?.map((product) => <Product key={product._id} prod={product} />)}

            </div>
        </>
    )
}
