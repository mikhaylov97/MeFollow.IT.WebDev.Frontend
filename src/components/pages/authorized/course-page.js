import React, { Component } from "react";
import CommonHeader from "../../common-header";
import RestApiService from "../../../services/rest-api-service";
import {Link} from "react-router-dom";

const CourseDescription = ({ title, description, continueUrl, isLearningStarted }) => {
    return (
        <React.Fragment>
            <div>{title}</div>
            <div>{description}</div>
            <Link to={continueUrl}>
                {isLearningStarted ? "Продолжить обучение" : "Начать обучение"}
            </Link>
        </React.Fragment>
    );
};

export default class CoursePage extends Component {

    restApiService = new RestApiService();

    state = {
        id: null,
        title: null,
        description: null,
        continueUrl: null,
        isLearningStarted: false,
        isLoading: true
    };

    componentDidMount() {
        console.log(this.props);
        const courseId = this.props.match.params.courseId;
        this.restApiService.getCourse(courseId)
            .then(({ id, title, description, continueUrl, isLearningStarted }) => {
                this.setState({
                    id: id,
                    title: title,
                    description: description,
                    continueUrl: continueUrl,
                    isLearningStarted: isLearningStarted,
                    isLoading: false
                })
            });
    }

    render() {
        const { title, description, continueUrl, isLearningStarted, isLoading } = this.state;

        const contentToBeDisplayed = isLoading ? <div>Spinner</div> : <CourseDescription title={title}
                                                                                         description={description}
                                                                                         continueUrl={continueUrl}
                                                                                         isLearningStarted={isLearningStarted} />;
        return (
            <React.Fragment>
                {/*<CommonHeader />*/}
                {contentToBeDisplayed}
            </React.Fragment>
        );
    }
};
