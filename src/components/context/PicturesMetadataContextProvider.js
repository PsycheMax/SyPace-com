import React, { useState } from "react";

import JSONList from '../pages/homepage/ScrollList/ListOfPics.json';

export const PicturesMetadataContext = React.createContext({
    JSONList: [{
        uri: "",
        title: "",
        alt: "",
        _id: ""
    }],
    selectedPicture: {
        JSONListArrayPosition: "",
        uri: "",
        title: "",
        alt: "",
        _id: "",
        collection: ""
    },
    collatedPictures: [{
        JSONListArrayPosition: "",
        uri: "",
        title: "",
        alt: "",
        _id: "",
        collection: ""
    }],
    selectedCollectionName: "",
    setCollection: (collectionName) => { },
    getCollectionPictures: () => { },

    setPicture: (_id) => { },
    getNextPicture: () => { },
    getPreviousPicture: () => { },
    werePicturesLoaded: false,
    setPicturesLoaded: () => { }
});

function PictureMetadataContextProvider(props) {

    const [selectedPicture, setSelectedPicture] = useState();
    const [selectedCollectionName, setSelectedCollectionName] = useState();
    const [collatedPictures, setCollatedPictures] = useState();
    const [werePicturesLoaded, setWerePicturesLoaded] = useState(false);

    function setPicture(_id) {
        if (_id) {
            let picInArray = {};
            JSONList.forEach(pic => {
                if (pic._id === _id) {
                    picInArray = pic;
                }
            });
            setSelectedPicture({
                ...picInArray,
                JSONListArrayPosition: JSONList.indexOf(picInArray)
            })
        } else {
            setSelectedPicture()
        }
    }

    function getPictureBasedOnArrayIndex(arrayIndex) {
        return JSONList[arrayIndex];
    }

    function getNextPicture() {
        console.log("get next Picture");
        if (selectedPicture && selectedPicture.JSONListArrayPosition >= 0) {
            if (selectedPicture.JSONListArrayPosition === JSONList.length - 1) {
                console.log("Extreme case")
                return getPictureBasedOnArrayIndex(0);
            } else {
                console.log("Default case");
                return getPictureBasedOnArrayIndex(selectedPicture.JSONListArrayPosition + 1);
            }
        }
    }

    function getPreviousPicture() {
        console.log("get prev Picture");
        if (selectedPicture && selectedPicture.JSONListArrayPosition >= 0) {
            if (selectedPicture.JSONListArrayPosition === 0) {
                console.log("Extreme case")
                return getPictureBasedOnArrayIndex(JSONList.length - 1);
            } else {
                console.log("Default case");
                return getPictureBasedOnArrayIndex(selectedPicture.JSONListArrayPosition - 1);
            }
        }
    }

    function setCollection(collectionName) {
        if (collectionName) {
            setSelectedCollectionName(collectionName);
        } else {
            setSelectedCollectionName();
        }
    }

    function getCollectionPictures() {
        console.log("Get collection pictures");
        if (selectedCollectionName && selectedCollectionName.length > 0) {
            let newCollectionOfPictures = [];
            for (let index = 0; index < JSONList.length; index++) {
                const pic = JSONList[index];
                if (pic.collection === selectedCollectionName) {
                    newCollectionOfPictures.push(pic);
                }
            }
            setCollatedPictures(newCollectionOfPictures);
            console.log(newCollectionOfPictures);
        }
    }

    function setPicturesLoaded() {
        setWerePicturesLoaded(true);
    }

    return (
        <PicturesMetadataContext.Provider value={{
            JSONList, selectedPicture, setPicture, getNextPicture, getPreviousPicture, werePicturesLoaded, setPicturesLoaded,
            selectedCollectionName, setCollection, getCollectionPictures, collatedPictures
        }} >
            {props.children}
        </PicturesMetadataContext.Provider>
    )
}

export default PictureMetadataContextProvider;