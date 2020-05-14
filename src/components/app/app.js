import React, { Component } from 'react';

import './app.css';
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import LoginPage from "../pages/unauthorized/login-page";
import RegistrationPage from "../pages/unauthorized/registration-page";
import RegistrationTypePage from "../pages/unauthorized/registration-type-page";
import RecoveryPage from "../pages/unauthorized/recovery-page";
import HomePage from "../pages/authorized/home-page";
import ManagementPage from "../pages/authorized/management-page";
import LessonPage from "../pages/authorized/lesson-page";
import CoursePage from "../pages/authorized/course-page";

export default class App extends Component {

    render() {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
             return (
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/login" render={() => <LoginPage /> } />
                        <Route exact path="/recovery" component={RecoveryPage} />
                        <Route exact path="/registration-type" component={RegistrationTypePage} />
                        <Route exact path="/registration" component={RegistrationPage} />
                        <Route exact path="/home" component={HomePage} />
                        <Route exact path="/course/:courseId" component={CoursePage} />
                        <Route exact path="/course/:courseId/lesson/:lessonId" component={LessonPage} />
                        <Route exact path="/admin/management" component={ManagementPage} />
                        <Route path="*" render={() => <Redirect to="/404" />} />
                    </Switch>
                </BrowserRouter>
            );
        } else {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/login" render={(props) => <LoginPage ${...props} /> } />
                        <Route exact path="/recovery" component={RecoveryPage} />
                        <Route exact path="/registration-type" component={RegistrationTypePage} />
                        <Route exact path="/registration" component={RegistrationPage} />
                        <Route exact path="*" render={(props) => {
                            return <Redirect to={{pathname: "/login", state: { from: props.location } }} />
                        }} />
                    </Switch>
                </BrowserRouter>
            );
        }
    }
};
