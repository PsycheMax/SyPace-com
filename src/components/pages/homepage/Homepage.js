import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../menus/header/Header";
import '../../../App.css'
import PictureMetadataContextProvider from "../../context/PicturesMetadataContextProvider";
import Footer from "../menus/footer/Footer";

function HomePage(props) {
    return (
        <PictureMetadataContextProvider>
            <div className="monserrat-font bg-black min-h-[100vh] text-center">
                <nav className="min-h-[6rem]">
                    <Header />
                </nav>
                <Outlet />
                <Footer />
            </div>
        </PictureMetadataContextProvider>
    )
}

export default HomePage;