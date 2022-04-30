import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import convertNameToReadable from "../../../utils/convertNameToReadable";
import { PicturesMetadataContext } from "../../context/PicturesMetadataContextProvider";
import LoadingSpinner from "../../loadingSpinner/LoadingSpinner";

import "./PicturePage.css";

function PicturePage(props) {
    let params = useParams();
    let navigate = useNavigate();

    const [windowDimensions, setWindowDimensions] = useState({
        windowWidth: window.innerWidth,
        windowHeigth: window.innerHeight
    })

    const [showLoadingCursor, setShowLoadingCursor] = useState(false);
    const [showLeftCursor, setShowLeftCursor] = useState(false);
    const [showRightCursor, setShowRightCursor] = useState(false)

    const { selectedPicture, setPicture, getNextPicture, getPreviousPicture, selectedCollectionName, setCollection } = useContext(PicturesMetadataContext);
    let uriFromParam = `/assets/pictures/${params.collectionID}/${params.picID}`;

    // If the picture is not the "selected picture" in our state manager, then set it as a selected picture
    useEffect(() => {
        if (!selectedPicture || selectedPicture._id !== params.picID) {
            setPicture(params.picID);
        }
        if (!selectedCollectionName || selectedCollectionName !== params.collectionID) {
            setCollection(params.collectionID);
        }
    })

    const detectSize = () => {
        setWindowDimensions({
            windowWidth: window.innerWidth,
            windowHeigth: window.innerHeight
        })
    }

    useEffect(() => {
        window.addEventListener('resize', detectSize);

        return () => {
            window.removeEventListener('resize', detectSize);
        }
    }, [windowDimensions])


    function handleRightSideClick() {
        setShowLoadingCursor(true);
        let targetPicData = getNextPicture();
        let newUri = `/pic/${targetPicData.collection}/${targetPicData._id}`;
        navigate(newUri)
    }
    function handleLeftSideClick() {
        setShowLoadingCursor(true);
        let targetPicData = getPreviousPicture();
        let newUri = `/pic/${targetPicData.collection}/${targetPicData._id}`;
        navigate(newUri)
    }

    function handleClick(event) {
        let xPosition = event.clientX;
        if (xPosition <= (windowDimensions.windowWidth / 2)) {
            handleLeftSideClick()
        }
        if (xPosition >= (windowDimensions.windowWidth / 2)) {
            handleRightSideClick()
        }
    }

    function handleLoad(event) {
        setShowLoadingCursor(false);
    }

    function handleMouseMove(event) {
        let xPosition = event.clientX;
        if (xPosition <= (windowDimensions.windowWidth / 2)) {
            setShowLeftCursor(true);
            setShowRightCursor(false);
        }
        if (xPosition >= (windowDimensions.windowWidth / 2)) {
            setShowLeftCursor(false);
            setShowRightCursor(true);
        }
    }

    return (
        selectedPicture ?
            <div className={`text-white min-h-[100%] min-w-[100%] noselect
        pt-2  max-h-[100%]
        flex flex-col items-center 
        ${showLeftCursor ? "image-show-left-cursor" : ""}
        ${showRightCursor ? "image-show-right-cursor" : ""}
        ${showLoadingCursor ? "image-show-loading-cursor" : ""}
        `}
                onMouseDown={handleClick}
                onLoad={handleLoad}
                onMouseMove={handleMouseMove}
            >
                <Link to={`/pic/${selectedPicture.collection}`}>
                    <div className=" text-white text-xl pb-2">
                        {convertNameToReadable(selectedPicture.decorativeCollectionName)}
                    </div>
                </Link>

                <img src={uriFromParam} alt={selectedPicture.alt}
                    className={`w-auto h-auto max-w-[100vw] max-h-[77vh]`}
                    onError={() => { navigate("/") }}
                />
                <div className=" font-white text-white grow-0">
                    {/* {selectedPicture.collection} */}
                    {selectedPicture.title}

                </div>

            </div> :
            <LoadingSpinner />
    )
}

PicturePage.defaultProps = {

}

export default PicturePage;