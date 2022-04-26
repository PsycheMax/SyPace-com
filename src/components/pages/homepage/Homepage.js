import React from "react";
import Header from "../menus/Header";

function HomePage() {
    return (
        <div className="bg-black">
            <Header />
            <div className="main-container container">
                <h1 className="text-3xl font-bold underline bg-indigo-500 text-white">
                    MAIN CONTAINER CONTAINING PICTURES
                </h1>
            </div>
        </div>
    )
}

export default HomePage;