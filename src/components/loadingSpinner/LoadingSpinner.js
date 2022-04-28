import React from "react";
import './LoadingSpinner.css';

function LoadingSpinner(props) {
    return (

        <div className="grid place-items-center h-[100vh] w-[100vw] absolute z-10 bg-black camera-cursor">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>

    )
}

export default LoadingSpinner;