import React from "react";
import { Link } from "react-router-dom";

function LinkInTopMenu(props) {
    return (

        props.external ?
            <a href={props.to} className={`
            tracking-widest text-white px-3
            ${props.selected ? "font-bold" : "font-normal"}            
            `} >

                {props.text}

            </a>
            :
            <Link to={props.to} className={`
            tracking-widest text-white px-3
            ${props.selected ? "font-bold" : "font-normal"}            
            `} >

                {props.text}

            </Link>


    )
}

LinkInTopMenu.defaultProps = {
    text: "LinkTitle",
    to: "/",
    external: false,
    selected: false
}

export default LinkInTopMenu;