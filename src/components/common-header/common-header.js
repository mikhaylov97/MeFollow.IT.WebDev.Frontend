import React from "react";
import {Link} from "react-router-dom";
import "./common-header.css";

const LinksBlock = () => {
    return (
        <div className="top-menu-items-jsc-50">
            <ul>
                <li><Link to="/home">Отзывы</Link></li>
                <li><Link to="/home">О нас</Link></li>
                <li><Link className="common-btn-jsc-50" to="/home">Начать обучение</Link></li>
            </ul>
        </div>
    );
};

const CommonHeader = ({title, displayLinks}) => {
    const links = displayLinks ? <LinksBlock /> : null;

    return (
        <header className="top-menu-jsc-50">
            <div className="top-menu-wrapper-jsc-50">
                <h2>{title}</h2>
                {links}
            </div>
        </header>
    );
};

export default CommonHeader;
