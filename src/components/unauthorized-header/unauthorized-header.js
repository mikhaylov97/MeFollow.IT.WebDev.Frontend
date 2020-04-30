import React from 'react';

import './unauthorized-header.css';
import {Link} from "react-router-dom";
import logo from "./main-logo-blue-with-black.png";

const UnauthorizedHeader = () => {
    return (
        <header className="header-jsc-20 d-flex">
            <div>
                <Link to="/home">
                    <div className="logo-jsc-20">
                        <img width="auto" height="40" src={logo} alt="Logo"/>
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default UnauthorizedHeader;
