import React from "react";
import './MiniLoadingSpinner.css';

function MiniLoadingSpinner(props) {

    return (

        <div className={` loading-cursor
        transition-all duration-100 
            ${props.visible ? "opacity-100" : "opacity-0 h-0 w-0 z-0 "} 
        `}>
            <div className="lds-dual-ring"></div>
        </div>

    )
}

MiniLoadingSpinner.defaultProps = {
    visible: true
}

export default MiniLoadingSpinner;