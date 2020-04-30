import {Link} from "react-router-dom";
import React, {Component} from "react";
import "./common.css";
import UnauthorizedHeader from "../../unauthorized-header";
import RestApiService from "../../../services/rest-api-service";

const RegistrationPage = () => {
    return (
        <div className="main-container-jsc-10">
            <div className="container">
                <UnauthorizedHeader />
                <RegistrationPageBody />
            </div>
        </div>
    );
};

export default RegistrationPage;

const ShowPasswordBtn = () => {
    return (
        <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"
             role="presentation" width="24" height="24" fill="inherit">
            <path d="M19.992 15.75a.482.482 0 00.724-.038 10.965 10.965 0 001.79-3.44.914.914 0 000-.542C21.113 7.25 16.936 4 12 4c-.848 0-1.673.096-2.465.277-.367.084-.48.535-.214.801l.88.881a.517.517 0 00.444.142 9.005 9.005 0 019.844 5.9 8.975 8.975 0 01-1.254 2.355.52.52 0 00.042.678l.715.716z"></path>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M20.839 19.425a.5.5 0 010 .707l-.707.707a.5.5 0 01-.707 0l-2.172-2.172A10.95 10.95 0 0112.001 20c-4.937 0-9.113-3.252-10.506-7.73a.915.915 0 010-.543 11.014 11.014 0 013.56-5.258L3.161 4.575a.5.5 0 010-.707l.707-.707a.5.5 0 01.707 0L20.84 19.425zM3.512 11.999a9.017 9.017 0 012.966-4.107l2.076 2.076a4 4 0 005.478 5.478l1.732 1.732a9.005 9.005 0 01-12.252-5.179z"></path>
            <path d="M15.324 11.081c.233.233.597.056.5-.259a4.009 4.009 0 00-2.646-2.646c-.315-.097-.492.267-.26.5l2.406 2.405z"></path>
        </svg>
    );
};

const HidePasswordBtn = () => {
    return (
        <svg focusable="false" viewBox="0 0 24 24"
             aria-hidden="true" role="presentation" width="24" height="24"
             fill="inherit">
            <path d="M16 12a4 4 0 11-2.822-3.824 2 2 0 102.646 2.646c.114.373.176.768.176 1.178z"></path>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M22.506 11.73a.914.914 0 010 .542C21.113 16.75 16.936 20 12 20c-4.937 0-9.114-3.252-10.506-7.73a.914.914 0 010-.542C2.888 7.25 7.065 4 12 4c4.936 0 9.113 3.252 10.506 7.73zM12 6a9.005 9.005 0 018.489 6 9.005 9.005 0 01-16.977 0A9.005 9.005 0 0112 6z"></path>
        </svg>
    );
};

class RegistrationPageBody extends Component {

    restApiService = new RestApiService();

    state = {
        email: "",
        password: "",
        passwordIsShown: false
    };

    processRegistration = (event) => {
        event.preventDefault();

        const { name, email, password } = this.state;

        // stop here if form is invalid
        if (!(name && email && password)) {
            console.log("Name, Email and Password are mandatory!");
            return;
        }

        this.restApiService.processRegistration(name,email, password)
            .then(({ tokens }) => {
                const accessToken = tokens.find((token) => token.type === "ACCESS").token;
                const refreshToken = tokens.find((token) => token.type === "REFRESH").token;

                localStorage.setItem("token", accessToken);
                localStorage.setItem("refToken", refreshToken);


                // console.log(`LoginPageBody ${JSON.stringify(this.props)}`);
                // const { from } = this.props.location.state || { from: { pathname: "/home" } };
                // console.log(`From ${JSON.stringify(from)}`);
                // this.props.history.push("/home");
                // console.log(`History ${JSON.stringify(this.props)}`);
            });
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    togglePasswordBtn = (event) => {
        event.preventDefault();
        const { passwordIsShown } = this.state;
        this.setState({ passwordIsShown: !passwordIsShown });
    };

    render() {
        const { name, email, password, passwordIsShown } = this.state;
        const passwordBtn = passwordIsShown ? <HidePasswordBtn /> : <ShowPasswordBtn />;

        return (
            <div className="unauthorized-main-wrapper-jsc-10 row d-flex justify-content-center align-items-center">
                <div className="form-wrapper-jsc-10">
                    <div className="mb-4"><p className="title-jsc-10">Регистрация</p></div>
                    <form className="mb-4" onSubmit={this.processRegistration}>
                        <div className="d-flex mb-3">
                            <input className="simple-input-jsc-10" type="text" name="name" placeholder="Имя" value={name} onChange={this.handleChange} />
                        </div>
                        <div className="d-flex mb-3">
                            <input className="simple-input-jsc-10" type="email" name="email" placeholder="Эл. почта" value={email} onChange={this.handleChange} />
                        </div>
                        <div className="d-flex mb-2 relative-jsc-10">
                            <input className="simple-input-jsc-10" type={passwordIsShown ? 'text' : 'password'} name="password"
                                   placeholder="Придумайте пароль" value={password} onChange={this.handleChange} />
                                <div className="password-btn-jsc-10">
                                    <button onClick={this.togglePasswordBtn}>
                                        {passwordBtn}
                                    </button>
                                </div>
                        </div>
                        <div className="mb-4">
                            <p className="password-requirements-jsc-10 without-margin-jsc-10">Требования к паролю:</p>
                            <div className="mt-2">
                                <svg className="password-requirements-badge-jsc-10" focusable="false" viewBox="0 0 24 24"
                                     aria-hidden="true" role="presentation" width="24" height="24">
                                    <rect x="2.5" y="2.5" width="19" height="19" rx="9.5"></rect>
                                </svg>
                                <span className="password-requirements-text-jsc-10">Буквы латинского алфавита</span>
                            </div>
                            <div>
                                <svg className="password-requirements-badge-jsc-10" focusable="false" viewBox="0 0 24 24"
                                     aria-hidden="true" role="presentation" width="24" height="24">
                                    <rect x="2.5" y="2.5" width="19" height="19" rx="9.5"></rect>
                                </svg>
                                <span className="password-requirements-text-jsc-10">Как минимум одна цифра</span>
                            </div>
                            <div>
                                <svg className="password-requirements-badge-jsc-10" focusable="false" viewBox="0 0 24 24"
                                     aria-hidden="true" role="presentation" width="24" height="24">
                                    <rect x="2.5" y="2.5" width="19" height="19" rx="9.5"></rect>
                                </svg>
                                {/*<span className="password-requirements-text-jsc-10">Спецсимволы: !#$%&‘*+-/=?^`_{}|~(),.:;<>@[]'</span>*/}
                            </div>
                            <div>
                                <svg className="password-requirements-badge-jsc-10" focusable="false" viewBox="0 0 24 24"
                                     aria-hidden="true" role="presentation" width="24" height="24">
                                    <rect x="2.5" y="2.5" width="19" height="19" rx="9.5"></rect>
                                </svg>
                                <span className="password-requirements-text-jsc-10">Длина от 8 до 50 символов</span>
                            </div>
                        </div>
                        <div className="mb-2">
                            <button className="submit-btn-jsc-10" type="submit">
                                <span>Зарегистрироваться</span>
                            </button>
                        </div>
                    </form>
                    <div className="align-center-jsc-10">
                        <p className="without-margin-jsc-10">Уже есть аккаунт? <Link className="strong-link-jsc-10"
                                                                           to="/login">Войти</Link></p>
                    </div>
                </div>
            </div>
        );
    }
}
