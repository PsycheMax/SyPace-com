import React from "react";
import LinkInTopMenu from "./LinkInTopMenu";
import TopMenu from "./TopMenu";

function Header(props) {
    return (
        <div className=" 
        bg-black min-w-full w-full 
        ">
            <div className="sm:border-b-2 md:border-b-4 sm:border-slate-50 my-auto py-4">
                <TopMenu />
            </div>
            <div className="sm:border-b-4 sm:border-slate-50">
                <div className="mx-auto max-w-[20rem] my-auto justify-items-center">
                    <div className="columns-2 py-2 ">
                        <LinkInTopMenu selected={true} text="Portfolio" uri={"http://sypace.com"} />
                        <LinkInTopMenu text="Instacazz" uri={"https://instagram.com/syria.pace"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;