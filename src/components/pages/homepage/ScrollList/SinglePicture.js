import React from "react";

function SinglePicture(props) {
    return (

        <li >
            <img src={props.uri} alt={props.alt} className={`pic mb-3
            hover:brightness-125 transition-all duration-150
            `}
            // style={{ maxWidth: props.maxWidth, maxHeight: props.maxHeight }}
            />
        </li >
    )
}

SinglePicture.defaultProps = {
    uri: "https://cdn.pixabay.com/photo/2022/04/22/20/13/montmartre-7150549_960_720.jpg",
    name: "Default Picture - Montmartre",
    alt: "Default Picture - montmammeta",
    maxWidth: "145px",
    maxHeight: "500px",
    portrait: true
}

export default SinglePicture;