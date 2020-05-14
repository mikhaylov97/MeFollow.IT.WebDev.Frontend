import {Link} from "react-router-dom";
import React, {Component} from "react";
import "./management-page.css";
import CommonLeftMenu from "../../common-left-menu";
import CommonHeader from "../../common-header";
import RestApiService from "../../../services/rest-api-service";

const ManagementPage = () => {
    return (
        <React.Fragment>
            <CommonLeftMenu mode="ADMIN" />
            <CommonHeader title="Администрирование" displayLinks={false}/>
            <ManagementPageBody />
        </React.Fragment>
    );
};

export default ManagementPage;

class ManagementTopicsBlockContent extends Component {

    state = {
        title: "",
        orderIndex: ""
    };

    render() {
        const { title, orderIndex } = this.state;
        const { coursesDropdown, course, additionalFields, topics, onCreateTopicClicked, onDeleteTopicClicked } = this.props;

        const topicsToBeDisplayed = topics !== null ? topics.map(({ id, title, orderIndex }) =>
            <div className="topics-item-jsc-100" key={id}>
                <div className="topics-item-title-jsc-100">
                    <span className="order-index-jsc-100">{orderIndex}.</span>
                    <span>{title}</span>
                </div>
                <div className="topics-item-btn-jsc-100" onClick={() => onDeleteTopicClicked(course, id)}>
                    <button>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path
                                d="M13.414 12l5.293 5.293-1.414 1.414-6-6a1 1 0 010-1.414l6-6 1.414 1.414L13.414 12z"
                                fill="currentColor"/>
                            <path
                                d="M10.879 12l-5.293 5.293L7 18.707l6-6a1 1 0 000-1.414l-6-6-1.414 1.414L10.879 12z"
                                fill="currentColor"/>
                        </svg>
                    </button>
                </div>
            </div>
        ) : null;

        return (
            <div className="main-wrapper-content-jsc-100">
                <div className="form-wrapper-jsc-100">
                    <div className="mb-4"><p className="title-jsc-100">Добавление новой темы в курс</p></div>
                    <form className="mb-4" onSubmit={(event) => onCreateTopicClicked(event)}>
                        <div className="d-flex mb-3">
                            {coursesDropdown}
                        </div>
                        {course !== null ? additionalFields : null}
                    </form>
                </div>
                <div className="topics-list-wrapper-jsc-100">
                    <div className="mb-4"><p className="title-jsc-100">Список тем</p></div>
                    <div className="topics-list-jsc-100">
                        {topicsToBeDisplayed}
                    </div>
                </div>
            </div>
        );
    }
}

class ManagementTopicsBlock extends Component {

    restApiService = new RestApiService();

    state = {
        courses: [],
        course: null,
        topics: null,
        topicTitle: "",
        topicOrderIndex: "",
        minOrderIndex: null,
        isLoading: true
    };

    componentDidMount() {
        this.restApiService.getAllCoursesForManagement().then(({ courses }) => {
            this.setState({
                courses: courses,
                isLoading: false
            });
        });
    }

    onCourseChanged = (event) => {
        this.setState({
            course: event.target.value,
            isLoading: true
        });

        this.restApiService.getAllTopicsByCourseIdForManagement(event.target.value).then(({ minAvailableOrderIndex, topics }) => {
            this.setState({
                topics: topics,
                topicOrderIndex: minAvailableOrderIndex,
                minOrderIndex: minAvailableOrderIndex,
                isLoading: false
            });
        });
    };

    onTopicTitleChanged = (event) => {
        this.setState({
            topicTitle: event.target.value
        });
    };

    onTopicOrderIndexChanged = (event) => {
        const re = /^[1-9][0-9]*$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            this.setState({
                topicOrderIndex: event.target.value
            });
        }
    };

    onCreateTopicClicked = (event) => {
        event.preventDefault();

        const { course, topicTitle, topicOrderIndex } = this.state;
        this.restApiService.createTopicByCourseIdForManagement(course, topicTitle, topicOrderIndex).then(({ id, title, orderIndex }) => {
            const { topics } = this.state;
            this.setState({
                topics: [...topics, { id: id, title: title, orderIndex: orderIndex }],
                topicTitle: "",
                topicOrderIndex: orderIndex + 1,
                minOrderIndex: orderIndex + 1
            })
        });

    };

    onDeleteTopicClicked = (courseId, topicId) => {
        this.restApiService.deleteTopicByIdForManagement(courseId, topicId).then(({ minAvailableOrderIndex, topics }) => {
            this.setState({
                topics: topics,
                topicOrderIndex: minAvailableOrderIndex,
                minOrderIndex: minAvailableOrderIndex,
            });
        });
    };

    render() {

        const { courses, course, topics, topicTitle, topicOrderIndex, isLoading } = this.state;

        const additionalFields = <React.Fragment>
            <div className="d-flex mb-3">
                <input className="simple-input-jsc-100" type="text" name="title" placeholder="Название темы" value={topicTitle} onChange={this.onTopicTitleChanged}/>
            </div>
            <div className="d-flex mb-3 relative-jsc-100">
                <input className="simple-input-jsc-100" type="number" min="1" name="orderIndex" value={topicOrderIndex}
                       placeholder="Порядковый номер" onChange={this.onTopicOrderIndexChanged}/>
            </div>
            <div className="d-flex justify-content-end mb-2">
                <button className="submit-btn-jsc-100" type="submit">
                    <span>Создать тему</span>
                </button>
            </div>
        </React.Fragment>;

        const coursesDropdown =
            <select name="course" className="simple-input-jsc-100" value={course !== null ? course : "placeholder"} onChange={this.onCourseChanged}>
                <option hidden disabled value="placeholder">Выберите курс</option>
                {courses.map(({ id, title }) => <option key={id} value={id}>{title}</option>)}
            </select>;

        return (
            <React.Fragment>
                {isLoading ? <div>Spinner</div> : null}
                <ManagementTopicsBlockContent coursesDropdown={coursesDropdown} course={course} additionalFields={additionalFields} topics={topics} onCreateTopicClicked={this.onCreateTopicClicked} onDeleteTopicClicked={this.onDeleteTopicClicked}/>
            </React.Fragment>
        );
    }
}

class ManagementLessonsBlock extends Component {
    restApiService = new RestApiService();

    state = {
        courses: [],
        topics: [],
        course: null,
        topic: null,
        lessons: null,
        lessonTitle: "",
        lessonDescription: "",
        lessonOrderIndex: 1,
        minOrderIndex: null,
        isLoading: false
    };

    componentDidMount() {
        this.restApiService.getAllCoursesForManagement().then(({ courses }) => {
            this.setState({
                courses: courses,
                isLoading: false
            });
        });
    }

    onCourseChanged = (event) => {
        this.setState({
            course: event.target.value,
            topic: null,
            lessons: null,
            isLoading: true
        });

        this.restApiService.getAllTopicsByCourseIdForManagement(event.target.value).then(({ topics }) => {
            this.setState({
                topics: topics,
                isLoading: false
            });
        });
    };

    onTopicChanged = (event) => {
        this.setState({
            topic: event.target.value,
            lesson: null,
            lessons: null,
            isLoading: true
        });

        this.restApiService.getAllLessonByTopicIdForManagement(event.target.value).then(({ minAvailableOrderIndex, lessons }) => {
            this.setState({
                lessons: lessons,
                lessonOrderIndex: minAvailableOrderIndex,
                minOrderIndex: minAvailableOrderIndex
            });
        });
    };

    onLessonTitleChanged = (event) => {
        this.setState({
            lessonTitle: event.target.value
        });
    };

    onLessonDescriptionChanged = (event) => {
        this.setState({
            lessonDescription: event.target.value
        });
    };

    onLessonOrderIndexChanged = (event) => {
        const re = /^[1-9][0-9]*$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            this.setState({
                lessonOrderIndex: event.target.value
            });
        }
    };

    onCreateLessonClicked = (event) => {
        event.preventDefault();

        const { topic, lessonTitle, lessonDescription, lessonOrderIndex } = this.state;
        this.restApiService.createLessonByTopicIdForManagement(topic, lessonTitle, lessonDescription, lessonOrderIndex).then(({ id, title, orderIndex }) => {
            const { lessons } = this.state;
            this.setState({
                lessons: [...lessons, { id: id, title: title, orderIndex: orderIndex }],
                lessonTitle: "",
                lessonDescription: "",
                lessonOrderIndex: orderIndex + 1,
                minOrderIndex: orderIndex + 1
            })
        });
    };

    onDeleteLessonClicked = (topicId, lessonId) => {
        this.restApiService.deleteLessonByIdForManagement(topicId, lessonId).then(({ minAvailableOrderIndex, lessons }) => {
            this.setState({
                lessons: lessons,
                lessonOrderIndex: minAvailableOrderIndex,
                minOrderIndex: minAvailableOrderIndex,
            });
        });
    };

    render() {
        const { courses, course, topics, topic, lessons, lessonTitle, lessonDescription, lessonOrderIndex } = this.state;
        const topicSelector =
            <div className="d-flex mb-3">
                <select name="topic" className="simple-input-jsc-100" value={topic !== null ? topic : "placeholder"} onChange={this.onTopicChanged}>
                    <option hidden disabled value="placeholder">Выберите тему</option>
                    {topics.map(({ id, title }) => <option key={id} value={id}>{title}</option>)}
                </select>
            </div>;

        const additionalFields = <React.Fragment>
            <div className="d-flex mb-3">
                <input className="simple-input-jsc-100" type="text" name="title"
                       placeholder="Название урока" value={lessonTitle} onChange={this.onLessonTitleChanged}/>
            </div>
            <div className="d-flex mb-3">
                        <textarea className="simple-textarea-jsc-100" name="description" rows="10"
                                  placeholder="Описание урока" value={lessonDescription} onChange={this.onLessonDescriptionChanged}/>
            </div>
            <div className="d-flex mb-3 relative-jsc-100">
                <input className="simple-input-jsc-100" type="number" min="1" name="orderIndex"
                       placeholder="Порядковый номер" value={lessonOrderIndex} onChange={this.onLessonOrderIndexChanged}/>
            </div>
            <div className="d-flex justify-content-end mb-2">
                <button className="submit-btn-jsc-100" type="submit">
                    <span>Создать урок</span>
                </button>
            </div>
        </React.Fragment>;


        return (
            <div className="main-wrapper-content-jsc-100">
                <div className="form-wrapper-jsc-100">
                    <div className="mb-4"><p className="title-jsc-100">Добавление нового урока в тему</p></div>
                    <form className="mb-4" onSubmit={this.onCreateLessonClicked}>
                        <div className="d-flex mb-3">
                            <select name="course" className="simple-input-jsc-100" value={course !== null ? course : "placeholder"} onChange={this.onCourseChanged}>
                                <option hidden disabled value="placeholder">Выберите курс</option>
                                {courses.map(({ id, title }) => <option key={id} value={id}>{title}</option>)}
                            </select>
                        </div>
                        {course !== null ? topicSelector : null}
                        {course !== null && topic !== null ? additionalFields : null}
                    </form>
                </div>
                <div className="topics-list-wrapper-jsc-100">
                    <div className="mb-4"><p className="title-jsc-100">Список уроков</p></div>
                    <div className="topics-list-jsc-100">
                        {lessons !== null ? lessons.map(({ id, orderIndex, title }) =>
                            <div className="topics-item-jsc-100" key={id}>
                                <div className="topics-item-title-jsc-100">
                                    <span className="order-index-jsc-100">{orderIndex}.</span>
                                    <span>{title}</span>
                                </div>
                                <div className="topics-item-btn-jsc-100" onClick={() => this.onDeleteLessonClicked(topic, id)}>
                                    <button>
                                        <svg width="24" height="24" viewBox="0 0 24 24">
                                            <path
                                                d="M13.414 12l5.293 5.293-1.414 1.414-6-6a1 1 0 010-1.414l6-6 1.414 1.414L13.414 12z"
                                                fill="currentColor"/>
                                            <path
                                                d="M10.879 12l-5.293 5.293L7 18.707l6-6a1 1 0 000-1.414l-6-6-1.414 1.414L10.879 12z"
                                                fill="currentColor"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

class ManagementChaptersBlock extends Component {
    restApiService = new RestApiService();

    state = {
        course: null,
        courses: [],
        topic: null,
        topics: [],
        lesson: null,
        lessons: [],
        chapter: null,
        chapters: null,
        chapterDescription: "",
        chapterOrderIndex: "",
        minOrderIndex: null,
        chapterHtmlContent: "",
        withCss: null,
        chapterCssContent: "",
        withJs: null,
        chapterJsContent: ""
    };

    componentDidMount() {
        this.restApiService.getAllCoursesForManagement().then(({ courses }) => {
            this.setState({
                courses: courses,
                isLoading: false
            });
        });
    }

    onCourseChanged = (event) => {
        this.setState({
            course: event.target.value,
            topic: null,
            lesson: null,
            chapter: null,
            chapters: null,
            isLoading: true
        });

        this.restApiService.getAllTopicsByCourseIdForManagement(event.target.value).then(({ topics }) => {
            this.setState({
                topics: topics,
                isLoading: false
            });
        });
    };

    onTopicChanged = (event) => {
        this.setState({
            topic: event.target.value,
            lesson: null,
            chapter: null,
            chapters: null,
            isLoading: true
        });

        this.restApiService.getAllLessonByTopicIdForManagement(event.target.value).then(({ lessons }) => {
            this.setState({
                lessons: lessons
            });
        });
    };

    onLessonChanged = (event) => {
        this.setState({
            lesson: event.target.value,
            chapter: null,
            chapters: null,
            isLoading: true
        });

        this.restApiService.getAllChaptersByLessonIdForManagement(event.target.value).then(({ minAvailableOrderIndex, chapters }) => {
            this.setState({
                chapters: chapters,
                chapterOrderIndex: minAvailableOrderIndex,
                minOrderIndex: minAvailableOrderIndex
            });
        });
    };

    onChapterWithCssSelectorChanged = (event) => {
        this.setState({
            withCss: event.target.value === "true"
        });
    };

    onChapterWithJsSelectorChanged = (event) => {
        this.setState({
            withJs: event.target.value === "true"
        });
    };

    onChapterDescriptionChanged = (event) => {
        this.setState({
            chapterDescription: event.target.value
        });
    };

    onChapterHtmlContentChanged = (event) => {
        this.setState({
            chapterHtmlContent: event.target.value
        });
    };

    onChapterOrderIndexChanged = (event) => {
        const re = /^[1-9][0-9]*$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            this.setState({
                chapterOrderIndex: event.target.value
            });
        }
    };

    onChapterCssContentChanged = (event) => {
        this.setState({
            chapterCssContent: event.target.value
        });
    };

    onChapterJsContentChanged = (event) => {
        this.setState({
            chapterJsContent: event.target.value
        });
    };

    onCreateChapterClicked = (event) => {
        event.preventDefault();

        const { lesson, chapterDescription, chapterOrderIndex, chapterHtmlContent, chapterCssContent, chapterJsContent } = this.state;
        this.restApiService.createChapterByLessonIdForManagement(lesson, chapterDescription, chapterOrderIndex, chapterHtmlContent, chapterCssContent, chapterJsContent).then(({ id, title, orderIndex }) => {
            const { chapters } = this.state;
            this.setState({
                chapters: [...chapters, { id: id, title: title, orderIndex: orderIndex }],
                chapterDescription: "",
                chapterOrderIndex: orderIndex + 1,
                minOrderIndex: orderIndex + 1
            })
        });
    };

    onDeleteChapterClicked = (lessonId, chapterId) => {
        this.restApiService.deleteChapterByIdForManagement(lessonId, chapterId).then(({ minAvailableOrderIndex, chapters }) => {
            this.setState({
                chapters: chapters,
                chapterOrderIndex: minAvailableOrderIndex,
                minOrderIndex: minAvailableOrderIndex,
            });
        });
    };

    render() {
        const { course, courses, topic, topics, lesson, lessons, chapters, chapterDescription, chapterOrderIndex, chapterHtmlContent, withCss, chapterCssContent, withJs, chapterJsContent } = this.state;
        const topicSelector =
            <div className="d-flex mb-3">
                <select name="topic" className="simple-input-jsc-100" value={topic !== null ? topic : "placeholder"} onChange={this.onTopicChanged}>
                    <option hidden disabled value="placeholder">Выберите тему</option>
                    {topics.map(({id, title}) => <option key={id} value={id}>{title}</option>)}
                </select>
            </div>;
        const lessonSelector =
            <div className="d-flex mb-3">
                <select name="lesson" className="simple-input-jsc-100" value={lesson !== null ? lesson : "placeholder"} onChange={this.onLessonChanged}>
                    <option hidden disabled value="placeholder">Выберите урок</option>
                    {lessons.map(({id, title}) => <option key={id} value={id}>{title}</option>)}
                </select>
            </div>;

        const chapterCssAdditionalField =
            <div className="d-flex mb-3 relative-jsc-100">
                        <textarea className="simple-textarea-jsc-100" name="initialStateContent" rows="10"
                                  placeholder="CSS контент (по умолчанию)" value={chapterCssContent} onChange={this.onChapterCssContentChanged}/>
            </div>;

        const chapterJsAdditionalField =
            <div className="d-flex mb-3 relative-jsc-100">
                        <textarea className="simple-textarea-jsc-100" name="initialStateContent" rows="10"
                                  placeholder="JavaScript контент (по умолчанию)" value={chapterJsContent} onChange={this.onChapterJsContentChanged}/>
            </div>;

        const additionalFields = <React.Fragment>
            <div className="d-flex mb-3">
                        <textarea className="simple-textarea-jsc-100" name="description" rows="10"
                                  placeholder="Описание главы" value={chapterDescription} onChange={this.onChapterDescriptionChanged}/>
            </div>
            <div className="d-flex mb-3 relative-jsc-100">
                <input className="simple-input-jsc-100" type="number" min="1" name="orderIndex"
                       placeholder="Порядковый номер" value={chapterOrderIndex} onChange={this.onChapterOrderIndexChanged}/>
            </div>
            <div className="d-flex mb-3 relative-jsc-100">
                        <textarea className="simple-textarea-jsc-100" name="initialStateContent" rows="10"
                                  placeholder="HTML контент (по умолчанию)" value={chapterHtmlContent} onChange={this.onChapterHtmlContentChanged}/>
            </div>
            <div className="d-flex mb-3">
                <select name="type" className="simple-input-jsc-100" value={withCss !== null ? withCss : "placeholder"} onChange={this.onChapterWithCssSelectorChanged}>
                    <option hidden disabled value="placeholder">Тип доп. ресурса</option>
                    <option value="false">Нет</option>
                    <option value="true">CSS</option>
                </select>
            </div>
            {withCss ? chapterCssAdditionalField : null}
            <div className="d-flex mb-3">
                <select name="type" className="simple-input-jsc-100" value={withJs !== null ? withJs : "placeholder"} onChange={this.onChapterWithJsSelectorChanged}>
                    <option hidden disabled value="placeholder">Тип доп. ресурса</option>
                    <option value="false">Нет</option>
                    <option value="true">JS</option>
                </select>
            </div>
            {withJs ? chapterJsAdditionalField : null}
            <div className="d-flex justify-content-end mb-2">
                <button className="submit-btn-jsc-100" type="submit">
                    <span>Создать главу</span>
                </button>
            </div>
        </React.Fragment>;
        return (
            <div className="main-wrapper-content-jsc-100">
                <div className="form-wrapper-jsc-100">
                    <div className="mb-4"><p className="title-jsc-100">Добавление новой главы в урок</p></div>
                    <form className="mb-4" onSubmit={this.onCreateChapterClicked}>
                        <div className="d-flex mb-3">
                            <select name="course" className="simple-input-jsc-100" value={course !== null ? course : "placeholder"} onChange={this.onCourseChanged}>
                                <option hidden disabled value="placeholder">Выберите курс</option>
                                {courses.map(({id, title}) => <option key={id} value={id}>{title}</option>)}
                            </select>
                        </div>
                        {course !== null ? topicSelector : null}
                        {course !== null && topic !== null ? lessonSelector : null}
                        {course !== null && topic !== null && lesson !== null ? additionalFields : null}
                    </form>
                </div>
                <div className="topics-list-wrapper-jsc-100">
                    <div className="mb-4"><p className="title-jsc-100">Список глав</p></div>
                    <div className="topics-list-jsc-100">
                        {chapters !== null ? chapters.map(({ id, title, orderIndex }) =>
                            <div className="topics-item-jsc-100" key={id}>
                                <div className="topics-item-title-jsc-100">
                                    <span className="order-index-jsc-100">{orderIndex}.</span>
                                    <span>{title}</span>
                                </div>
                                <div className="topics-item-btn-jsc-100" onClick={() => this.onDeleteChapterClicked(lesson, id)}>
                                    <button>
                                        <svg width="24" height="24" viewBox="0 0 24 24">
                                            <path
                                                d="M13.414 12l5.293 5.293-1.414 1.414-6-6a1 1 0 010-1.414l6-6 1.414 1.414L13.414 12z"
                                                fill="currentColor"/>
                                            <path
                                                d="M10.879 12l-5.293 5.293L7 18.707l6-6a1 1 0 000-1.414l-6-6-1.414 1.414L10.879 12z"
                                                fill="currentColor"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

const ManagementHtmlRuleClassesFields = ({ htmlRuleTagClassesCounter, onHtmlRuleTagClassesDeleteBtnClicked, onHtmlRuleTagClassesNameChanged, onHtmlRuleTagClassesErrorChanged }) => {
        return (
            <div className="d-flex">
                <div className="full-width-jsc-100">
                    <div className="d-flex mb-3 relative-jsc-100">
                        <input className="simple-input-jsc-100" type="text" name="tagIdErrorMessage"
                               placeholder="Название класса" onChange={(event) => onHtmlRuleTagClassesNameChanged(event, htmlRuleTagClassesCounter)}/>
                    </div>
                    <div className="d-flex mb-3 relative-jsc-100">
                        <textarea className="simple-textarea-jsc-100" name="common-error" rows="4"
                                  placeholder="Текст ошибки" onChange={(event) => onHtmlRuleTagClassesErrorChanged(event, htmlRuleTagClassesCounter)}/>
                    </div>
                </div>
                <div>
                    <button className="submit-btn-jsc-100"
                            onClick={(event) => onHtmlRuleTagClassesDeleteBtnClicked(event, htmlRuleTagClassesCounter)}>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path
                                d="M13.414 12l5.293 5.293-1.414 1.414-6-6a1 1 0 010-1.414l6-6 1.414 1.414L13.414 12z"
                                fill="currentColor"/>
                            <path
                                d="M10.879 12l-5.293 5.293L7 18.707l6-6a1 1 0 000-1.414l-6-6-1.414 1.414L10.879 12z"
                                fill="currentColor"/>
                        </svg>
                    </button>
                </div>
            </div>
        );
};

const ManagementHtmlRuleAttributesFields = ({ htmlRuleTagAttributesCounter, onHtmlRuleTagAttributesDeleteBtnClicked,
                                                onHtmlRuleTagAttributesAttributeChanged, onHtmlRuleTagAttributesAttributeValueChanged, onHtmlRuleTagAttributesErrorChanged }) => {
    return (
        <div className="d-flex">
            <div className="full-width-jsc-100">
                <div className="d-flex mb-3 relative-jsc-100">
                    <input className="simple-input-jsc-100" type="text" name="tagIdErrorMessage" placeholder="Название атрибута" onChange={(event) => onHtmlRuleTagAttributesAttributeChanged(event, htmlRuleTagAttributesCounter)}/>
                </div>
                <div className="d-flex mb-3 relative-jsc-100">
                    <input className="simple-input-jsc-100" type="text" name="tagIdErrorMessage" placeholder="Значение атрибута" onChange={(event) => onHtmlRuleTagAttributesAttributeValueChanged(event, htmlRuleTagAttributesCounter)}/>
                </div>
                <div className="d-flex mb-3 relative-jsc-100">
                    <textarea className="simple-textarea-jsc-100" name="common-error" rows="4" placeholder="Текст ошибки" onChange={(event) => onHtmlRuleTagAttributesErrorChanged(event, htmlRuleTagAttributesCounter)}/>
                </div>
            </div>
            <div>
                <button className="submit-btn-jsc-100" onClick={(event) => onHtmlRuleTagAttributesDeleteBtnClicked(event, htmlRuleTagAttributesCounter)}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path
                            d="M13.414 12l5.293 5.293-1.414 1.414-6-6a1 1 0 010-1.414l6-6 1.414 1.414L13.414 12z"
                            fill="currentColor"/>
                        <path
                            d="M10.879 12l-5.293 5.293L7 18.707l6-6a1 1 0 000-1.414l-6-6-1.414 1.414L10.879 12z"
                            fill="currentColor"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

const ManagementCssRulePropertiesFields = ({ cssRulePropertiesCounter, onCssRulePropertiesDeleteBtnClicked,
                                                onCssRulePropertiesPropertyChanged, onCssRulePropertiesPropertyValueChanged, onCssRulePropertiesErrorChanged }) => {
    return (
        <div className="d-flex">
            <div className="full-width-jsc-100">
                <div className="d-flex mb-3 relative-jsc-100">
                    <input className="simple-input-jsc-100" type="text" name="tagIdErrorMessage" placeholder="Название свойства" onChange={(event) => onCssRulePropertiesPropertyChanged(event, cssRulePropertiesCounter)}/>
                </div>
                <div className="d-flex mb-3 relative-jsc-100">
                    <input className="simple-input-jsc-100" type="text" name="tagIdErrorMessage" placeholder="Значение свойства" onChange={(event) => onCssRulePropertiesPropertyValueChanged(event, cssRulePropertiesCounter)}/>
                </div>
                <div className="d-flex mb-3 relative-jsc-100">
                    <textarea className="simple-textarea-jsc-100" name="common-error" rows="4" placeholder="Текст ошибки" onChange={(event) => onCssRulePropertiesErrorChanged(event, cssRulePropertiesCounter)}/>
                </div>
            </div>
            <div>
                <button className="submit-btn-jsc-100" onClick={(event) => onCssRulePropertiesDeleteBtnClicked(event, cssRulePropertiesCounter)}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path
                            d="M13.414 12l5.293 5.293-1.414 1.414-6-6a1 1 0 010-1.414l6-6 1.414 1.414L13.414 12z"
                            fill="currentColor"/>
                        <path
                            d="M10.879 12l-5.293 5.293L7 18.707l6-6a1 1 0 000-1.414l-6-6-1.414 1.414L10.879 12z"
                            fill="currentColor"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

class ManagementRulesBlock extends Component {
    restApiService = new RestApiService();

    state = {
        course: null,
        courses: [],
        topic: null,
        topics: [],
        lesson: null,
        lessons: [],
        chapter: null,
        chapters: [],
        htmlRules: null,
        cssRules: null,
        jsRules: null,
        ruleType: null,
        ruleCommonError: "",

        htmlRuleSelector: "",
        htmlRuleTag: "",
        htmlRuleTagId: "",
        htmlRuleTagIdErrorMessage: "",
        htmlRuleTagClassesMarkup: null,
        htmlRuleTagClassesCounter: 0,
        htmlRuleTagClasses: [],
        htmlRuleTagAttributes: [],
        htmlRuleTagAttributesMarkup: null,
        htmlRuleTagAttributesCounter: 0,
        htmlRuleInnerContent: "",
        htmlRuleInnerContentErrorMessage: "",

        cssRuleHtmlRuleId: null,
        cssRuleProperties: [],
        cssRulePropertiesMarkup: null,
        cssRulePropertiesCounter: 0,

        jsRuleContent: "",
        jsRuleExecutable: null
    };

    componentDidMount() {
        this.restApiService.getAllCoursesForManagement().then(({ courses }) => {
            this.setState({
                courses: courses,
            });
        });
    }

    onCourseChanged = (event) => {
        this.setState({
            course: event.target.value,
            topic: null,
            lesson: null,
            chapter: null,
            htmlRules: null,
            cssRules: null,
            jsRules: null
        });

        this.restApiService.getAllTopicsByCourseIdForManagement(event.target.value).then(({ topics }) => {
            this.setState({
                topics: topics,
            });
        });
    };

    onTopicChanged = (event) => {
        this.setState({
            topic: event.target.value,
            lesson: null,
            chapter: null,
            htmlRules: null,
            cssRules: null,
            jsRules: null
        });

        this.restApiService.getAllLessonByTopicIdForManagement(event.target.value).then(({ lessons }) => {
            this.setState({
                lessons: lessons
            });
        });
    };

    onLessonChanged = (event) => {
        this.setState({
            lesson: event.target.value,
            chapter: null,
            htmlRules: null,
            cssRules: null,
            jsRules: null
        });

        this.restApiService.getAllChaptersByLessonIdForManagement(event.target.value).then(({ chapters }) => {
            this.setState({
                chapters: chapters
            });
        });
    };

    onChapterChanged = (event) => {
        this.setState({
            chapter: event.target.value,
            htmlRules: null,
            cssRules: null,
            jsRules: null
        });

        this.restApiService.getAllRulesByChapterIdForManagement(event.target.value).then(({ htmlRules, cssRules, jsRules }) => {
            this.setState({
                htmlRules: htmlRules,
                cssRules: cssRules,
                jsRules: jsRules
            });
        });
    };

    onRuleTypeChanged = (event) => {
        this.setState({
            ruleType: event.target.value
        });
    };

    onRuleCommonErrorChanged = (event) => {
        this.setState({
            ruleCommonError: event.target.value
        });
    };

    onHtmlRuleSelectorChanged = (event) => {
        this.setState({
            htmlRuleSelector: event.target.value
        });
    };

    onHtmlRuleTagChanged = (event) => {
        this.setState({
            htmlRuleTag: event.target.value
        });
    };

    onHtmlRuleTagIdChanged = (event) => {
        this.setState({
            htmlRuleTagId: event.target.value
        });
    };

    onHtmlRuleTagIdErrorMessageChanged = (event) => {
        this.setState({
            htmlRuleTagIdErrorMessage: event.target.value
        });
    };

    onHtmlRuleTagClassesDeleteBtnClicked = (event, count) => {
        event.preventDefault();

        const { htmlRuleTagClasses, htmlRuleTagClassesMarkup } = this.state;
        const result = htmlRuleTagClassesMarkup !== null
            ? htmlRuleTagClassesMarkup.filter((item) => item.props.htmlRuleTagClassesCounter !== count)
            : [];

        const updatedHtmlRuleTagClasses = htmlRuleTagClasses.filter((item) => item.index !== count);

        this.setState({
            htmlRuleTagClasses: updatedHtmlRuleTagClasses,
            htmlRuleTagClassesMarkup: result
        });
    };

    onHtmlRuleTagClassesNameChanged = (event, count) => {
        const { htmlRuleTagClasses } = this.state;
        const updatedClasses = htmlRuleTagClasses.map((item) => {
            if (item.index !== count) return item;
            return {
                index: item.index,
                content: {
                    className: event.target.value,
                    errorMessage: item.content.errorMessage
                }
            };
        });

        this.setState({
            htmlRuleTagClasses: updatedClasses
        });
    };

    onHtmlRuleTagClassesErrorChanged = (event, count) => {
        const { htmlRuleTagClasses } = this.state;
        const updatedClasses = htmlRuleTagClasses.map((item) => {
            if (item.index !== count) return item;
            return {
                index: item.index,
                content: {
                    className: item.content.className,
                    errorMessage: event.target.value
                }
            };
        });

        this.setState({
            htmlRuleTagClasses: updatedClasses
        });
    };

    onHtmlRuleTagClassesAddBtnClicked = (event) => {
        event.preventDefault();

        const { htmlRuleTagClassesMarkup, htmlRuleTagClassesCounter, htmlRuleTagClasses } = this.state;
        const result = htmlRuleTagClassesMarkup !== null
            ? htmlRuleTagClassesMarkup.concat([<ManagementHtmlRuleClassesFields key={htmlRuleTagClassesCounter} htmlRuleTagClassesCounter={htmlRuleTagClassesCounter}
                                                                                onHtmlRuleTagClassesDeleteBtnClicked={this.onHtmlRuleTagClassesDeleteBtnClicked}
                                                                                onHtmlRuleTagClassesNameChanged={this.onHtmlRuleTagClassesNameChanged}
                                                                                onHtmlRuleTagClassesErrorChanged={this.onHtmlRuleTagClassesErrorChanged} />])
            : [<ManagementHtmlRuleClassesFields key={htmlRuleTagClassesCounter} htmlRuleTagClassesCounter={htmlRuleTagClassesCounter}
                                                onHtmlRuleTagClassesDeleteBtnClicked={this.onHtmlRuleTagClassesDeleteBtnClicked}
                                                onHtmlRuleTagClassesNameChanged={this.onHtmlRuleTagClassesNameChanged}
                                                onHtmlRuleTagClassesErrorChanged={this.onHtmlRuleTagClassesErrorChanged} />];

        const emptyItem = {
            index: htmlRuleTagClassesCounter,
            content: {
                className: "",
                errorMessage: ""
            }
        };
        const updatedHtmlRuleTagClasses = [...htmlRuleTagClasses, emptyItem];
        this.setState({
            htmlRuleTagClasses: updatedHtmlRuleTagClasses,
            htmlRuleTagClassesMarkup: result,
            htmlRuleTagClassesCounter: htmlRuleTagClassesCounter + 1
        });
    };

    onHtmlRuleTagAttributesDeleteBtnClicked = (event, count) => {
        event.preventDefault();

        const { htmlRuleTagAttributes, htmlRuleTagAttributesMarkup } = this.state;
        const result = htmlRuleTagAttributesMarkup !== null
            ? htmlRuleTagAttributesMarkup.filter((item) => item.props.htmlRuleTagAttributesCounter !== count)
            : [];

        const updatedHtmlRuleTagAttributes = htmlRuleTagAttributes.filter((item) => item.index !== count);

        this.setState({
            htmlRuleTagAttributes: updatedHtmlRuleTagAttributes,
            htmlRuleTagAttributesMarkup: result
        });
    };

    onHtmlRuleTagAttributesAttributeChanged = (event, count) => {
        const { htmlRuleTagAttributes } = this.state;
        const updatedAttributes = htmlRuleTagAttributes.map((item) => {
            if (item.index !== count) return item;
            return {
                index: item.index,
                content: {
                    attributeName: event.target.value,
                    attributeValue: item.content.attributeValue,
                    errorMessage: item.content.errorMessage
                }
            };
        });

        this.setState({
            htmlRuleTagAttributes: updatedAttributes
        });
    };

    onHtmlRuleTagAttributesAttributeValueChanged = (event, count) => {
        const { htmlRuleTagAttributes } = this.state;
        const updatedAttributes = htmlRuleTagAttributes.map((item) => {
            if (item.index !== count) return item;
            return {
                index: item.index,
                content: {
                    attributeName: item.content.attributeName,
                    attributeValue: event.target.value,
                    errorMessage: item.content.errorMessage
                }
            };
        });

        this.setState({
            htmlRuleTagAttributes: updatedAttributes
        });
    };

    onHtmlRuleTagAttributesErrorChanged = (event, count) => {
        const { htmlRuleTagAttributes } = this.state;
        const updatedAttributes = htmlRuleTagAttributes.map((item) => {
            if (item.index !== count) return item;
            return {
                index: item.index,
                content: {
                    attributeName: item.content.attributeName,
                    attributeValue: item.content.attributeValue,
                    errorMessage: event.target.value
                }
            };
        });

        this.setState({
            htmlRuleTagAttributes: updatedAttributes
        });
    };

    onHtmlRuleTagAttributesAddBtnClicked = (event) => {
        event.preventDefault();

        const { htmlRuleTagAttributes, htmlRuleTagAttributesMarkup, htmlRuleTagAttributesCounter } = this.state;
        const result = htmlRuleTagAttributesMarkup !== null
            ? htmlRuleTagAttributesMarkup.concat([<ManagementHtmlRuleAttributesFields key={htmlRuleTagAttributesCounter} htmlRuleTagAttributesCounter={htmlRuleTagAttributesCounter}
                                                                                      onHtmlRuleTagAttributesDeleteBtnClicked={this.onHtmlRuleTagAttributesDeleteBtnClicked}
                                                                                      onHtmlRuleTagAttributesAttributeChanged={this.onHtmlRuleTagAttributesAttributeChanged}
                                                                                      onHtmlRuleTagAttributesAttributeValueChanged={this.onHtmlRuleTagAttributesAttributeValueChanged}
                                                                                      onHtmlRuleTagAttributesErrorChanged={this.onHtmlRuleTagAttributesErrorChanged} />])
            : [<ManagementHtmlRuleAttributesFields key={htmlRuleTagAttributesCounter} htmlRuleTagAttributesCounter={htmlRuleTagAttributesCounter}
                                                   onHtmlRuleTagAttributesDeleteBtnClicked={this.onHtmlRuleTagAttributesDeleteBtnClicked}
                                                   onHtmlRuleTagAttributesAttributeChanged={this.onHtmlRuleTagAttributesAttributeChanged}
                                                   onHtmlRuleTagAttributesAttributeValueChanged={this.onHtmlRuleTagAttributesAttributeValueChanged}
                                                   onHtmlRuleTagAttributesErrorChanged={this.onHtmlRuleTagAttributesErrorChanged} />];

        const emptyItem = {
            index: htmlRuleTagAttributesCounter,
            content: {
                attributeName: "",
                attributeValue: "",
                errorMessage: ""
            }
        };
        const updatedHtmlRuleTagAttributes = [...htmlRuleTagAttributes, emptyItem];
        this.setState({
            htmlRuleTagAttributes: updatedHtmlRuleTagAttributes,
            htmlRuleTagAttributesMarkup: result,
            htmlRuleTagAttributesCounter: htmlRuleTagAttributesCounter + 1
        });
    };

    onHtmlRuleTagInnerContentChanged = (event) => {
        this.setState({
            htmlRuleInnerContent: event.target.value
        });
    };

    onHtmlRuleTagInnerContentErrorMessageChanged = (event) => {
        this.setState({
            htmlRuleInnerContentErrorMessage: event.target.value
        });
    };

    onCssRuleHtmlRuleIdChanged = (event) => {
        this.setState({
            cssRuleHtmlRuleId: event.target.value
        });
    };

    onCssRulePropertiesDeleteBtnClicked = (event, count) => {
        event.preventDefault();

        const { cssRuleProperties, cssRulePropertiesMarkup } = this.state;
        const result = cssRulePropertiesMarkup !== null
            ? cssRulePropertiesMarkup.filter((item) => item.props.cssRulePropertiesCounter !== count)
            : [];

        const updatedCssRuleProperties = cssRuleProperties.filter((item) => item.index !== count);

        this.setState({
            cssRuleProperties: updatedCssRuleProperties,
            cssRulePropertiesMarkup: result
        });
    };

    onCssRulePropertiesPropertyChanged = (event, count) => {
        const { cssRuleProperties } = this.state;
        const updatedProperties = cssRuleProperties.map((item) => {
            if (item.index !== count) return item;
            return {
                index: item.index,
                content: {
                    propertyName: event.target.value,
                    propertyValue: item.content.propertyValue,
                    errorMessage: item.content.errorMessage
                }
            };
        });

        this.setState({
            cssRuleProperties: updatedProperties
        });
    };

    onCssRulePropertiesPropertyValueChanged = (event, count) => {
        const { cssRuleProperties } = this.state;
        const updatedProperties = cssRuleProperties.map((item) => {
            if (item.index !== count) return item;
            return {
                index: item.index,
                content: {
                    propertyName: item.content.propertyName,
                    propertyValue: event.target.value,
                    errorMessage: item.content.errorMessage
                }
            };
        });

        this.setState({
            cssRuleProperties: updatedProperties
        });
    };

    onCssRulePropertiesErrorChanged = (event, count) => {
        const { cssRuleProperties } = this.state;
        const updatedProperties = cssRuleProperties.map((item) => {
            if (item.index !== count) return item;
            return {
                index: item.index,
                content: {
                    propertyName: item.content.propertyName,
                    propertyValue: item.content.propertyValue,
                    errorMessage: event.target.value
                }
            };
        });

        this.setState({
            cssRuleProperties: updatedProperties
        });
    };

    onCssRulePropertiesAddBtnClicked = (event) => {
        event.preventDefault();

        const { cssRuleProperties, cssRulePropertiesMarkup, cssRulePropertiesCounter } = this.state;
        const result = cssRulePropertiesMarkup !== null
            ? cssRulePropertiesMarkup.concat([<ManagementCssRulePropertiesFields key={cssRulePropertiesCounter} cssRulePropertiesCounter={cssRulePropertiesCounter}
                                                                                 onCssRulePropertiesDeleteBtnClicked={this.onCssRulePropertiesDeleteBtnClicked}
                                                                                 onCssRulePropertiesPropertyChanged={this.onCssRulePropertiesPropertyChanged}
                                                                                 onCssRulePropertiesPropertyValueChanged={this.onCssRulePropertiesPropertyValueChanged}
                                                                                 onCssRulePropertiesErrorChanged={this.onCssRulePropertiesErrorChanged} />])
            : [<ManagementCssRulePropertiesFields key={cssRulePropertiesCounter} cssRulePropertiesCounter={cssRulePropertiesCounter}
                                                  onCssRulePropertiesDeleteBtnClicked={this.onCssRulePropertiesDeleteBtnClicked}
                                                  onCssRulePropertiesPropertyChanged={this.onCssRulePropertiesPropertyChanged}
                                                  onCssRulePropertiesPropertyValueChanged={this.onCssRulePropertiesPropertyValueChanged}
                                                  onCssRulePropertiesErrorChanged={this.onCssRulePropertiesErrorChanged} />];

        const emptyItem = {
            index: cssRulePropertiesCounter,
            content: {
                propertyName: "",
                propertyValue: "",
                errorMessage: ""
            }
        };
        const updatedCssRuleProperties = [...cssRuleProperties, emptyItem];
        this.setState({
            cssRuleProperties: updatedCssRuleProperties,
            cssRulePropertiesMarkup: result,
            cssRulePropertiesCounter: cssRulePropertiesCounter + 1
        });
    };

    onJsRuleContentChanged = (event) => {
        this.setState({
            jsRuleContent: event.target.value
        });
    };

    onJsRuleExecutableChanged = (event) => {
        this.setState({
            jsRuleExecutable: event.target.value === "true"
        });
    };

    onDeleteRuleClicked = (chapterId, ruleId) => {
        this.restApiService.deleteRuleByIdForManagement(chapterId, ruleId).then(({ htmlRules, cssRules, jsRules }) => {
            this.setState({
                htmlRules: htmlRules,
                cssRules: cssRules,
                jsRules: jsRules
            });
        });
    };

    onCreateRuleClicked = (event) => {
        event.preventDefault();

        const { chapter, ruleType, ruleCommonError } = this.state;
        let payload;
        switch (ruleType) {
            case "HTML":
                const { htmlRuleSelector, htmlRuleTag, htmlRuleTagId, htmlRuleTagIdErrorMessage, htmlRuleTagClasses,
                    htmlRuleTagAttributes, htmlRuleInnerContent, htmlRuleInnerContentErrorMessage } = this.state;
                payload = {
                    commonErrorMessage: ruleCommonError,
                    type: ruleType,
                    cssSelector: htmlRuleSelector,
                    tagName: htmlRuleTag,
                    tagId: htmlRuleTagId,
                    tagIdErrorMessage: htmlRuleTagIdErrorMessage,
                    tagInnerContent: htmlRuleInnerContent,
                    tagInnerContentErrorMessage: htmlRuleInnerContentErrorMessage,
                    tagClasses: htmlRuleTagClasses.map((obj) => {
                        return {
                            className: obj.content.className,
                            errorMessage: obj.content.errorMessage
                        };
                    }),
                    tagAttributes: htmlRuleTagAttributes.reduce(function(map, obj) {
                        map[obj.content.attributeName] = {
                            attributeValue: obj.content.attributeValue,
                            errorMessage: obj.content.errorMessage
                        };
                        return map;
                    }, {})
                };
                break;
            case "CSS":
                const { cssRuleHtmlRuleId, cssRuleProperties } = this.state;
                payload = {
                    commonErrorMessage: ruleCommonError,
                    type: ruleType,
                    htmlCheckRuleId: cssRuleHtmlRuleId,
                    cssProperties: cssRuleProperties.reduce(function(map, obj) {
                        map[obj.content.propertyName] = {
                            propertyValue: obj.content.propertyValue,
                            errorMessage: obj.content.errorMessage
                        };
                        return map;
                    }, {})
                };
                break;
            case "JS":
                const { jsRuleContent, jsRuleExecutable } = this.state;
                payload = {
                    commonErrorMessage: ruleCommonError,
                    type: ruleType,
                    content: jsRuleContent,
                    executable: jsRuleExecutable
                };
                break;
        }

        this.restApiService.createRuleByChapterIdForManagement(chapter, payload).then(({ id, type, cssSelector, htmlCheckRuleId }) => {
            switch (type) {
                case "HTML":
                    const { htmlRules } = this.state;
                    const htmlRulesSize = htmlRules.length;
                    this.setState({
                        htmlRules: [...htmlRules, { id: id, title: cssSelector, orderIndex: htmlRulesSize + 1 }],
                        ruleType: null,
                        htmlRuleSelector: "",
                        htmlRuleTag: "",
                        htmlRuleTagId: "",
                        htmlRuleTagIdErrorMessage: "",
                        htmlRuleTagClasses: [],
                        htmlRuleTagClassesMarkup: null,
                        htmlRuleTagClassesCounter: 0,
                        htmlRuleTagAttributes: [],
                        htmlRuleTagAttributesMarkup: null,
                        htmlRuleTagAttributesCounter: 0,
                        htmlRuleInnerContent: "",
                        htmlRuleInnerContentErrorMessage: "",
                        ruleCommonError: ""
                    });
                    break;
                case "CSS":
                    const { cssRules } = this.state;
                    const cssRulesSize = cssRules.length;
                    const htmlRuleReference = this.state.htmlRules.filter((rule) => rule.id === htmlCheckRuleId);
                    this.setState({
                        cssRules: [...cssRules, { id: id, title: `CSS-правило для [${htmlRuleReference[0].title}]`, orderIndex: cssRulesSize + 1 }],
                        ruleType: null,
                        cssRuleHtmlRuleId: "",
                        cssRuleProperties: [],
                        cssRulePropertiesMarkup: null,
                        cssRulePropertiesCounter: 0,
                        ruleCommonError: ""
                    });
                    break;
                case "JS":
                    const { jsRules } = this.state;
                    const jsRulesSize = jsRules.length;
                    this.setState({
                        jsRules: [...jsRules, { id: id, title: "JS-правило", orderIndex: jsRulesSize + 1 }],
                        ruleType: null,
                        jsRuleContent: "",
                        jsRuleExecutable: null,
                        ruleCommonError: ""
                    });
                    break;
            }
        });
    };

    render() {
        const {course, courses, topic, topics, lesson, lessons, chapter, chapters, htmlRules, cssRules, jsRules, ruleType, ruleCommonError} = this.state;
        const { htmlRuleSelector, htmlRuleTag, htmlRuleTagId, htmlRuleTagIdErrorMessage, htmlRuleTagClassesMarkup, htmlRuleTagAttributesMarkup, htmlRuleInnerContent, htmlRuleInnerContentErrorMessage } = this.state;
        const { cssRuleHtmlRuleId, cssRulePropertiesMarkup } = this.state;
        const { jsRuleContent, jsRuleExecutable } = this.state;

        const topicSelector =
            <div className="d-flex mb-3">
                <select name="topic" className="simple-input-jsc-100" value={topic !== null ? topic : "placeholder"} onChange={this.onTopicChanged}>
                    <option hidden disabled value="placeholder">Выберите тему</option>
                    {topics.map(({ id, title }) => <option key={id} value={id}>{title}</option>)}
                </select>
            </div>;

        const lessonSelector =
            <div className="d-flex mb-3">
                <select name="lesson" className="simple-input-jsc-100" value={lesson !== null ? lesson : "placeholder"} onChange={this.onLessonChanged}>
                    <option hidden disabled value="placeholder">Выберите урок</option>
                    {lessons.map(({ id, title }) => <option key={id} value={id}>{title}</option>)}
                </select>
            </div>;

        const chapterSelector =
            <div className="d-flex mb-3">
                <select name="chapter" className="simple-input-jsc-100" value={chapter !== null ? chapter : "placeholder"} onChange={this.onChapterChanged}>
                    <option hidden disabled value="placeholder">Выберите главу</option>
                    {chapters.map(({ id, title }) => <option key={id} value={id}>{title}</option>)}
                </select>
            </div>;

        const htmlAdditionalFields = <React.Fragment>
            <div className="d-flex mb-3 relative-jsc-100">
                <input className="simple-input-jsc-100" type="text" name="cssSelector"
                       placeholder="Селектор" value={htmlRuleSelector} onChange={this.onHtmlRuleSelectorChanged}/>
            </div>
            <div className="d-flex mb-3 relative-jsc-100">
                <input className="simple-input-jsc-100" type="text" name="tagName"
                       placeholder="Название тега" value={htmlRuleTag} onChange={this.onHtmlRuleTagChanged}/>
            </div>
            <div className="d-flex mb-3 relative-jsc-100">
                <input className="simple-input-jsc-100" type="text" name="tagId"
                       placeholder="ID тега (необязательно)" value={htmlRuleTagId} onChange={this.onHtmlRuleTagIdChanged}/>
            </div>
            <div className="d-flex mb-3 relative-jsc-100">
                <input className="simple-input-jsc-100" type="text" name="tagIdErrorMessage"
                       placeholder="Ошибка для ID тега (необязательно)" value={htmlRuleTagIdErrorMessage} onChange={this.onHtmlRuleTagIdErrorMessageChanged}/>
            </div>

            {htmlRuleTagClassesMarkup}
            <div className="d-flex mb-3 relative-jsc-100">
                <button className="submit-btn-jsc-100" onClick={this.onHtmlRuleTagClassesAddBtnClicked}>
                    <svg viewBox="0 0 16 16" aria-hidden="true" width="16" height="16" fill="inherit">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M7 14.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5V9h5.5a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5H9V1.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5V7H1.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5H7v5.5z"/>
                    </svg>
                    <span className="ml-2">Добавить класс</span>
                </button>
            </div>

            {htmlRuleTagAttributesMarkup}
            <div className="d-flex mb-3 relative-jsc-100">
                <button className="submit-btn-jsc-100" onClick={this.onHtmlRuleTagAttributesAddBtnClicked}>
                    <svg viewBox="0 0 16 16" aria-hidden="true" width="16" height="16" fill="inherit">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M7 14.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5V9h5.5a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5H9V1.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5V7H1.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5H7v5.5z"/>
                    </svg>
                    <span className="ml-2">Добавить атрибут</span>
                </button>
            </div>

            <div className="d-flex mb-3 relative-jsc-100">
                <input className="simple-input-jsc-100" type="text" name="tagInnerContent"
                       placeholder="Контент внутри тега (необязательно)" value={htmlRuleInnerContent} onChange={this.onHtmlRuleTagInnerContentChanged}/>
            </div>
            <div className="d-flex mb-3 relative-jsc-100">
                <input className="simple-input-jsc-100" type="text" name="tagInnerContentErrorMessage"
                       placeholder="Ошибка для контента внутри тега (необязательно)" value={htmlRuleInnerContentErrorMessage} onChange={this.onHtmlRuleTagInnerContentErrorMessageChanged}/>
            </div>
        </React.Fragment>;

        const cssAdditionalFields =
            <div>
                <div className="d-flex mb-3 relative-jsc-100">
                    <select name="type" className="simple-input-jsc-100" value={cssRuleHtmlRuleId !== null ? cssRuleHtmlRuleId : "placeholder"} onChange={this.onCssRuleHtmlRuleIdChanged}>
                        <option hidden disabled value="placeholder">Выберите HTML-правило</option>
                        {htmlRules !== null
                            ? htmlRules.map(({ id, title }) => <option key={id} value={id}>{title}</option>)
                            : null}
                    </select>
                </div>
                {cssRulePropertiesMarkup}
                <div className="d-flex mb-3 relative-jsc-100">
                    <button className="submit-btn-jsc-100" onClick={this.onCssRulePropertiesAddBtnClicked}>
                        <svg viewBox="0 0 16 16" aria-hidden="true" width="16" height="16" fill="inherit">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M7 14.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5V9h5.5a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5H9V1.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5V7H1.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5H7v5.5z"/>
                        </svg>
                        <span className="ml-2">Добавить свойство</span>
                    </button>
                </div>
            </div>;

        const jsAdditionalFields = <React.Fragment>
            <div className="d-flex mb-3 relative-jsc-100">
                <textarea className="simple-textarea-jsc-100" name="common-error" rows="4"
                          placeholder="Контент для файла script.js" value={jsRuleContent} onChange={this.onJsRuleContentChanged}/>
            </div>
            <div className="d-flex mb-3 relative-jsc-100">
                <select name="executable" className="simple-input-jsc-100" value={jsRuleExecutable !== null ? jsRuleExecutable : "placeholder"} onChange={this.onJsRuleExecutableChanged}>
                    <option hidden disabled value="placeholder">Является ли файл исполняемым?</option>
                    <option value="true">Да</option>
                    <option value="false">Нет</option>
                </select>
            </div>
        </React.Fragment>;

        let ruleTypeDependantFields = null;
        if (ruleType !== null) {
            switch (ruleType) {
                case "CSS":
                    ruleTypeDependantFields = cssAdditionalFields;
                    break;
                case "JS":
                    ruleTypeDependantFields = jsAdditionalFields;
                    break;
                case "HTML":
                default:
                    ruleTypeDependantFields = htmlAdditionalFields;
            }
        }

        const additionalFields = <React.Fragment>
            <div className="d-flex mb-3">
                <textarea className="simple-textarea-jsc-100" name="common-error" rows="10" placeholder="Описание общей ошибки" value={ruleCommonError} onChange={this.onRuleCommonErrorChanged}/>
            </div>
            <div className="d-flex mb-3">
                <select name="type" className="simple-input-jsc-100" value={ruleType !== null ? ruleType : "placeholder"} onChange={this.onRuleTypeChanged}>
                    <option hidden disabled value="placeholder">Выберите тип правила</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="JS">JS</option>
                </select>
            </div>
            {ruleTypeDependantFields}
            <div className="d-flex justify-content-end mb-2">
                <button className="submit-btn-jsc-100" type="submit">
                    <span>Создать главу</span>
                </button>
            </div>
        </React.Fragment>;

        return (
            <div className="main-wrapper-content-jsc-100">
                <div className="form-wrapper-jsc-100">
                    <div className="mb-4"><p className="title-jsc-100">Добавление нового правила проверки</p></div>
                    <form className="mb-4" onSubmit={this.onCreateRuleClicked}>
                        <div className="d-flex mb-3">
                            <select name="course" className="simple-input-jsc-100" value={course !== null ? course : "placeholder"} onChange={this.onCourseChanged}>
                                <option hidden disabled value="placeholder">Выберите курс</option>
                                {courses.map(({ id, title }) => <option key={id} value={id}>{title}</option>)}
                            </select>
                        </div>
                        {course !== null ? topicSelector : null}
                        {course !== null  && topic !== null ? lessonSelector : null}
                        {course !== null  && topic !== null && lesson !== null ? chapterSelector : null}
                        {course !== null  && topic !== null && lesson !== null && chapter !== null ? additionalFields : null}
                    </form>
                </div>
                <div className="topics-list-wrapper-jsc-100">
                    <div className="mb-4"><p className="title-jsc-100">Список правил</p></div>
                    <div className="topics-list-jsc-100">
                        {htmlRules ? <div>HTML-правила:</div> : null}
                        {htmlRules !== null ? htmlRules.map(({ id, title, orderIndex }) =>
                            <div className="topics-item-jsc-100" key={id}>
                                <div className="topics-item-title-jsc-100">
                                    <span className="order-index-jsc-100">{orderIndex}.</span>
                                    <span>{title}</span>
                                </div>
                                <div className="topics-item-btn-jsc-100" onClick={() => this.onDeleteRuleClicked(chapter, id)}>
                                    <button>
                                        <svg width="24" height="24" viewBox="0 0 24 24">
                                            <path
                                                d="M13.414 12l5.293 5.293-1.414 1.414-6-6a1 1 0 010-1.414l6-6 1.414 1.414L13.414 12z"
                                                fill="currentColor"/>
                                            <path
                                                d="M10.879 12l-5.293 5.293L7 18.707l6-6a1 1 0 000-1.414l-6-6-1.414 1.414L10.879 12z"
                                                fill="currentColor"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ) : null}
                        {cssRules ? <div>CSS-правила:</div> : null}
                        {cssRules !== null ? cssRules.map(({ id, title, orderIndex }) =>
                            <div className="topics-item-jsc-100" key={id}>
                                <div className="topics-item-title-jsc-100">
                                    <span className="order-index-jsc-100">{orderIndex}.</span>
                                    <span>{title}</span>
                                </div>
                                <div className="topics-item-btn-jsc-100" onClick={() => this.onDeleteRuleClicked(chapter, id)}>
                                    <button>
                                        <svg width="24" height="24" viewBox="0 0 24 24">
                                            <path
                                                d="M13.414 12l5.293 5.293-1.414 1.414-6-6a1 1 0 010-1.414l6-6 1.414 1.414L13.414 12z"
                                                fill="currentColor"/>
                                            <path
                                                d="M10.879 12l-5.293 5.293L7 18.707l6-6a1 1 0 000-1.414l-6-6-1.414 1.414L10.879 12z"
                                                fill="currentColor"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ) : null}
                        {jsRules ? <div>JS-правила:</div> : null}
                        {jsRules !== null ? jsRules.map(({ id, title, orderIndex }) =>
                            <div className="topics-item-jsc-100" key={id}>
                                <div className="topics-item-title-jsc-100">
                                    <span className="order-index-jsc-100">{orderIndex}.</span>
                                    <span>{title}</span>
                                </div>
                                <div className="topics-item-btn-jsc-100" onClick={() => this.onDeleteRuleClicked(chapter, id)}>
                                    <button>
                                        <svg width="24" height="24" viewBox="0 0 24 24">
                                            <path
                                                d="M13.414 12l5.293 5.293-1.414 1.414-6-6a1 1 0 010-1.414l6-6 1.414 1.414L13.414 12z"
                                                fill="currentColor"/>
                                            <path
                                                d="M10.879 12l-5.293 5.293L7 18.707l6-6a1 1 0 000-1.414l-6-6-1.414 1.414L10.879 12z"
                                                fill="currentColor"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

const ManagementHeaderElements = ({activeElement, onActiveElementChanged}) => {
    return (
        <div className="main-wrapper-nav-jsc-100">
            <ul>
                <li className={activeElement === 0 ? "active-jsc-100" : ""} onClick={() => onActiveElementChanged(0)}>
                    Темы
                </li>
                <li className={activeElement === 1 ? "active-jsc-100" : ""} onClick={() => onActiveElementChanged(1)}>
                    Уроки
                </li>
                <li className={activeElement === 2 ? "active-jsc-100" : ""} onClick={() => onActiveElementChanged(2)}>
                    Главы
                </li>
                <li className={activeElement === 3 ? "active-jsc-100" : ""} onClick={() => onActiveElementChanged(3)}>
                    Правила проверки
                </li>
            </ul>
        </div>
    );
};

class ManagementPageBody extends Component {

    restApiService = new RestApiService();

    state = {
        activeElement: 0,
        topics: null,
        lessons: null,
        chapters: null,
        rules: null,
        isLoading: true
    };

    componentDidMount() {
        // this.restApiService.getAllCourses().then((courses) => {
        //     this.setState({
        //         courses: courses,
        //         isLoading: false
        //     });
        // });
    }

    onActiveElementChanged = (index) => {
        const { activeElement } = this.state;
        if (activeElement !== index) {
            this.setState({
                activeElement: index
            });
        }
    };

    render() {
        const  { activeElement, isLoading } = this.state;
        let managementBlockToBeDisplayed = null;
        switch (activeElement) {
            case 1:
                managementBlockToBeDisplayed = <ManagementLessonsBlock />;
                break;
            case 2:
                managementBlockToBeDisplayed = <ManagementChaptersBlock />;
                break;
            case 3:
                managementBlockToBeDisplayed = <ManagementRulesBlock />;
                break;
            case 0:
            default:
                managementBlockToBeDisplayed = <ManagementTopicsBlock />;
        }

        const contentToBeDisplayed = !isLoading ? <div>Spinner</div> : managementBlockToBeDisplayed;
        return (
            <div className="main-wrapper-jsc-100">
                <ManagementHeaderElements activeElement={activeElement} onActiveElementChanged={this.onActiveElementChanged}/>
                {contentToBeDisplayed}
            </div>
        );
    }

}
