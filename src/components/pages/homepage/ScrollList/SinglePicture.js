import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PicturesMetadataContext } from "../../../context/PicturesMetadataContextProvider";

function SinglePicture(props) {

    const setPicture = useContext(PicturesMetadataContext).setPicture;

    const { uri, title, alt, _id } = props.pictureMetaData;

    function handleTouch() {
        setPicture(_id);
    }

    return (

        <li className="my-3"
            key={_id}
        // onTouchStart={handleTouch}
        >

            <Link to={`/pic/${_id}`}>
                <img src={uri} alt={alt} className={`pic 
            hover:brightness-150 transition-all duration-150
            `}
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
    }
}

export default SinglePicture;