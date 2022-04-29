import React, { useState, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import MiniLoadingSpinner from "../../loadingSpinner/MiniLoadingSpinner";
// import PictureContent from "./PictureContent";

const PictureContent = lazy(() => { return import('./PictureContent') });

function SinglePicture(props) {

    const { uri, alt, _id, collection, width, height } = props.pictureMetaData;

    const [showPicture, setShowPicture] = useState(false);

    const orientation = function () {
        const ratio = width / height;
        if (ratio <= 0.9) {
            return "portrait";
        }
        if (ratio >= 0.9 && ratio <= 1.1) {
            return "square";
        }
        if (ratio > 1.1) {
            return "landscape";
        }
    }

    return (
        <li className={`${props.first ? "mb-3" : "my-3"}`}
            key={_id}
        >

            <Suspense fallback={<div className={`h-[100%] w-[100%] 
                            ${props.first ? "mb-3" : "my-3"}
                            ${showPicture ? "hidden" : "block"}
                            border-2 rounded-md my-2 grid place-items-center                           
                            `}>
                <MiniLoadingSpinner />
            </div>}>
                <div className={`h-[100%] w-[100%] 
                            ${props.first ? "mb-3" : "my-3"}
                            ${showPicture ? "hidden" : "block"}
                            border-0 rounded-md my-2 grid place-items-center                           
                            `}>
                    <MiniLoadingSpinner />
                </div>
                <PictureContent to={props.goToPicture ? `/pic/${collection}/${_id}` : `/pic/${collection}`}
                    pictureMetaData={props.pictureMetaData} key={props.pictureMetaData._id}
                    onLoad={() => { setShowPicture(true) }}
                    className={`pic 
            hover:brightness-150 transition-all duration-150
            ${showPicture ? "block" : "hidden"}
            `} />
            </Suspense>

        </li >
    )
}

SinglePicture.defaultProps = {
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
    goToPicture: false
}

export default SinglePicture;