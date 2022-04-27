import React from "react";

function LinkInTopMenu(props) {
    return (
        <a href={props.uri}>
            <div className={`
            tracking-widest text-white 
            ${props.selected ? "font-bold" : "font-normal"}            
            `} >
                {props.text}
            </div>
        </a>
    )
}

LinkInTopMenu.defaultProps = {
    text: "LinkTitle",
    uri: "http://urigoeshere/",
    selected: false
}

export default LinkInTopMenu;