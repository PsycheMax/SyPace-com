import React from "react";
import { Link } from "react-router-dom";

function SinglePicture(props) {
    return (

        <li >
            <Link to={`/pic/${props._id}`}>
                <img src={props.uri} alt={props.alt} className={`pic mb-3
            hover:brightness-125 transition-all duration-150
            `}
                />
            </Link>
        </li >
    )
}

SinglePicture.defaultProps = {
    uri: "https://cdn.pixabay.com/photo/2022/04/22/20/13/montmartre-7150549_960_720.jpg",
    name: "Default Picture - Montmartre",
    alt: "Default Picture - montmammeta",
    maxWidth: "145px",
    maxHeight: "500px",
    portrait: true,
    _id: "whatever"
}

export default SinglePicture;