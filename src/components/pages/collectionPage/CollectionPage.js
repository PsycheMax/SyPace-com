import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import convertNameToReadable from "../../../utils/convertNameToReadable";
import { PicturesMetadataContext } from "../../context/PicturesMetadataContextProvider";
import LoadingSpinner from "../../loadingSpinner/LoadingSpinner";
import SinglePicture from "../homepage/ScrollList/SinglePicture";

function CollectionPage(props) {
    let params = useParams()

    let { selectedCollectionName, collatedPictures, getCollectionPictures, setCollection } = useContext(PicturesMetadataContext);

    const [windowDimensions, setWindowDimensions] = useState({
        windowWidth: window.innerWidth,
        windowHeigth: window.innerHeight
    })

    // If the collection is not the "selected collection" in our state manager, then set it as a selected collection
    useEffect(() => {
        if (!selectedCollectionName || selectedCollectionName !== params.collectionID) {
            setCollection(params.collectionID);
        }
    })

    useEffect(() => {
        getCollectionPictures();
    }, [selectedCollectionName])

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

    function CreateListOfSinglePictures() {
        let toReturn = [];
        if (collatedPictures && collatedPictures.length > 0) {
            for (let index = 0; index < collatedPictures.length; index++) {
                const pic = collatedPictures[index];
                let toAdd = <SinglePicture key={pic._id} pictureMetaData={pic}
                    // onLoadFunction={onLoadFunction}
                    goToPicture={true}
                    first={index === 0 ? true : false} />;
                toReturn.push(toAdd);
            }
            return toReturn;
        }
    }

    return (
        true ?
            <div className={`font-white min-w-full`}>
                <div className="py-4 text-white text-3xl
                sm:border-b-2 md:border-b-4 sm:border-slate-50">
                    {convertNameToReadable(selectedCollectionName)} Project
                </div>

                COLLECTION PAGE
                <ul className="justify-items-center mx-4
            columns-2 sm:columns-3 md:columns-4 lg:columns-5
            ">
                    {CreateListOfSinglePictures()}
                </ul>
            </div> :
            <>
                <LoadingSpinner />
            </>
    )
}

export default CollectionPage;