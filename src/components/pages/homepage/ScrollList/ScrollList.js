import React from "react";
import SinglePicture from "./SinglePicture";


function ScrollList(props) {
    return (
        <div className="list-container px-4">
            <ul className="justify-items-center 
            columns-2 sm:columns-3 md:columns-4 lg:columns-5
            ">
                <SinglePicture uri={"https://cdn.pixabay.com/photo/2015/12/06/09/19/montmartre-1079246_960_720.jpg"} />
                <SinglePicture />
                <SinglePicture uri={"https://cdn.pixabay.com/photo/2015/12/06/09/19/montmartre-1079246_960_720.jpg"} />

                <SinglePicture />
                <SinglePicture uri={"https://cdn.pixabay.com/photo/2015/12/06/09/19/montmartre-1079246_960_720.jpg"} />
                <SinglePicture uri={"https://cdn.pixabay.com/photo/2015/12/06/09/19/montmartre-1079246_960_720.jpg"} />
                <SinglePicture />
                <SinglePicture uri={"https://cdn.pixabay.com/photo/2015/12/06/09/19/montmartre-1079246_960_720.jpg"} />

                <SinglePicture />
                <SinglePicture uri={"https://cdn.pixabay.com/photo/2015/12/06/09/19/montmartre-1079246_960_720.jpg"} />
                <SinglePicture uri={"https://cdn.pixabay.com/photo/2015/12/06/09/19/montmartre-1079246_960_720.jpg"} />
                <SinglePicture />
                <SinglePicture uri={"https://cdn.pixabay.com/photo/2015/12/06/09/19/montmartre-1079246_960_720.jpg"} />

                <SinglePicture />
                <SinglePicture uri={"https://cdn.pixabay.com/photo/2015/12/06/09/19/montmartre-1079246_960_720.jpg"} />
                <SinglePicture uri={"https://cdn.pixabay.com/photo/2015/12/06/09/19/montmartre-1079246_960_720.jpg"} />
                <SinglePicture />
                <SinglePicture uri={"https://cdn.pixabay.com/photo/2015/12/06/09/19/montmartre-1079246_960_720.jpg"} />

                <SinglePicture />
                <SinglePicture uri={"https://cdn.pixabay.com/photo/2015/12/06/09/19/montmartre-1079246_960_720.jpg"} />
                <SinglePicture uri={"https://cdn.pixabay.com/photo/2015/12/06/09/19/montmartre-1079246_960_720.jpg"} />
                <SinglePicture />
                <SinglePicture uri={"https://cdn.pixabay.com/photo/2015/12/06/09/19/montmartre-1079246_960_720.jpg"} />

                <SinglePicture />
                <SinglePicture uri={"https://cdn.pixabay.com/photo/2015/12/06/09/19/montmartre-1079246_960_720.jpg"} />

            </ul>
        </div>
    )
}

export default ScrollList;