import {Link} from "react-router-dom";
import React, {Component} from "react";
import "./home-page.css";
import CommonLeftMenu from "../../common-left-menu";
import CommonHeader from "../../common-header";
import RestApiService from "../../../services/rest-api-service";

const HomePage = () => {
    return (
        <React.Fragment>
            <CommonLeftMenu mode="ADMIN" />
            <CommonHeader title="Главная" displayLinks={true}/>
            <HomePageBody />
        </React.Fragment>
    );
};

export default HomePage;

const CourseTypeOne = (props) => {
    const { id, title, description } = props;
    return (
        <Link to={`/course/${id}`}>
            <div className="courses-grid-item-jsc-30">
                <div className="type-1-jsc-30" />
                <div className="courses-grid-item-content-jsc-30">
                    <div className="icon-jsc-30">
                        <svg className="icon-border-jsc-30" viewBox="0 0 80 116">
                            <polygon fill="transparent" points="0 0 80 0 80 96 40 116 0 96" />
                            <path d="M2,94.763932 L40,113.763932 L78,94.763932 L78,0 L2,0 L2,94.763932 Z M0,0 L80,0 L80,96 L40,116 L0,96 L0,0 Z"
                                  fill="#FFFFFF" />
                        </svg>
                        <svg className="icon-body-jsc-30" viewBox="0 0 33 32">
                            <path fill="#fff" style={{fill: 'var(--color1, #fff)'}}
                                  d="M7.523 0l-0.846 0.885-5.423 5.423-0.885 0.846 8.846 8.846-6.154 6.154-0.077 0.385-1.346 6.769-0.385 1.808 1.808-0.384 7.154-1.423 6.154-6.154 8.808 8.808 0.846-0.885 5.423-5.423 0.885-0.846-8.808-8.808 6.077-6.077c1.981-1.981 1.981-5.173 0-7.154-0.99-0.99-2.284-1.5-3.577-1.5s-2.587 0.51-3.577 1.5l-6.077 6.077-8.846-8.846zM7.523 3.5l2.385 2.423-1.808 1.808 1.769 1.769 1.808-1.808 2.923 2.923-3.654 3.654-7.115-7.115 3.692-3.654zM26.023 3.654c0.639 0 1.288 0.288 1.846 0.846 1.111 1.111 1.111 2.543 0 3.654l-0.808 0.808-3.654-3.654 0.808-0.808c0.558-0.558 1.168-0.846 1.808-0.846zM21.677 7.038l3.654 3.654-14.885 14.885c-0.813-1.562-2.091-2.841-3.654-3.654l14.885-14.885zM21.792 17.731l2.923 2.923-1.846 1.846 1.769 1.769 1.846-1.846 2.346 2.346-3.692 3.692-7.038-7.039 3.692-3.692zM5.215 23.885c1.476 0.62 2.649 1.793 3.269 3.269l-4.077 0.808 0.808-4.077z" />
                        </svg>
                    </div>
                    <div className="body-jsc-30">
                        <h5>{description}</h5>
                        <h4>{title}</h4>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const CourseTypeTwo = (props) => {
    const { id, title, description } = props;
    return (
        <Link to={`/course/${id}`}>
            <div className="courses-grid-item-jsc-30">
                <div className="type-2-jsc-30" />
                <div className="courses-grid-item-content-jsc-30">
                    <div className="icon-jsc-30">
                        <svg className="icon-border-jsc-30" viewBox="0 0 80 116">
                            <polygon fill="transparent" points="0 0 80 0 80 96 40 116 0 96" />
                            <path d="M2,94.763932 L40,113.763932 L78,94.763932 L78,0 L2,0 L2,94.763932 Z M0,0 L80,0 L80,96 L40,116 L0,96 L0,0 Z"
                                  fill="#FFFFFF" />
                        </svg>
                        <svg className="icon-body-jsc-30" viewBox="0 0 32 32">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M 14.5 8.5979C 12.2921 10.1929 12.4117 12.8269 13.6016 15.0029C 13.7337 15.001 13.8665 15 14 15C 14.0874 15 14.1746 15.0005 14.2614 15.0012C 14.0416 15.0034 13.8242 15.0088 13.6096 15.0173C 14.2877 16.2515 15.3098 17.3369 16.4459 18C 14.3294 17.7744 12.6638 16.626 11.5563 15.2C 8.87741 15.5813 7 16.4678 7 17.5C 7 18.8806 10.3578 20 14.5 20C 18.6422 20 22 18.8806 22 17.5C 22 16.7097 20.9001 16.0051 19.1827 15.5471C 21.4919 16.0901 23 16.9863 23 18C 23 19.1057 22.8006 20.1648 22.4358 21.1436C 21.66 21.542 20.602 21.9541 19.2366 22.2134C 16.9557 22.6467 14.7151 22.6921 13.3245 22.7202L 13.3206 22.7202C 12.6565 22.7336 12.1868 22.7432 12 22.7891C 12.0891 23.3652 14.732 24.147 18.2874 23.9351C 19.3124 23.874 20.269 23.7139 21.1114 23.5168C 19.4648 25.6362 16.8916 27 14 27C 9.02945 27 5 22.9705 5 18C 5 16.6333 7.74252 15.4797 11.4934 15.1179C 10.1653 13.3616 9.67465 11.209 10.2176 9.84131C 11.1722 7.43628 13.1228 6.27173 14.8059 5.26685C 16.9428 3.99097 18.6484 2.97266 17.3365 0C 17.3365 0 21.7312 3.37402 14.5 8.5979ZM 24 16.241C 28.998 12.2217 32.0343 19.0862 24.2762 21C 28.1211 18 27.4844 15.8921 24 16.241ZM 5.29346 23.5867C 2.06793 24.1301 0 25.0725 0 26.5C 0 28.9854 6.26801 32 14 32C 21.732 32 28 28.9854 28 26.5C 28 25.0725 25.9321 24.1301 22.7065 23.5867C 24.0038 24.2236 24.7692 25.0085 24.7692 25.8572C 24.7692 27.9875 19.9477 29.7144 14 29.7144C 8.05231 29.7144 3.23077 27.9875 3.23077 25.8572C 3.23077 25.0085 3.99625 24.2236 5.29346 23.5867ZM 17.8268 12.6321C 18.6878 13.8372 19.7992 15.9109 17.2656 17.5442C 18.0164 15.7192 17.1425 15.0442 16.2714 14.3711C 15.677 13.9119 15.084 13.4539 15.0093 12.6321C 14.7775 10.0811 18.9113 8 22.5272 8C 22.3726 8.0752 22.203 8.15601 22.0226 8.2417C 19.9794 9.21387 16.5503 10.8455 17.8268 12.6321Z"
                                  transform="translate(2 0)" fill="inherit" />
                        </svg>
                    </div>
                    <div className="body-jsc-30">
                        <h5>{description}</h5>
                        <h4>{title}</h4>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const CourseList = (props) => {
    const courses = props.courses.map((course, index) => index % 2 === 0
        ? <CourseTypeOne key={course.id} id={course.id} title={course.title} description={course.description} />
        : <CourseTypeTwo key={course.id} id={course.id} title={course.title} description={course.description} />);

    return (
        <React.Fragment>
            <div className="main-wrapper-nav-jsc-30">
                <ul>
                    <li className="active-jsc-30">
                        <Link to="/home">
                            Доступные курсы<span className="point-jsc-30">•</span>{props.courses.length}
                        </Link>
                    </li>
                    {/*<li className="active-jsc-30">*/}
                    {/*    <Link to="/home">*/}
                    {/*        Платные курсы<span className="point-jsc-30">•</span>2*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <Link to="/home">*/}
                    {/*        Бесплатные интенсивы<span className="point-jsc-30">•</span>3*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                </ul>
            </div>
            <div className="main-wrapper-content-jsc-30">
                <div className="courses-grid-jsc-30">
                    {courses}
                    {/*<div className="courses-grid-jsc-30">*/}
                    {/*<Link to="/sandbox">*/}
                    {/*    <div className="courses-grid-item-jsc-30">*/}
                    {/*        <div className="type-1-jsc-30"></div>*/}
                    {/*        <div className="courses-grid-item-content-jsc-30">*/}
                    {/*            <div className="icon-jsc-30">*/}
                    {/*                <svg className="icon-border-jsc-30" viewBox="0 0 80 116">*/}
                    {/*                    <polygon fill="transparent" points="0 0 80 0 80 96 40 116 0 96"></polygon>*/}
                    {/*                    <path d="M2,94.763932 L40,113.763932 L78,94.763932 L78,0 L2,0 L2,94.763932 Z M0,0 L80,0 L80,96 L40,116 L0,96 L0,0 Z"*/}
                    {/*                          fill="#FFFFFF"></path>*/}
                    {/*                </svg>*/}
                    {/*                <svg className="icon-body-jsc-30" viewBox="0 0 33 32">*/}
                    {/*                    <path fill="#fff" style={{fill: 'var(--color1, #fff)'}}*/}
                    {/*                          d="M7.523 0l-0.846 0.885-5.423 5.423-0.885 0.846 8.846 8.846-6.154 6.154-0.077 0.385-1.346 6.769-0.385 1.808 1.808-0.384 7.154-1.423 6.154-6.154 8.808 8.808 0.846-0.885 5.423-5.423 0.885-0.846-8.808-8.808 6.077-6.077c1.981-1.981 1.981-5.173 0-7.154-0.99-0.99-2.284-1.5-3.577-1.5s-2.587 0.51-3.577 1.5l-6.077 6.077-8.846-8.846zM7.523 3.5l2.385 2.423-1.808 1.808 1.769 1.769 1.808-1.808 2.923 2.923-3.654 3.654-7.115-7.115 3.692-3.654zM26.023 3.654c0.639 0 1.288 0.288 1.846 0.846 1.111 1.111 1.111 2.543 0 3.654l-0.808 0.808-3.654-3.654 0.808-0.808c0.558-0.558 1.168-0.846 1.808-0.846zM21.677 7.038l3.654 3.654-14.885 14.885c-0.813-1.562-2.091-2.841-3.654-3.654l14.885-14.885zM21.792 17.731l2.923 2.923-1.846 1.846 1.769 1.769 1.846-1.846 2.346 2.346-3.692 3.692-7.038-7.039 3.692-3.692zM5.215 23.885c1.476 0.62 2.649 1.793 3.269 3.269l-4.077 0.808 0.808-4.077z"></path>*/}
                    {/*                </svg>*/}
                    {/*            </div>*/}
                    {/*            <div className="body-jsc-30">*/}
                    {/*                <h5>Интерактивный онлайн-курс</h5>*/}
                    {/*                <h4>Веб-разработка</h4>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</Link>*/}
                    {/*<Link to="/home">*/}
                    {/*    <div className="courses-grid-item-jsc-30">*/}
                    {/*        <div className="type-2-jsc-30"></div>*/}
                    {/*        <div className="courses-grid-item-content-jsc-30">*/}
                    {/*            <div className="icon-jsc-30">*/}
                    {/*                <svg className="icon-border-jsc-30" viewBox="0 0 80 116">*/}
                    {/*                    <polygon fill="transparent" points="0 0 80 0 80 96 40 116 0 96"></polygon>*/}
                    {/*                    <path d="M2,94.763932 L40,113.763932 L78,94.763932 L78,0 L2,0 L2,94.763932 Z M0,0 L80,0 L80,96 L40,116 L0,96 L0,0 Z"*/}
                    {/*                          fill="#FFFFFF"></path>*/}
                    {/*                </svg>*/}
                    {/*                <svg className="icon-body-jsc-30" viewBox="0 0 32 32">*/}
                    {/*                    <path fillRule="evenodd" clipRule="evenodd"*/}
                    {/*                          d="M 14.5 8.5979C 12.2921 10.1929 12.4117 12.8269 13.6016 15.0029C 13.7337 15.001 13.8665 15 14 15C 14.0874 15 14.1746 15.0005 14.2614 15.0012C 14.0416 15.0034 13.8242 15.0088 13.6096 15.0173C 14.2877 16.2515 15.3098 17.3369 16.4459 18C 14.3294 17.7744 12.6638 16.626 11.5563 15.2C 8.87741 15.5813 7 16.4678 7 17.5C 7 18.8806 10.3578 20 14.5 20C 18.6422 20 22 18.8806 22 17.5C 22 16.7097 20.9001 16.0051 19.1827 15.5471C 21.4919 16.0901 23 16.9863 23 18C 23 19.1057 22.8006 20.1648 22.4358 21.1436C 21.66 21.542 20.602 21.9541 19.2366 22.2134C 16.9557 22.6467 14.7151 22.6921 13.3245 22.7202L 13.3206 22.7202C 12.6565 22.7336 12.1868 22.7432 12 22.7891C 12.0891 23.3652 14.732 24.147 18.2874 23.9351C 19.3124 23.874 20.269 23.7139 21.1114 23.5168C 19.4648 25.6362 16.8916 27 14 27C 9.02945 27 5 22.9705 5 18C 5 16.6333 7.74252 15.4797 11.4934 15.1179C 10.1653 13.3616 9.67465 11.209 10.2176 9.84131C 11.1722 7.43628 13.1228 6.27173 14.8059 5.26685C 16.9428 3.99097 18.6484 2.97266 17.3365 0C 17.3365 0 21.7312 3.37402 14.5 8.5979ZM 24 16.241C 28.998 12.2217 32.0343 19.0862 24.2762 21C 28.1211 18 27.4844 15.8921 24 16.241ZM 5.29346 23.5867C 2.06793 24.1301 0 25.0725 0 26.5C 0 28.9854 6.26801 32 14 32C 21.732 32 28 28.9854 28 26.5C 28 25.0725 25.9321 24.1301 22.7065 23.5867C 24.0038 24.2236 24.7692 25.0085 24.7692 25.8572C 24.7692 27.9875 19.9477 29.7144 14 29.7144C 8.05231 29.7144 3.23077 27.9875 3.23077 25.8572C 3.23077 25.0085 3.99625 24.2236 5.29346 23.5867ZM 17.8268 12.6321C 18.6878 13.8372 19.7992 15.9109 17.2656 17.5442C 18.0164 15.7192 17.1425 15.0442 16.2714 14.3711C 15.677 13.9119 15.084 13.4539 15.0093 12.6321C 14.7775 10.0811 18.9113 8 22.5272 8C 22.3726 8.0752 22.203 8.15601 22.0226 8.2417C 19.9794 9.21387 16.5503 10.8455 17.8268 12.6321Z"*/}
                    {/*                          transform="translate(2 0)" fill="inherit"></path>*/}
                    {/*                </svg>*/}
                    {/*            </div>*/}
                    {/*            <div className="body-jsc-30">*/}
                    {/*                <h5>Интерактивный онлайн-курс</h5>*/}
                    {/*                <h4>Программирование на Java</h4>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</Link>*/}
                    {/*</div>*/}
                </div>
            </div>
        </React.Fragment>
    );
};

class HomePageBody extends Component {

    restApiService = new RestApiService();

    state = {
        courses: null,
        isLoading: true
    };

    componentDidMount() {
        this.restApiService.getAllCourses().then((courses) => {
                this.setState({
                    courses: courses,
                    isLoading: false
                });
            });
    }

    render() {
        const  { courses, isLoading } = this.state;
        const contentToBeDisplayed = isLoading ? <div>Spinner</div> : <CourseList courses={courses} />;
        return (
            <div className="main-wrapper-jsc-30">
                {contentToBeDisplayed}
            </div>
        );
    }

}
