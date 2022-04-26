import React from "react";
import TopMenu from "./TopMenu";

function Header() {
    return (
        <div className="
        bg-black min-w-full w-full h-12 min-h-[5rem] 
        border-b-4 border-slate-50 my-auto pt-4">
            <TopMenu />
            <div className="mx-auto container">

                <div className="flex flex-row">
                    <div className="basis-1/2">
                        Portfolio
                    </div>
                    <div className="basis-1/2">
                        Instacazz
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;