import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../menus/footer/Footer";
import Header from "../menus/header/Header";
import '../../../App.css'

function HomePage(props) {
    return (
        <div className="monserrat-font bg-black min-h-[100vh] min-w-[100vw] text-center">
            <nav className="min-h-[6rem] bg-indigo-700">
                <Header />
            </nav>
            <Outlet />
            {/* <Footer /> */}
        </div>
    )
}

export default HomePage;