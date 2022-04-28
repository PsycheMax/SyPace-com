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
            <div className="sm:border-b-2 md:border-b-4 sm:border-slate-50">
                <div className="mx-auto max-w-[20rem] my-auto ">
                    <div className="py-2 mx-auto justify-items-center justify-self-center ">
                        <LinkInTopMenu selected={true} text="Portfolio" to={"/"} />
                        <LinkInTopMenu external={true} text="Instacazz" to={"https://instagram.com/syria_pace"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;