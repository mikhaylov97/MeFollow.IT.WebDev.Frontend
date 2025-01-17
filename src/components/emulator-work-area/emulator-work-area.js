import React, { Component } from "react";
import "./emulator-work-area.css";
import HtmlEditor from "../ace-editor/html-editor";
import CssEditor from "../ace-editor/css-editor";
import JsEditor from "../ace-editor/js-editor";
import ace from "ace-build/ace";
import RestApiService from "../../services/rest-api-service";

const HtmlEditorToggleBlock = ({ activeEditor, onActiveEditorChanged }) => {
    return (
        <div className={`work-area-controls-item-jsc-70 html-editor-jsc-70 ${activeEditor === "HTML" ? "active-jsc-70" : ""}`} onClick={() => onActiveEditorChanged("HTML")}>
            <div className="extension-jsc-70 extension-html-jsc-70">
                <svg role="img" viewBox="0 0 24 24">
                    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
                </svg>
            </div>
            <div className="filename-jsc-70">
                index.html
            </div>
        </div>
    );
};

const CssEditorToggleBlock = ({ activeEditor, onActiveEditorChanged }) => {
    return (
        <div className={`work-area-controls-item-jsc-70 css-editor-jsc-70 ${activeEditor === "CSS" ? "active-jsc-70" : ""}`} onClick={() => onActiveEditorChanged("CSS")}>
            <div className="extension-jsc-70 extension-css-jsc-70">
                <svg role="img" viewBox="0 0 24 24">
                    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
                </svg>
            </div>
            <div className="filename-jsc-70">
                style.css
            </div>
        </div>
    );
};

const JsEditorToggleBlock = ({ activeEditor, onActiveEditorChanged }) => {
    return (
        <div className={`work-area-controls-item-jsc-70 js-editor-jsc-70 ${activeEditor === "JS" ? "active-jsc-70" : ""}`} onClick={() => onActiveEditorChanged("JS")}>
            <div className="extension-jsc-70 extension-js-jsc-70">
                <svg role="img" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
                </svg>
            </div>
            <div className="filename-jsc-70">
                script.js
            </div>
        </div>
    );
};

const CheckNotification = ({ successful, notificationMessage, onCloseCheckNotificationBtnClicked }) => {
    return (
        <div className={`check-result-jsc-70 check-result-${successful ? "right" : "wrong"}-jsc-70`}>
            <div>
                <div className="mr-3">
                    {successful
                        ?
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#02b241"
                                      d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"/>
                                <path fill="#fff"
                                      d="M11.1956 14.6414L10.5259 15.3841L11.2272 16.0164L11.8987 15.3525L11.1956 14.6414ZM7.88453 13.0024L10.5259 15.3841L11.8652 13.8987L9.22384 11.517L7.88453 13.0024ZM11.8987 15.3525L16.7162 10.5891L15.31 9.1669L10.4925 13.9303L11.8987 15.3525Z"/>
                            </svg>
                        :
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#ff3b30"
                                      d="M12 24c6.6274 0 12-5.3726 12-12 0-6.62742-5.3726-12-12-12C5.37258 0 0 5.37258 0 12c0 6.6274 5.37258 12 12 12z"/>
                                <path fill="#fff"
                                      d="M12.5527 6.91156l1.93185165.51763809-2.58819045 9.65925826-1.93185165-.51763809z"/>
                                <path fill="#fff"
                                      d="M7.5 8.91156L5.37868 11.0329l-1.41421 1.4142 1.41421 1.4142L7.5 15.9826l1.41421-1.4142-2.12132-2.1213 2.12132-2.1213L7.5 8.91156zM16.5 8.91156l2.1213 2.12134 1.4142 1.4142-1.4142 1.4142L16.5 15.9826l-1.4142-1.4142 2.1213-2.1213-2.1213-2.1213L16.5 8.91156z"/>
                            </svg>
                    }
                </div>
                <div>
                    {notificationMessage}
                </div>
                <button className="check-result-close-btn-jsc-70" onClick={(event) => onCloseCheckNotificationBtnClicked(event)}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path
                            d="M12.071 13.485l-2.828 2.829-1.415-1.415 2.829-2.828-2.829-2.828 1.415-1.415 2.828 2.829L14.9 7.828l.707.708.707.707-2.829 2.828 2.829 2.829-1.415 1.414-2.828-2.829z"
                            fill="currentColor"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

const TaskDescriptionBlock = ({ lessonOrderIndex, lessonTitle, chapterOrderIndex, numberOfChapters, chapterDescription, isTaskDescriptionHidden, onTaskDescriptionClicked }) => {
     return (
        <React.Fragment>
            <div id="task-description-accordion-jsc-70" className={ !isTaskDescriptionHidden ? "active-jsc-70" : "" } onClick={() => onTaskDescriptionClicked()}>
                <div><span className="header-jsc-70">Урок {lessonOrderIndex}: {lessonTitle}</span></div>
                <div>
                    <span className="lessons-counter-jsc-70">{chapterOrderIndex}<span className="divider-jsc-70">/</span>{numberOfChapters}</span>
                    <button className="toggle-btn-jsc-70">
                        <svg className="icon-jsc-70 icon-prev-jsc-70 icon-next-jsc-70 collapse-control__icon-jsc-70" width="24" height="24"
                             viewBox="0 0 24 24"
                             style={{transition: 'transform .35s', transform: 'rotate(90deg)'}}>
                            <path d="M10.414 12l5.293 5.293-1.414 1.414L7.586 12l6.707-6.707 1.414 1.414L10.414 12z"
                                  fill="currentColor" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="panel-jsc-70" style={{height: isTaskDescriptionHidden ? 0 : ''}} dangerouslySetInnerHTML={{__html: chapterDescription}}>
                {/*{chapterDescription}*/}
            </div>
        </React.Fragment>
    );
};

export default class EmulatorWorkArea extends Component {

    restApiService = new RestApiService();

    state = {
        courseId: null,
        chapterId: null,
        bundleId: null,
        activeEditor: null,
        enabledHtml: null,
        enabledCss: null,
        enabledJs: null,
        htmlContent: null,
        cssContent: null,
        jsContent: null,
        lessonOrderIndex: null,
        lessonTitle: null,
        chapterOrderIndex: null,
        solved: null,
        numberOfChapters: null,
        chapterDescription: null,
        isTaskDescriptionHidden: false,
        displayNotification: false,
        notificationMessage: "",
        notificationSuccessful: null,
        isLoading: true
    };

    constructor(props) {
        super(props);
        const { courseId, chapterId, enabledHtml, enabledCss, enabledJs,
            htmlContent, cssContent, jsContent,
            lessonOrderIndex, lessonTitle, chapterOrderIndex, solved, resultMessage, numberOfChapters, chapterDescription, bundleId } = props;
        const activeEditor = enabledHtml ? "HTML" : (enabledCss ? "CSS" : (enabledJs ? "JS" : "HTML"));
        this.state = {
            courseId: courseId,
            chapterId: chapterId,
            bundleId: bundleId,
            activeEditor: activeEditor,
            enabledHtml: enabledHtml,
            enabledCss: enabledCss,
            enabledJs: enabledJs,
            htmlContent: htmlContent,
            cssContent: cssContent,
            jsContent: jsContent,
            lessonOrderIndex: lessonOrderIndex,
            lessonTitle: lessonTitle,
            chapterOrderIndex: chapterOrderIndex,
            solved: solved,
            displayNotification: !!resultMessage,
            notificationMessage: resultMessage ? resultMessage : null,
            notificationSuccessful: !!resultMessage,
            numberOfChapters: numberOfChapters,
            chapterDescription: chapterDescription,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isTaskDescriptionHidden !== this.state.isTaskDescriptionHidden) {
            const { enabledHtml, enabledCss, enabledJs } = this.state;
            setTimeout(function() {
                if (enabledHtml) ace.edit("html-editor-jsc-70").resize();
                if (enabledCss) ace.edit("css-editor-jsc-70").resize();
                if (enabledJs) ace.edit("js-editor-jsc-70").resize();
            }, 400);
        }

        if (prevProps !== this.props) {
            const { courseId, chapterId, enabledHtml, enabledCss, enabledJs,
                htmlContent, cssContent, jsContent,
                lessonOrderIndex, lessonTitle, chapterOrderIndex, solved, resultMessage, numberOfChapters, chapterDescription, bundleId } = this.props;
            const activeEditor = enabledHtml ? "HTML" : (enabledCss ? "CSS" : (enabledJs ? "JS" : "HTML"));

            this.setState({
                courseId: courseId,
                chapterId: chapterId,
                bundleId: bundleId,
                activeEditor: activeEditor,
                enabledHtml: enabledHtml,
                enabledCss: enabledCss,
                enabledJs: enabledJs,
                htmlContent: htmlContent,
                cssContent: cssContent,
                jsContent: jsContent,
                lessonOrderIndex: lessonOrderIndex,
                lessonTitle: lessonTitle,
                chapterOrderIndex: chapterOrderIndex,
                solved: solved,
                displayNotification: !!resultMessage,
                notificationMessage: resultMessage ? resultMessage : null,
                notificationSuccessful: !!resultMessage,
                numberOfChapters: numberOfChapters,
                chapterDescription: chapterDescription,
            });
        }
    }

    onActiveEditorChanged = (editor) => {
        this.setState({
            activeEditor: editor
        });
    };

    onTaskDescriptionClicked = () => {
        const { isTaskDescriptionHidden } = this.state;
        this.setState({
            isTaskDescriptionHidden: !isTaskDescriptionHidden
        });
    };

    onCheckTaskClicked = (chapterId, onSolvedStateUpdated) => {
        this.restApiService.checkChapterAnswer(chapterId)
            .then(({ successful, resultMessage }) => {
                onSolvedStateUpdated(successful);
                this.setState({
                    displayNotification: true,
                    notificationSuccessful: successful,
                    notificationMessage: resultMessage
                });
            });
    };

    onCloseCheckNotificationBtnClicked = (event) => {
        event.preventDefault();

        this.setState({
            displayNotification: false,
            notificationMessage: ""
        });
    };

    render() {

        console.log("render work area");
        const { courseId, chapterId, bundleId, activeEditor, enabledHtml, enabledCss, enabledJs, htmlContent, cssContent, jsContent,
            lessonOrderIndex, lessonTitle, chapterOrderIndex, numberOfChapters, solved, resultMessage, chapterDescription, isTaskDescriptionHidden, displayNotification, notificationSuccessful, notificationMessage } = this.state;

        const { displayMask, moveToNextChapter, onMaskDisplayedStateChange, onSolvedStateUpdated, onResetChapterProgressButtonClicked } = this.props;
        const maskBlock = displayMask
            ? <div id="full-screen-mask-jsc-70" style={{visibility: "visible", opacity: 1}} onClick={() => onMaskDisplayedStateChange()} />
            : <div id="full-screen-mask-jsc-70" style={{visibility: "hidden"}} />;

        const htmlEditorToggleBlock = enabledHtml ? <HtmlEditorToggleBlock activeEditor={activeEditor} onActiveEditorChanged={this.onActiveEditorChanged} /> : null;
        const cssEditorToggleBlock = enabledCss ? <CssEditorToggleBlock activeEditor={activeEditor} onActiveEditorChanged={this.onActiveEditorChanged} /> : null;
        const jsEditorToggleBlock = enabledJs ? <JsEditorToggleBlock activeEditor={activeEditor} onActiveEditorChanged={this.onActiveEditorChanged} /> : null;

        const htmlEditor = enabledHtml ? <HtmlEditor bundleId={bundleId} content={htmlContent} className={`${activeEditor === "HTML" ? 'active-jsc-70' : ''}`} visible={activeEditor === "HTML"} /> : null;
        const cssEditor = enabledCss ? <CssEditor bundleId={bundleId} content={cssContent} className={`${activeEditor === "CSS" ? 'active-jsc-70' : ''}`} visible={activeEditor === "CSS"} /> : null;
        const jsEditor = enabledJs ? <JsEditor bundleId={bundleId} content={jsContent} className={`${activeEditor === "JS" ? 'active-jsc-70' : ''}`} visible={activeEditor === "JS"} /> : null;

        const button = solved
            ?
                <button className="submit-btn-jsc-70 green-color-jsc-70" onClick={() => moveToNextChapter(courseId, chapterId)}>
                    Далее
                </button>
            :
                <button className="submit-btn-jsc-70" onClick={() => this.onCheckTaskClicked(chapterId, onSolvedStateUpdated)}>
                    Проверить
                </button>;

        return (
            <div id="work-area-jsc-70" className="work-area-jsc-70">
                {maskBlock}
                <div className="work-area-controls-jsc-70">
                    {htmlEditorToggleBlock}
                    {cssEditorToggleBlock}
                    {jsEditorToggleBlock}
                </div>
                <div className="work-area-editor-jsc-70">
                    {htmlEditor}
                    {cssEditor}
                    {jsEditor}
                </div>
                <div className="work-area-task-jsc-70">
                    { displayNotification ? <CheckNotification successful={notificationSuccessful}
                                                               notificationMessage={notificationMessage || resultMessage}
                                                               onCloseCheckNotificationBtnClicked={this.onCloseCheckNotificationBtnClicked} /> : null}
                    <div className="task-description-jsc-70">
                        <TaskDescriptionBlock lessonOrderIndex={lessonOrderIndex}
                                              lessonTitle={lessonTitle}
                                              chapterOrderIndex={chapterOrderIndex}
                                              numberOfChapters={numberOfChapters}
                                              chapterDescription={chapterDescription}
                                              isTaskDescriptionHidden={isTaskDescriptionHidden}
                                              onTaskDescriptionClicked={this.onTaskDescriptionClicked} />
                    </div>
                    <div className="submit-controls-jsc-70">
                        <div>
                            <button className="tip-btn-jsc-70">
                                Подсказка
                            </button>
                        </div>
                        <div>
                            {!solved ?
                                <button className="again-btn-jsc-70" onClick={onResetChapterProgressButtonClicked}>
                                    <svg className="icon-jsc-70 icon-refresh-jsc-70" width="24" height="24"
                                         viewBox="0 0 24 24">
                                        <path d="M17.5 12A5.5 5.5 0 1112 6.5V5a7 7 0 107 7h-1.5z" fill="currentColor"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M18 7.667L14 13h8l-4-5.333z"
                                              fill="currentColor"/>
                                    </svg>
                                    <span className="tooltiptext-jsc-70">Начать заново</span>
                                </button>
                            : null}
                            {button}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
