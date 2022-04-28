import React from "react";
import { Link } from "react-router-dom";

function SinglePicture(props) {

    const { uri, alt, _id } = props.pictureMetaData;

    return (

        <li className={`${props.first ? "mb-3" : "my-3"}`}
            key={_id}
        >

            <Link to={`/pic/${_id}`}>
                <img src={uri} alt={alt} className={`pic 
            hover:brightness-150 transition-all duration-150
            `}
                    onLoad={props.onLoadFunction}
                    key={_id} />
            </Link>
        </li >
    )
}

SinglePicture.defaultProps = {
    pictureMetaData: {
        uri: "https://cdn.pixabay.com/photo/2022/04/22/20/13/montmartre-7150549_960_720.jpg",
        name: "Default Picture - Montmartre",
        alt: "Default Picture - montmammeta",
        _id: "whatever"
    },
    onLoadFunction: () => { console.log("Loaded") }
}

export default SinglePicture;