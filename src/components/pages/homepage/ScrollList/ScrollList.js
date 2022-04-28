import React, { useContext, useEffect, useState } from "react";
import { PicturesMetadataContext } from "../../../context/PicturesMetadataContextProvider";
import LoadingSpinner from "../../../loadingSpinner/LoadingSpinner";

import "./ScrollList.css";
import SinglePicture from "./SinglePicture";

function ScrollList(props) {

    const { JSONList: ListOfPicsJSON } = useContext(PicturesMetadataContext);

    const [picsLoaded, setPicsLoaded] = useState(0);

    function onLoadFunction() {
        console.log("LOADED")
        setPicsLoaded((prevState) => {
            return prevState + 1;

        })
        console.log(picsLoaded)
    }

    function CreateListOfSinglePictures() {
        let toReturn = [];
        let newPicsLoaded = [];

        for (let index = 0; index < ListOfPicsJSON.length; index++) {
            const pic = ListOfPicsJSON[index];
            let toAdd = <SinglePicture key={pic._id} pictureMetaData={pic} onLoadFunction={onLoadFunction} />;
            toReturn.push(toAdd);
            newPicsLoaded.push(false);

        }

        // The following lines are a shuffler algo
        // for (var i = toReturn.length - 1; i > 0; i--) {
        //     var j = Math.floor(Math.random() * (i + 1));
        //     var temp = toReturn[i];
        //     toReturn[i] = toReturn[j];
        //     toReturn[j] = temp;
        // }
        return toReturn;
    }

    return (
        <>
            <div className={`list-container px-4 zindex py-6
            ${picsLoaded === ListOfPicsJSON.length ? "" : "absolute z-0"}
            `}>
                <ul className="justify-items-center 
            columns-2 sm:columns-3 md:columns-4 lg:columns-5
            ">
                    {CreateListOfSinglePictures()}
                </ul>
            </div>
            {picsLoaded === ListOfPicsJSON.length ? null : <LoadingSpinner />}
        </>
    )
}

export default ScrollList;