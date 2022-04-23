import React from 'react'
import {Link} from "react-router-dom";
import "../../styles/footer.css";
const Footer = () => {
    return (
        <div className="footer_container">
            <div>
                 <div className="nav_logo">
                    <Link to="/"  ><img src="/images/logo3.png" alt="logo" />Shop<span>Mart</span></Link>
                </div>
            </div>  



        </div>
    )
}

export default Footer;
