import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { PicturesMetadataContext } from "../../context/PicturesMetadataContextProvider";

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

    const { selectedPicture, setPicture, getNextPicture, getPreviousPicture } = useContext(PicturesMetadataContext);
    let uriFromParam = `/assets/pictures/${params.picID}`;

    // If the picture is not the "selected picture" in our state manager, then set it as a selected picture
    useEffect(() => {
        if (!selectedPicture || selectedPicture._id !== params.picID) {
            setPicture(params.picID);
            console.log(selectedPicture);
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
        let newUri = `/pic/${targetPicData._id}`;
        navigate(newUri)
    }
    function handleLeftSideClick() {
        setShowLoadingCursor(true);
        let targetPicData = getPreviousPicture();
        let newUri = `/pic/${targetPicData._id}`;
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
        console.log(event);
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
            <div className="text-white max-h-[80vh] h-[80vh]
        pt-8
        flex flex-col items-center">

                <img src={uriFromParam} alt={selectedPicture.alt}
                    className={`w-fit h-fit aspect-auto grow-0 
                    ${showLeftCursor ? "image-show-left-cursor" : ""}
                    ${showRightCursor ? "image-show-right-cursor" : ""}
                    ${showLoadingCursor ? "image-show-loading-cursor" : ""}
                    
                    `}
                    onMouseDown={handleClick}
                    onLoad={handleLoad}
                    onMouseMove={handleMouseMove}
                />
                <div className=" font-white text-white grow-0">
                    {selectedPicture.title}
                    {console.log(selectedPicture)}
                </div>
                {/* <div onTouchEnd={handleLeftSideClick} className="font-white text-white grow-0">
                    LEFT
                </div>
                <div onTouchEnd={handleRightSideClick} className="font-white text-white grow-0">
                    RIGHT
                </div> */}
            </div> :
            <></>
    )
}

PicturePage.defaultProps = {

}

export default PicturePage;