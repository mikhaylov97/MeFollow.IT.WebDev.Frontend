import React, { Component } from "react";
import {Link} from "react-router-dom";
import "./emulator-left-menu.css";

const LeftMenuListBlock = () => {
    return (
        <div>
            <div className="left-menu-item-jsc-60">
                <Link to="/home">
                    <div>
                        <span>На главную</span>
                    </div>
                </Link>
            </div>
            <div className="left-menu-item-jsc-60">
                <Link to="/home">
                    <div>
                        <span>Назад к курсу</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

const ButtonOpenIcon = () => {
    return (
        <div className="expand-btn-jsc-60">
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

const ButtonCloseIcon = () => {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24"
             style={{color: '#fff', margin: '0 8px 0 0'}}>
            <path d="M13.414 12l5.293 5.293-1.414 1.414-6-6a1 1 0 010-1.414l6-6 1.414 1.414L13.414 12z"
                  fill="currentColor"></path>
            <path d="M10.879 12l-5.293 5.293L7 18.707l6-6a1 1 0 000-1.414l-6-6-1.414 1.414L10.879 12z"
                  fill="currentColor"></path>
        </svg>
    );
};

export default class EmulatorLeftMenu extends Component {

    state = {
        isLeftMenuOpened: false
    };

    onMenuButtonClicked = () => {
        const { isLeftMenuOpened } = this.state;
        this.setState({
            isLeftMenuOpened: !isLeftMenuOpened
        });
    };

    // let leftMenuBtn = document.getElementById("left-menu-btn");
    // leftMenuBtn.addEventListener("click", function(){
    //     let isOpened = this.classList.contains("opened");
    //     this.classList.toggle("opened");
    //
    //     let leftMenu = document.getElementById("left-menu");
    //     let expandIcon = document.querySelector(".left-menu-btn .expand-btn");
    //     let collapseIcon = document.querySelector(".left-menu-btn svg");
    //     if (isOpened) {
    //         leftMenu.style.left = "calc(-15vw + 44px)";
    //         expandIcon.style.display = "block";
    //         collapseIcon.style.display = "none";
    //
    //         let items = document.getElementsByClassName("left-menu-item");
    //         for (var i = 0; i < items.length; i++) {
    //             items[i].style.display = "none";
    //         }
    //     } else {
    //         leftMenu.style.left = "0";
    //         expandIcon.style.display = "none";
    //         collapseIcon.style.display = "block";
    //
    //         let items = document.getElementsByClassName("left-menu-item");
    //         for (var i = 0; i < items.length; i++) {
    //             items[i].style.display = "block";
    //         }
    //     }
    // });

    render() {
        const { isLeftMenuOpened } = this.state;

        const buttonToBeDisplayed = isLeftMenuOpened ? <ButtonCloseIcon /> : <ButtonOpenIcon />;
        const menuList = isLeftMenuOpened ? <LeftMenuListBlock /> : null;
        const leftMenuWidth = isLeftMenuOpened ? "0" : "calc(-15vw + 44px)";

        return (
            <div id="left-menu-jsc-60" className="left-menu-jsc-60 d-flex" style={{left: leftMenuWidth}}>
                <div id="left-menu-control-jsc-60" className="left-menu-control-jsc-60">
                    <button id="left-menu-btn-jsc-60" className={`left-menu-btn-jsc-60 ${isLeftMenuOpened ? "opened" : ""}`} onClick={() => this.onMenuButtonClicked()}>
                        {buttonToBeDisplayed}
                        <div className="menu-header-jsc-60">
                            <h5>Меню</h5>
                        </div>
                    </button>
                    {menuList}
                </div>
            </div>
        );
    }
};
