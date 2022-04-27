import React from "react";

function LinkInTopMenu(props) {
    return (

        <a href={props.uri} className={`
            tracking-widest text-white px-3
            ${props.selected ? "font-bold" : "font-normal"}            
            `} >

            {props.text}

        </a>

    )
}

LinkInTopMenu.defaultProps = {
    text: "LinkTitle",
    uri: "http://urigoeshere/",
    selected: false
}

export default LinkInTopMenu;