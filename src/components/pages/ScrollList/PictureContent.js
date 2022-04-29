import React from "react";
import { Link } from "react-router-dom";

function PictureContent(props) {

    return (

        <Link to={props.to}>
            <img src={props.pictureMetaData.uri} alt={props.pictureMetaData.alt} className={props.className}
                onLoad={props.onLoad}
                key={props.pictureMetaData._id} />
        </Link>
    )
}

PictureContent.defaultProps = {
    pictureMetaData: {
        uri: "https://cdn.pixabay.com/photo/2022/04/22/20/13/montmartre-7150549_960_720.jpg",
        name: "Default Picture - Montmartre",
        alt: "Default Picture - montmammeta",
        _id: "whatever",
        collection: "collection",
        width: "",
        height: ""
    },
    onLoadFunction: () => { console.log("Loaded") },
    to: "",
    className: ""
}

export default PictureContent;