import React, { useState } from "react";
import { Link } from "react-router-dom";
import MiniLoadingSpinner from "../../../loadingSpinner/MiniLoadingSpinner";

function SinglePicture(props) {

    const { uri, alt, _id, collection } = props.pictureMetaData;

    const [showPicture, setShowPicture] = useState(false);

    console.log(uri);
    return (
        <li className={`${props.first ? "mb-3" : "my-3"}`}
            key={_id}
        >
            <div className={`h-[100%] w-[100%] 
        ${props.first ? "mb-3" : "my-3"}
        ${showPicture ? "hidden" : "block"}
        border-2 rounded-md my-2 grid place-items-center
        min-h-[8rem] md:min-h-[10rem] min-w-[5rem]`}>
                <MiniLoadingSpinner />
            </div>

            <Link to={props.goToPicture ? `/pic/${collection}/${_id}` : `/pic/${collection}`}>
                <img src={uri} alt={alt} className={`pic 
            hover:brightness-150 transition-all duration-150
            ${showPicture ? "block" : "hidden"}
            `}
                    onLoad={() => { setShowPicture(true) }}
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
        _id: "whatever",
        collection: "collection"
    },
    onLoadFunction: () => { console.log("Loaded") },
    goToPicture: false
}

export default SinglePicture;