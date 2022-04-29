import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LinkInTopMenu from "./LinkInTopMenu";
import TopMenu from "./TopMenu";

function Header(props) {

    const locationPath = useLocation().pathname;
    const [location, setLocation] = useState(locationPath.toString());

    useEffect(() => {
        if (location && location !== locationPath.toString()) {
            setLocation(locationPath.toString())
        }
    })


    return (
        <div className=" 
        bg-black min-w-full w-full 
        ">
            <div className="sm:border-b-2 md:border-b-4 sm:border-slate-50 my-auto py-4">
                <TopMenu />
            </div>
            <div className="sm:border-b-2 md:border-b-4 sm:border-slate-50">
                <div className="mx-auto max-w-[20rem] my-auto ">
                    <div className="py-2 mx-auto justify-items-center justify-self-center ">
                        <LinkInTopMenu
                            selected={location === "/"}
                            text="Portfolio" to={"/"} />
                        <LinkInTopMenu
                            external={true} text="Instagram" to={"https://instagram.com/syria_pace"} />
                        <LinkInTopMenu
                            selected={location === "/about"}
                            text="About" to={"/about"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;