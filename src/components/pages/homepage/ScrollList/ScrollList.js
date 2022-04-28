import React, { useContext } from "react";
import { PicturesMetadataContext } from "../../../context/PicturesMetadataContextProvider";
import SinglePicture from "./SinglePicture";

function ScrollList(props) {

    const ListOfPicsJSON = useContext(PicturesMetadataContext).JSONList;

    function CreateListOfSinglePictures() {
        let toReturn = [];
        ListOfPicsJSON.forEach(pic => {
            let toAdd = <SinglePicture pictureMetaData={pic} />;
            toReturn.push(toAdd);
        });

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
        <div className="list-container px-4">
            <ul className="justify-items-center 
            columns-2 sm:columns-3 md:columns-4 lg:columns-5
            ">


                {CreateListOfSinglePictures()}


            </ul>
        </div>
    )
}

export default ScrollList;