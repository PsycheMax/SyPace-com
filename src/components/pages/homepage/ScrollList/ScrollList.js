import React, { useContext, useState } from "react";
import { PicturesMetadataContext } from "../../../context/PicturesMetadataContextProvider";
import LoadingSpinner from "../../../loadingSpinner/LoadingSpinner";

import "./ScrollList.css";
import SinglePicture from "./SinglePicture";

function ScrollList(props) {

    const { JSONList: ListOfPicsJSON } = useContext(PicturesMetadataContext);

    const [picsLoaded, setPicsLoaded] = useState(0);

    function onLoadFunction() {
        setPicsLoaded((prevState) => {
            return prevState + 1;
        })
    }

    function CreateListOfSinglePictures() {
        let toReturn = [];
        for (let index = 0; index < ListOfPicsJSON.length; index++) {
            const pic = ListOfPicsJSON[index];
            console.log(pic.uri)
            let toAdd = <SinglePicture key={pic._id} pictureMetaData={pic} onLoadFunction={onLoadFunction} first={index === 0 ? true : false} goToPicture={false} />;
            toReturn.push(toAdd);
        }
        return toReturn;
    }

    return (
        <>
            {picsLoaded === ListOfPicsJSON.length ? <LoadingSpinner visible={false} /> : <LoadingSpinner />}
            <div className={`list-container px-4  py-6
            ${picsLoaded === ListOfPicsJSON.length ? "overflow-auto" : "hidden-at-start"}
            `}>
                <ul className="justify-items-center 
            columns-2 sm:columns-3 md:columns-4 lg:columns-5
            ">
                    {CreateListOfSinglePictures()}
                </ul>
            </div>
        </>
    )
}

export default ScrollList;


        // The following function is a shuffler algo
        // for (var i = toReturn.length - 1; i > 0; i--) {
        //     var j = Math.floor(Math.random() * (i + 1));
        //     var temp = toReturn[i];
        //     toReturn[i] = toReturn[j];
        //     toReturn[j] = temp;
        // }