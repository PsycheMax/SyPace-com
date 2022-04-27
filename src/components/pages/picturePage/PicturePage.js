import React from "react";
import { useParams } from "react-router-dom";

function PicturePage(props) {
    let params = useParams();

    return (
        <div className="text-white max-h-[75vh] h-[75vh]
        pt-8 px-0 mx-0
        flex flex-col items-center">
            <img src={props.uri} alt={props.alt}
                className="w-fit h-fit aspect-auto"
            />
            <div className=" font-white text-white grow-0">
                {props.name}
            </div>
            <div className="font-white text-white grow-0">
                LEFT - RIGHT
            </div>
        </div>
    )
}

PicturePage.defaultProps = {
    // uri: "https://cdn.pixabay.com/photo/2015/12/06/09/19/montmartre-1079246_960_720.jpg",
    uri: "https://cdn.pixabay.com/photo/2022/04/22/20/13/montmartre-7150549_960_720.jpg",
    name: "Default Picture - Montmartre",
    alt: "Default Picture - montmammeta",
    width: '',
    maxWidth: "145px",
    maxHeight: "500px",
    portrait: true
}

export default PicturePage;