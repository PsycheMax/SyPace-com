import React, { useState } from "react";

import JSONList from '../pages/ScrollList/ListOfPics.json';

export const PicturesMetadataContext = React.createContext({
    JSONList: [{
        uri: "",
        title: "",
        alt: "",
        _id: "",
        collection: "",
        decorativeCollectionName: "",
        width: "",
        height: ""
    }],
    selectedPicture: {
        JSONListArrayPosition: "",
        uri: "",
        title: "",
        alt: "",
        _id: "",
        collection: "",
        decorativeCollectionName: "",
        width: "",
        height: ""
    },
    collatedPictures: [{
        JSONListArrayPosition: "",
        uri: "",
        title: "",
        alt: "",
        _id: "",
        collection: "",
        decorativeCollectionName: "",
        width: "",
        height: ""
    }],
    selectedCollectionName: "",
    setCollection: (collectionName) => { },
    getCollectionPictures: () => { },
    getCollectionDecorativeName: () => { },
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
        if (selectedPicture && selectedPicture.JSONListArrayPosition >= 0) {
            if (selectedPicture.JSONListArrayPosition === JSONList.length - 1) {
                return getPictureBasedOnArrayIndex(0);
            } else {
                return getPictureBasedOnArrayIndex(selectedPicture.JSONListArrayPosition + 1);
            }
        }
    }

    function getPreviousPicture() {
        if (selectedPicture && selectedPicture.JSONListArrayPosition >= 0) {
            if (selectedPicture.JSONListArrayPosition === 0) {
                return getPictureBasedOnArrayIndex(JSONList.length - 1);
            } else {
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
        if (selectedCollectionName && selectedCollectionName.length > 0) {
            let newCollectionOfPictures = [];
            for (let index = 0; index < JSONList.length; index++) {
                const pic = JSONList[index];
                if (pic.collection === selectedCollectionName) {
                    newCollectionOfPictures.push(pic);
                }
            }
            setCollatedPictures(newCollectionOfPictures);
        }
    }

    function getCollectionDecorativeName() {
        if (selectedCollectionName && selectedCollectionName.length > 0) {
            for (let index = 0; index < JSONList.length; index++) {
                const pic = JSONList[index];
                if (pic.collection === selectedCollectionName) {
                    return pic.decorativeCollectionName;
                }
            }
        }
    }

    function setPicturesLoaded() {
        setWerePicturesLoaded(true);
    }

    return (
        <PicturesMetadataContext.Provider value={{
            JSONList, selectedPicture, setPicture, getNextPicture, getPreviousPicture, werePicturesLoaded, setPicturesLoaded,
            selectedCollectionName, setCollection, getCollectionPictures, collatedPictures, getCollectionDecorativeName
        }} >
            {props.children}
        </PicturesMetadataContext.Provider>
    )
}

export default PictureMetadataContextProvider;