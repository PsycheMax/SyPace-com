import React from "react";
import Footer from "../menus/footer/Footer";
import Header from "../menus/header/Header";
import ContentContainer from "./ContentContainer";

function HomePage(props) {
    return (
        <div className="bg-black">
            <div className="min-h-[6rem] bg-indigo-700">
                <Header />
            </div>
            <div className="mammeto">
                <ContentContainer />
            </div>

            <Footer />
        </div>
    )
}

export default HomePage;