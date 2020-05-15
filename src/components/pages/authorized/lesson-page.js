import React, { Component } from "react";
import "./lesson-page.css";
import {withRouter} from 'react-router';
import EmulatorLeftMenu from "../../emulator-left-menu";
import EmulatorWorkArea from "../../emulator-work-area";
import EmulatorBrowser from "../../emulator-browser";
import RestApiService from "../../../services/rest-api-service";

const Emulator = (props) => {
    console.log("render emulator");
    const { data: {courseId, chapterId, enabledHtml, enabledCss, enabledJs,
        htmlContent, cssContent, jsContent,
        lessonOrderIndex, lessonTitle, chapterOrderIndex, solved, resultMessage, numberOfChapters, chapterDescription,
        isMaskDisplayed, isFullScreenEnabled, bundleId, emulatorSourceUrl, emulatorFrameUrl, obtainFrameToggle}, moveToNextChapter, onMaskDisplayedStateChange, onObtainFrameToggleSwitched, onSolvedStateUpdated, onResetChapterProgressButtonClicked } = props;
    return (
        <div id="main-wrapper-grid-jsc-90">
            <EmulatorWorkArea courseId={courseId}
                              chapterId={chapterId}
                              enabledHtml={enabledHtml}
                              enabledCss={enabledCss}
                              enabledJs={enabledJs}
                              htmlContent={htmlContent}
                              cssContent={cssContent}
                              jsContent={jsContent}
                              lessonOrderIndex={lessonOrderIndex}
                              lessonTitle={lessonTitle}
                              chapterOrderIndex={chapterOrderIndex}
                              solved={solved}
                              resultMessage={resultMessage}
                              numberOfChapters={numberOfChapters}
                              chapterDescription={chapterDescription}
                              bundleId={bundleId}
                              displayMask={isMaskDisplayed}
                              moveToNextChapter={moveToNextChapter}
                              onMaskDisplayedStateChange={onMaskDisplayedStateChange}
                              onSolvedStateUpdated={onSolvedStateUpdated}
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
        courseId: null,
        chapterId: null,
        courseTitle: null,
        enableHtml: null,
        enableCss: null,
        enableJs: null,
        htmlContent: null,
        cssContent: null,
        jsContent: null,
        lessonOrderIndex: null,
        lessonTitle: null,
        chapterOrderIndex: null,
        solved: null,
        resultMessage: null,
        topics: [],
        displayTheory: null,
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
            .then(({ chapterId, courseTitle, enabledHtml, enabledCss, enabledJs,
                       htmlContent, cssContent, jsContent,
                       lessonOrderIndex, lessonTitle, chapterOrderIndex, solved, resultMessage, topics, displayTheory, numberOfChapters, chapterDescription, bundleId, bundleUrl }) => {
                this.setState({
                    courseId: courseId,
                    chapterId: chapterId,
                    courseTitle: courseTitle,
                    topics: topics,
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
                    resultMessage: resultMessage,
                    displayTheory: displayTheory,
                    numberOfChapters: numberOfChapters,
                    chapterDescription: chapterDescription,
                    bundleId: bundleId,
                    emulatorSourceUrl: bundleUrl,
                    emulatorFrameUrl: bundleUrl,
                    isLoading: false
                });
            });
    }

    componentDidUpdate(prevProps, prevState) {
        const previousCourseId = prevProps.match.params.courseId;
        const previousLessonId = prevProps.match.params.lessonId;
        const courseId = this.props.match.params.courseId;
        const lessonId = this.props.match.params.lessonId;

        if (previousCourseId !== courseId || previousLessonId !== lessonId) {
            this.setState({
                isLoading: true
            });

            this.restApiService.getLesson(courseId, lessonId, true)
                .then(({
                           chapterId, courseTitle, enabledHtml, enabledCss, enabledJs,
                           htmlContent, cssContent, jsContent,
                           lessonOrderIndex, lessonTitle, chapterOrderIndex, solved, resultMessage, topics, displayTheory, numberOfChapters, chapterDescription, bundleId, bundleUrl
                       }) => {
                    this.setState({
                        courseId: courseId,
                        chapterId: chapterId,
                        courseTitle: courseTitle,
                        topics: topics,
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
                        resultMessage: resultMessage,
                        displayTheory: displayTheory,
                        numberOfChapters: numberOfChapters,
                        chapterDescription: chapterDescription,
                        bundleId: bundleId,
                        emulatorSourceUrl: bundleUrl,
                        emulatorFrameUrl: bundleUrl,
                        isLoading: false
                    });
                });
        }
    }

    moveToNextChapter = (courseId, moveFromChapterId) => {
        this.restApiService.moveToNextChapter(courseId, moveFromChapterId)
            .then(({ courseId, lessonId, chapterId }) => {
                // const courseId = this.props.match.params.courseId;
                // const lessonId = this.props.match.params.lessonId;
                this.setState({
                    isLoading: true
                });

                const oldLessonId = this.props.match.params.lessonId;
                if (oldLessonId === lessonId) {
                    this.restApiService.getLesson(courseId, lessonId, true, chapterId)
                        .then(({
                                   chapterId, enabledHtml, enabledCss, enabledJs,
                                   htmlContent, cssContent, jsContent,
                                   lessonOrderIndex, lessonTitle, chapterOrderIndex, solved, resultMessage, displayTheory, numberOfChapters, chapterDescription, bundleId, bundleUrl
                               }) => {
                            this.setState({
                                courseId: courseId,
                                chapterId: chapterId,
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
                                resultMessage: resultMessage,
                                displayTheory: displayTheory,
                                numberOfChapters: numberOfChapters,
                                chapterDescription: chapterDescription,
                                bundleId: bundleId,
                                emulatorSourceUrl: bundleUrl,
                                emulatorFrameUrl: bundleUrl,
                                isLoading: false
                            });
                        });
                } else {
                    // console.log(JSON.stringify(this.props.history));
                    // const { data, title } = this.props.history[this.props.history.length - 1];
                    this.props.history.replace(`/course/${courseId}/lesson/${lessonId}`);
                    // console.log(JSON.stringify(this.props.history));
                }
            });
    };

    onSolvedStateUpdated = (solved) => {
        this.setState({
            solved: solved
        });
    };

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
        console.log("render");
        const { isLoading } = this.state;

        const content = isLoading
            ? <div>Spinner</div>
            : <React.Fragment>
                <EmulatorLeftMenu courseTitle={this.state.courseTitle} topics={this.state.topics}/>
                <Emulator data={this.state}
                          moveToNextChapter={this.moveToNextChapter}
                          onMaskDisplayedStateChange={this.onMaskDisplayedStateChange}
                          onObtainFrameToggleSwitched={this.onObtainFrameToggleSwitched}
                          onSolvedStateUpdated={this.onSolvedStateUpdated}
                          onResetChapterProgressButtonClicked={this.onResetChapterProgressButtonClicked}/>
            </React.Fragment>;

        return (
            <React.Fragment>
                {content}
            </React.Fragment>
        );
    }
};
