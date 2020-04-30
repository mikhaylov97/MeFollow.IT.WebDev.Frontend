import React, { Component } from "react";
import "./lesson-page.css";
import EmulatorLeftMenu from "../../emulator-left-menu";
import EmulatorWorkArea from "../../emulator-work-area";
import EmulatorBrowser from "../../emulator-browser";
import RestApiService from "../../../services/rest-api-service";

const Emulator = (props) => {
    const { data: {enabledHtml, enabledCss, enabledJs,
        htmlContent, cssContent, jsContent,
        lessonOrderIndex, lessonTitle, chapterOrderIndex, numberOfChapters, chapterDescription,
        isMaskDisplayed, isFullScreenEnabled, bundleId, emulatorSourceUrl, emulatorFrameUrl, obtainFrameToggle}, onMaskDisplayedStateChange, onObtainFrameToggleSwitched, onResetChapterProgressButtonClicked } = props;
    return (
        <div id="main-wrapper-grid-jsc-90">
            <EmulatorWorkArea enabledHtml={enabledHtml}
                              enabledCss={enabledCss}
                              enabledJs={enabledJs}
                              htmlContent={htmlContent}
                              cssContent={cssContent}
                              jsContent={jsContent}
                              lessonOrderIndex={lessonOrderIndex}
                              lessonTitle={lessonTitle}
                              chapterOrderIndex={chapterOrderIndex}
                              numberOfChapters={numberOfChapters}
                              chapterDescription={chapterDescription}
                              bundleId={bundleId}
                              displayMask={isMaskDisplayed}
                              onMaskDisplayedStateChange={onMaskDisplayedStateChange}
                              onResetChapterProgressButtonClicked={onResetChapterProgressButtonClicked}/>
            <EmulatorBrowser emulatorSourceUrl={emulatorSourceUrl}
                             emulatorFrameUrl={emulatorFrameUrl}
                             fullScreenEnabled={isFullScreenEnabled}
                             obtainFrameToggle={obtainFrameToggle}
                             onMaskDisplayedStateChange={onMaskDisplayedStateChange}
                             onObtainFrameToggleSwitched={onObtainFrameToggleSwitched} />
        </div>
    );
};

export default class LessonPage extends Component {

    restApiService = new RestApiService();

    state = {
        enableHtml: null,
        enableCss: null,
        enableJs: null,
        htmlContent: null,
        cssContent: null,
        jsContent: null,
        lessonOrderIndex: null,
        lessonTitle: null,
        chapterOrderIndex: null,
        numberOfChapters: null,
        chapterDescription: null,
        bundleId: null,
        emulatorSourceUrl: null,
        emulatorFrameUrl: null,
        obtainFrameToggle: false,
        isMaskDisplayed: false,
        isFullScreenEnabled: false,
        isLoading: true
    };

    componentDidMount() {
        const courseId = this.props.match.params.courseId;
        const lessonId = this.props.match.params.lessonId;
        this.restApiService.getLesson(courseId, lessonId)
            .then(({ enabledHtml, enabledCss, enabledJs,
                       htmlContent, cssContent, jsContent,
                       lessonOrderIndex, lessonTitle, chapterOrderIndex, numberOfChapters, chapterDescription, bundleId, bundleUrl }) => {
                this.setState({
                    enabledHtml: enabledHtml,
                    enabledCss: enabledCss,
                    enabledJs: enabledJs,
                    htmlContent: htmlContent,
                    cssContent: cssContent,
                    jsContent: jsContent,
                    lessonOrderIndex: lessonOrderIndex,
                    lessonTitle: lessonTitle,
                    chapterOrderIndex: chapterOrderIndex,
                    numberOfChapters: numberOfChapters,
                    chapterDescription: chapterDescription,
                    bundleId: bundleId,
                    emulatorSourceUrl: bundleUrl,
                    emulatorFrameUrl: bundleUrl,
                    isLoading: false
                });
            });
    }

    onMaskDisplayedStateChange = () => {
        const { isMaskDisplayed, isFullScreenEnabled } = this.state;
        this.setState({
            isMaskDisplayed: !isMaskDisplayed,
            isFullScreenEnabled: !isFullScreenEnabled
        });
    };

    onResetChapterProgressButtonClicked = () => {
        const { bundleId } = this.state;
        this.setState({
            isLoading: true
        });
        this.restApiService.resetChapterProgress(bundleId)
            .then(({ htmlContent, cssContent, jsContent }) => {
                this.setState({
                    htmlContent: htmlContent,
                    cssContent: cssContent,
                    jsContent: jsContent,
                    isLoading: false
                })
            })
    };

    onObtainFrameToggleSwitched = () => {
        const { obtainFrameToggle } = this.state;
        this.setState({
            obtainFrameToggle: !obtainFrameToggle
        });
    };

    render() {
        const { isLoading } = this.state;

        const content = isLoading
            ? <div>Spinner</div>
            : <Emulator data={this.state}
                        onMaskDisplayedStateChange={this.onMaskDisplayedStateChange}
                        onObtainFrameToggleSwitched={this.onObtainFrameToggleSwitched}
                        onResetChapterProgressButtonClicked={this.onResetChapterProgressButtonClicked}/>;

        return (
            <React.Fragment>
                <EmulatorLeftMenu />
                {content}
            </React.Fragment>
        );
    }
};
