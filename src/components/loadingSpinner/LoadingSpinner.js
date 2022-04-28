import React from "react";
import './LoadingSpinner.css';

function LoadingSpinner(props) {

    return (

        <div className={`grid place-items-center h-[100vh] w-[100vw] absolute z-10 bg-black camera-cursor
        transition-all duration-100 
            ${props.visible ? "opacity-100" : "opacity-0 h-0 w-0 z-0 "} 
        `}>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>

    )
}

LoadingSpinner.defaultProps = {
    visible: true
}

export default LoadingSpinner;