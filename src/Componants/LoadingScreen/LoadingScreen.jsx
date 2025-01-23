import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

export default function LoadingScreen() {
    return (
        <div className="h-screen  w-full flex justify-center items-center">
            {/* <i className="fas fa-spinner fa-spin fa-5x"></i> */}
            <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}
