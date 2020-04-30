import React, { Component } from "react";
import "./emulator-browser.css";

const ExpandIcon = () => {
    return (
        <svg id="full-screen-icon-jsc-80" enableBackground="new 0 0 64 64" height="512" viewBox="0 0 64 64"
             width="512">
            <path d="m26.586 34.586-14.586 14.586v-5.172c0-1.104-.896-2-2-2s-2 .896-2 2v10c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2s-.896-2-2-2h-5.172l14.586-14.586c.781-.781.781-2.047 0-2.828-.78-.781-2.048-.781-2.828 0z"/>
            <path d="m54 8h-10c-1.104 0-2 .896-2 2s.896 2 2 2h5.172l-14.586 14.586c-.781.781-.781 2.047 0 2.828.391.391.902.586 1.414.586s1.023-.195 1.414-.586l14.586-14.586v5.172c0 1.104.896 2 2 2s2-.896 2-2v-10c0-1.104-.896-2-2-2z"/>
        </svg>
    );
};

const CollapseIcon = () => {
    return (
        <svg id="shrink-icon-jsc-80" enableBackground="new 0 0 64 64" height="512"
             viewBox="0 0 64 64" width="512">
            <path d="m52.586 8.586-14.586 14.586v-5.172c0-1.104-.896-2-2-2s-2 .896-2 2v10c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2s-.896-2-2-2h-5.172l14.586-14.586c.781-.781.781-2.047 0-2.828s-2.047-.781-2.828 0z"/>
            <path d="m10 56c.512 0 1.023-.195 1.414-.586l14.586-14.586v5.172c0 1.104.896 2 2 2s2-.896 2-2v-10c0-1.104-.896-2-2-2h-10c-1.104 0-2 .896-2 2s.896 2 2 2h5.172l-14.586 14.586c-.781.781-.781 2.047 0 2.828.391.391.902.586 1.414.586z"/>
        </svg>
    );
};

class Frame extends Component {
    render() {
        const { emulatorFrameUrl, toggle } = this.props;
        console.log("Toggle " + toggle);
        return (
            <iframe id="emulator-frame-jsc-80" key={`${toggle}`} title="TechLab Web Browser Emulator" allowFullScreen=""
                    allow="geolocation; microphone; camera"
                    src={emulatorFrameUrl} />
        );
    }
}

export default class EmulatorBrowser extends Component {

    constructor(props) {
        super(props);

        const { emulatorSourceUrl, emulatorFrameUrl } = props;
        this.state = {
            emulatorSourceUrl: emulatorSourceUrl,
            emulatorFrameUrl: emulatorFrameUrl
        };
    }

    onRefreshButtonClicked = () => {
        const { emulatorSourceUrl } = this.state;
        this.setState({
            emulatorFrameUrl: emulatorSourceUrl
        });
    };

    onEmulatorFrameUrlUpdated = (event, onObtainFrameToggleSwitched) => {
        event.which = event.which || event.keyCode;
        if(event.which === 13) {
            const { emulatorSourceUrl } = this.state;
            this.setState({
                emulatorFrameUrl: emulatorSourceUrl
            });
            onObtainFrameToggleSwitched();
        }
    };

    onEmulatorSourceUrlInputChange = (event) => {
        const { value } = event.target;
        this.setState({
            emulatorSourceUrl: value
        });
    };

    onExpandOrCollapseBrowserButtonClicked = () => {
        const { isFullScreenEnabled } = this.state;
        this.setState({
            isFullScreenEnabled: !isFullScreenEnabled
        });
    };

    render() {
        const { fullScreenEnabled, obtainFrameToggle, onMaskDisplayedStateChange, onObtainFrameToggleSwitched } = this.props;

        const { emulatorSourceUrl, emulatorFrameUrl } = this.state;

        const buttonTeBeDisplayed = fullScreenEnabled ? <CollapseIcon /> : <ExpandIcon />;
        const emulatorLeft = fullScreenEnabled ? "-35vw" : "0%";
        const emulatorWidth = fullScreenEnabled ? "calc(100% + 35vw)" : "100%";

        return (
            <div id="emulator-area-jsc-80" className="emulator-area-jsc-80" style={{left: emulatorLeft, width: emulatorWidth}}>
                <div className="emulator-area-controls-jsc-80">
                    <div>
                        <button>
                            <svg preserveAspectRatio="xMidYMid meet" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#currentColor"
                                      d="M9.728 12.5l5.855-5.664L14.72 6 8 12.5l6.72 6.5.863-.886z" />
                            </svg>
                            <span className="tooltiptext-jsc-80">Назад</span>
                        </button>
                        <button>
                            <svg preserveAspectRatio="xMidYMid meet" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#currentColor"
                                      d="M13.855 12.5L8 18.164l.864.836 6.719-6.5L8.863 6 8 6.886z" />
                            </svg>
                            <span className="tooltiptext-jsc-80">Вперед</span>
                        </button>
                        <button id="refresh-btn-jsc-80" onClick={() => {
                            this.onRefreshButtonClicked();
                            onObtainFrameToggleSwitched();
                        }}>
                            <svg className="icon-jsc-80 icon-refresh-jsc-80" width="24" height="24" viewBox="0 0 24 24"
                                 style={{transform: 'scaleX(-1) rotate(-130deg)'}}>
                                <path d="M17.5 12A5.5 5.5 0 1112 6.5V5a7 7 0 107 7h-1.5z" fill="currentColor" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M18 7.667L14 13h8l-4-5.333z"
                                      fill="currentColor" />
                            </svg>
                            <span className="tooltiptext-jsc-80">Обновить</span>
                        </button>
                        <div className="emulator-area-url-jsc-80">
                            <input id="emulator-url-jsc-80" type="text" value={emulatorSourceUrl} onChange={this.onEmulatorSourceUrlInputChange}
                                   onKeyUp={(event) => this.onEmulatorFrameUrlUpdated(event, onObtainFrameToggleSwitched)}/>
                        </div>
                        <button id="full-screen-btn-jsc-80" onClick={() => {
                            this.onExpandOrCollapseBrowserButtonClicked();
                            onMaskDisplayedStateChange();
                        }}>
                            {buttonTeBeDisplayed}
                            <span id="full-screen-btn-tooltip-jsc-80" className="tooltiptext-shifted-left-jsc-80">{fullScreenEnabled ? "Свернуть" : "На весь экран"}</span>
                        </button>
                    </div>
                </div>
                <div className="emulator-area-frame-jsc-80">
                    <Frame emulatorFrameUrl={emulatorFrameUrl} toggle={obtainFrameToggle} />
                </div>
            </div>
        );
    }
};
