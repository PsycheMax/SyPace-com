import React from "react";

function Footer(props) {
    return (
        <footer className="text-center lg:text-left bg-black text-white" >
            <div className="text-center pt-6 bg-black">
                <span>© 2022 Copyright:</span><br />
                <a className="footer-link text-white font-semibold" href="http://sypace.com/">Syria Pace</a>
            </div>
            <div className="text-center text-sm bg-black pb-3">
                <span>This website was created by</span> <br />
                <a className="footer-link text-white font-semibold" href="https://maxpace.net/">Max Pace</a>
            </div>
        </footer >
    )
}

export default Footer;