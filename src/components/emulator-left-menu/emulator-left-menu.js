import React, { Component } from "react";
import {Link} from "react-router-dom";
import "./emulator-left-menu.css";
import ace from "ace-build/ace";
import RestApiService from "../../services/rest-api-service";

const LeftMenuListBlock = ({ course, topics, lessons, openedTopic, lessonsIsLoading, onOpenedTopicChanged }) => {

    const lessonsStructure = lessons === null || lessonsIsLoading ? null :
        <div className="menu-item-lessons-jsc-60"><h3>Уроки</h3>{lessons.map((lesson, index) => {
            if (lesson.active) {
                return (
                    <Link className="menu-item-lessons-link-jsc-60" to={`/course/${lesson.courseId}/lesson/${lesson.id}`}>
                        <div className="d-flex justify-content-between align-items-center hoverable-jsc-60" key={`${index}${index}`}>
                            <div>
                                <span className="mr-3">{index + 1}.</span>
                                <span>{lesson.title}</span>
                            </div>
                            <div style={{marginRight: "39px"}}>
                                <span className="comment-jsc-60">Текущий урок</span>
                            </div>
                        </div>
                    </Link>
                );
            } else {
                if (lesson.locked) {
                    return (
                        <div className="d-flex justify-content-between align-items-center hoverable-jsc-60 locked-jsc-60" key={`${index}${index}`}>
                            <div>
                                <span className="mr-3">{index + 1}.</span>
                                <span>{lesson.title}</span>
                            </div>
                            <div style={{marginRight: "39px"}}>
									<span>
										<svg width="24" height="24" viewBox="0 0 25 25">
											<g strokeLinecap="square" strokeWidth="2">
												<path
                                                    d="M10 12.75v-2.707C10 8.915 11.12 8 12.5 8s2.5.915 2.5 2.043v2.247"
                                                    stroke="currentColor" fill="none" />
												<path d="M9 13h7v3H9z" stroke="currentColor" fill="currentColor" />
											</g>
										</svg>
									</span>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <Link className="menu-item-lessons-link-jsc-60" to={`/course/${lesson.courseId}/lesson/${lesson.id}`}>
                            <div className="d-flex justify-content-between align-items-center hoverable-jsc-60" key={`${index}${index}`}>
                                <div>
                                    <span className="mr-3">{index + 1}.</span>
                                    <span>{lesson.title}</span>
                                </div>
                                <div style={{marginRight: "39px"}}>
									<span>
										<svg width="24" height="24" viewBox="0 0 24 24">
											<path
                                                d="M11.196 14.641l-.67.743.701.632.672-.663-.703-.712zm-3.311-1.639l2.64 2.382 1.34-1.485-2.641-2.382-1.34 1.485zm4.014 2.35l4.817-4.763-1.406-1.422-4.818 4.763 1.407 1.422z"
                                                fill="#007aff" />
										</svg>
									</span>
                                </div>
                            </div>
                        </Link>
                    );
                }
            }
        })}</div>;


    return (
        <div>
            <h1 className="left-menu-title-jsc-60">
                {course}
            </h1>
            <h2 className="left-menu-subtitle-jsc-60">
                Темы курса
            </h2>
            <div>
                {topics.map((topic, index) => {
                    let lessonsList = null;
                    let activeClass = null;
                    if (openedTopic === index + 1) {
                        console.log(openedTopic);
                        console.log("opened equals" + (index + 1));
                        lessonsList = lessonsStructure;
                        activeClass = "active-jsc-60";
                    }
                    if (topic.active) {
                        return (
                            <div className="menu-item-jsc-60" key={index}>
                                <div className={`d-flex justify-content-between ${activeClass} hoverable-jsc-60`} onClick={() => onOpenedTopicChanged(index + 1, topic.id)}>
                                    <div>
                                        <span className="mr-3">{index + 1}.</span>
                                        <span>{topic.title}</span>
                                    </div>
                                    <div>
                                        <span className="comment-jsc-60">Пройдено {topic.numberOfPassedLessons} из {topic.numberOfLessons} уроков</span>
                                        <span className="ml-3">
									<svg className="arrow-jsc-60" width="24" height="24" viewBox="0 0 24 24">
										<path fill="currentColor"
                                              d="M10.0711 13.4853l-1.41425-1.4142 1.41425-1.4142 2.8284-2.82847 1.4142 1.41421-2.8284 2.82846 2.8284 2.8284-1.4142 1.4142-2.8284-2.8284z" />
									</svg>
								</span>
                                    </div>
                                </div>
                                {lessonsList}
                            </div>
                        );
                    } else {
                        if (topic.locked) {
                            return (
                                <div className="menu-item-jsc-60" key={index}>
                                    <div className={`d-flex justify-content-between ${activeClass} hoverable-jsc-60 locked-jsc-60`} onClick={() => onOpenedTopicChanged(index + 1, topic.id)}>
                                        <div>
                                            <span className="mr-3">{index + 1}.</span>
                                            <span>{topic.title}</span>
                                        </div>
                                        <div>
                                            <span>
                                                <svg width="24" height="24" viewBox="0 0 25 25">
                                                    <g strokeLinecap="square" strokeWidth="2">
                                                        <path d="M10 12.75v-2.707C10 8.915 11.12 8 12.5 8s2.5.915 2.5 2.043v2.247"
                                                              stroke="currentColor" fill="none" />
                                                        <path d="M9 13h7v3H9z" stroke="currentColor" fill="currentColor" />
                                                    </g>
                                                </svg>
                                            </span>
                                            <span className="ml-3">
                                                <svg className="arrow-jsc-60" width="24" height="24" viewBox="0 0 24 24">
                                                    <path fill="currentColor"
                                                          d="M10.0711 13.4853l-1.41425-1.4142 1.41425-1.4142 2.8284-2.82847 1.4142 1.41421-2.8284 2.82846 2.8284 2.8284-1.4142 1.4142-2.8284-2.8284z" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    {lessonsList}
                                </div>
                            );
                        } else {
                            return (
                                <div className="menu-item-jsc-60" key={index}>
                                    <div className={`d-flex justify-content-between ${activeClass} hoverable-jsc-60`} onClick={() => onOpenedTopicChanged(index + 1, topic.id)}>
                                        <div>
                                            <span className="mr-3">{index + 1}.</span>
                                            <span>{topic.title}</span>
                                        </div>
                                        <div>
                                            <span>
                                                <svg width="24" height="24" viewBox="0 0 24 24">
                                                    <path
                                                        d="M11.196 14.641l-.67.743.701.632.672-.663-.703-.712zm-3.311-1.639l2.64 2.382 1.34-1.485-2.641-2.382-1.34 1.485zm4.014 2.35l4.817-4.763-1.406-1.422-4.818 4.763 1.407 1.422z"
                                                        fill="#007aff"/>
                                                </svg>
                                            </span>
                                            <span className="ml-3">
                                                <svg className="arrow-jsc-60" width="24" height="24" viewBox="0 0 24 24">
                                                    <path fill="currentColor"
                                                          d="M10.0711 13.4853l-1.41425-1.4142 1.41425-1.4142 2.8284-2.82847 1.4142 1.41421-2.8284 2.82846 2.8284 2.8284-1.4142 1.4142-2.8284-2.8284z"/>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    {lessonsList}
                                </div>
                            );
                        }
                    }
                })}
            </div>
        </div>
    );
};

const ButtonOpenIcon = () => {
    return (
        <div className="expand-btn-jsc-60">
            <span/>
            <span/>
            <span/>
        </div>
    );
};

const ButtonCloseIcon = () => {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24"
             style={{color: '#fff', margin: '0 8px 0 0'}}>
            <path d="M13.414 12l5.293 5.293-1.414 1.414-6-6a1 1 0 010-1.414l6-6 1.414 1.414L13.414 12z"
                  fill="currentColor" />
            <path d="M10.879 12l-5.293 5.293L7 18.707l6-6a1 1 0 000-1.414l-6-6-1.414 1.414L10.879 12z"
                  fill="currentColor" />
        </svg>
    );
};

export default class EmulatorLeftMenu extends Component {
    restApiService = new RestApiService();

    // state = {
    //     isLeftMenuOpened: false,
    //     // lessons: null,
    //     lessons: [
    //         {
    //             title: "First lesson"
    //         },
    //         {
    //             title: "Second lesson"
    //         },
    //         {
    //             title: "Third lesson",
    //             active: true
    //         },
    //         {
    //             title: "Fourth lesson",
    //             locked: true
    //         },
    //         {
    //             title: "Fifth lesson",
    //             locked: true
    //         },
    //         {
    //             title: "Sixth lesson",
    //             locked: true
    //         }
    //     ],
    //     course: null,
    //     topics: null,
    //     openedTopic: 2
    // };

    constructor(props) {
        super(props);
        const { courseTitle, topics } = props;
        this.state = {
            course: courseTitle,
            topics: topics,
            lessons: [
                {
                    title: "First lesson"
                },
                {
                    title: "Second lesson"
                },
                {
                    title: "Third lesson",
                    active: true
                },
                {
                    title: "Fourth lesson",
                    locked: true
                },
                {
                    title: "Fifth lesson",
                    locked: true
                },
                {
                    title: "Sixth lesson",
                    locked: true
                }
            ],
            openedTopic: null,
            lessonsIsLoading: true
        };
    }

    onOpenedTopicChanged = (index, topicId) => {
        const { openedTopic } = this.state;
        if (index !== openedTopic) {
            this.setState({
                openedTopic: index,
                lessonsIsLoading: true
            });

            this.restApiService.getAllLessonsByTopicId(topicId).then(({ lessons }) => {
                this.setState({
                    lessons: lessons,
                    lessonsIsLoading: false
                });
            });
        } else {
            this.setState({
                openedTopic: null,
                lessons: null,
                lessonsIsLoading: false
            });
        }
    };

    onMenuButtonClicked = () => {
        const { isLeftMenuOpened } = this.state;
        this.setState({
            isLeftMenuOpened: !isLeftMenuOpened
        });
    };

    render() {
        const { isLeftMenuOpened, course, lessons, topics, openedTopic, lessonsIsLoading } = this.state;

        const buttonToBeDisplayed = isLeftMenuOpened ? <ButtonCloseIcon /> : <ButtonOpenIcon />;
        const menuList = isLeftMenuOpened ? <LeftMenuListBlock course={course} lessons={lessons} topics={topics} openedTopic={openedTopic} lessonsIsLoading={lessonsIsLoading} onOpenedTopicChanged={this.onOpenedTopicChanged}/> : null;
        const leftMenuWidth = isLeftMenuOpened ? "0" : "calc(-650px + 44px)";

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
