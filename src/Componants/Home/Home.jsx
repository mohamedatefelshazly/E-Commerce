import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../product/Product";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Slider from "react-slick";
import img1 from "../../assets/E-Commerce assets/images/slider-image-1.jpeg"
import img2 from "../../assets/E-Commerce assets/images/slider-image-2.jpeg"
import img3 from "../../assets/E-Commerce assets/images/slider-image-3.jpeg"
import img4 from "../../assets/E-Commerce assets/images/banner-4.jpeg"
import img5 from "../../assets/E-Commerce assets/images/grocery-banner-2.jpeg"



export default function Home() {
    const [allProducts, setallProducts] = useState([])
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        axios.get("https://ecommerce.routemisr.com/api/v1/products", {})
            .then((res) => {
                setallProducts(res?.data?.data)
                setisLoading(false)
            }
            ).catch((error) => console.log(error))

        return () => {
            console.log("Home will unmount");

        }
    }, [])
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    };



    return (
        <>

            {isLoading && <LoadingScreen />}

            <div className="p-5 container overflow-hidden mx-auto">
                <Slider {...settings}>
                    <div className="p-2"><img className="w-full" src={img1} alt="img1" /></div>
                    <div className="p-2"><img className="w-full mb-2" src={img4} alt="img4" />
                    <img className="w-full" src={img5} alt="img5" />
                    </div>
                    
                    <div className="p-2"><img className="w-full" src={img2} alt="img2" /></div>
                    <div className="p-2"><img className="w-full" src={img3} alt="img3" /></div>
                    
                </Slider>
            </div>
            <div className="container grid sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-4 mx-auto gap-3 py-4">

                {allProducts.map((product) => <Product key={product._id} prod={product} />)}

            </div>
        </>
    )
}
