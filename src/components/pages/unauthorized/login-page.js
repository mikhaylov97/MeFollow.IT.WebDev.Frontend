import {Link} from "react-router-dom";
import React, {Component} from "react";
import "./common.css";
import UnauthorizedHeader from "../../unauthorized-header";
import RestApiService from "../../../services/rest-api-service";

const LoginPage = (props) => {
    console.log(`LoginPage ${JSON.stringify(props)}`);
    return (
            <div className="main-container-jsc-10">
                <div className="container">
                    <UnauthorizedHeader />
                    <LoginPageBody {...props} />
                </div>
            </div>
    );
};

export default LoginPage;

const ShowPasswordBtn = () => {
    return (
        <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"
             role="presentation" width="24" height="24" fill="inherit">
            <path
                d="M19.992 15.75a.482.482 0 00.724-.038 10.965 10.965 0 001.79-3.44.914.914 0 000-.542C21.113 7.25 16.936 4 12 4c-.848 0-1.673.096-2.465.277-.367.084-.48.535-.214.801l.88.881a.517.517 0 00.444.142 9.005 9.005 0 019.844 5.9 8.975 8.975 0 01-1.254 2.355.52.52 0 00.042.678l.715.716z"></path>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M20.839 19.425a.5.5 0 010 .707l-.707.707a.5.5 0 01-.707 0l-2.172-2.172A10.95 10.95 0 0112.001 20c-4.937 0-9.113-3.252-10.506-7.73a.915.915 0 010-.543 11.014 11.014 0 013.56-5.258L3.161 4.575a.5.5 0 010-.707l.707-.707a.5.5 0 01.707 0L20.84 19.425zM3.512 11.999a9.017 9.017 0 012.966-4.107l2.076 2.076a4 4 0 005.478 5.478l1.732 1.732a9.005 9.005 0 01-12.252-5.179z"></path>
            <path
                d="M15.324 11.081c.233.233.597.056.5-.259a4.009 4.009 0 00-2.646-2.646c-.315-.097-.492.267-.26.5l2.406 2.405z"></path>
        </svg>
    );
};

const HidePasswordBtn = () => {
    return (
        <svg focusable="false" viewBox="0 0 24 24"
             aria-hidden="true" role="presentation" width="24" height="24"
             fill="inherit">
            <path
                d="M16 12a4 4 0 11-2.822-3.824 2 2 0 102.646 2.646c.114.373.176.768.176 1.178z"></path>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M22.506 11.73a.914.914 0 010 .542C21.113 16.75 16.936 20 12 20c-4.937 0-9.114-3.252-10.506-7.73a.914.914 0 010-.542C2.888 7.25 7.065 4 12 4c4.936 0 9.113 3.252 10.506 7.73zM12 6a9.005 9.005 0 018.489 6 9.005 9.005 0 01-16.977 0A9.005 9.005 0 0112 6z"></path>
        </svg>
    );
};

class LoginPageBody extends Component {

    restApiService = new RestApiService();

    state = {
        email: '',
        password: '',
        passwordIsShown: false
    };

    processLogin = (event) => {
        event.preventDefault();

        const { email, password } = this.state;

        // stop here if form is invalid
        if (!(email && password)) {
            console.log("Email and Password are mandatory!");
            return;
        }

        this.restApiService.processLogin(email, password)
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
        const { email, password, passwordIsShown } = this.state;
        const passwordBtn = passwordIsShown ? <HidePasswordBtn /> : <ShowPasswordBtn />;

        return (
            <div className="unauthorized-main-wrapper-jsc-10 row d-flex justify-content-center align-items-center">
                <div className="form-wrapper-jsc-10">
                    <div className="mb-4"><p className="title-jsc-10">Вход</p></div>
                    <form className="mb-4" onSubmit={this.processLogin}>
                        <div className="d-flex mb-3">
                            <input className="simple-input-jsc-10" type="email" name="email" value={email} onChange={this.handleChange} placeholder="Эл. почта"/>
                        </div>
                        <div className="d-flex mb-3 relative-jsc-10">
                            <input className="simple-input-jsc-10" type={passwordIsShown ? 'text' : 'password'} name="password" value={password} onChange={this.handleChange} placeholder="Пароль"/>
                            <div className="password-btn-jsc-10">
                                <button onClick={this.togglePasswordBtn}>
                                    {passwordBtn}
                                </button>
                            </div>
                        </div>
                        <div className="mb-2">
                            <button className="submit-btn-jsc-10" type="submit">
                                <span>Войти</span>
                            </button>
                        </div>
                        <div className="align-center-jsc-10">
                            <Link className="simple-link-jsc-10" to="/recovery">
                                Забыли пароль?
                            </Link>
                        </div>
                    </form>
                    <div className="align-center-jsc-10 mb-3">
                        <p className="without-margin-jsc-10">Или войти с помощью</p>
                    </div>
                    <div className="align-center-jsc-10 mb-4">
                        <button className="social-icon-jsc-10">
					<span>
						<svg width="56" height="56" viewBox="0 0 56 56" fill="none">
							<rect x="0.5" y="0.5" width="55" height="55" rx="27.5" fill="#fff" stroke="#DFE1E7"></rect>
							<path d="M36.64 28.205c0-.638-.057-1.252-.164-1.841H28v3.481h4.844a4.14 4.14 0 01-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
                                  fill="#4285F4"></path>
							<path d="M28 37c2.43 0 4.467-.806 5.956-2.18l-2.909-2.259c-.805.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711h-3.007v2.332A8.997 8.997 0 0028 37z"
                                  fill="#34A853"></path>
							<path d="M22.964 29.71a5.41 5.41 0 01-.282-1.71c0-.593.102-1.17.282-1.71v-2.332h-3.007A8.996 8.996 0 0019 28c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                                  fill="#FBBC05"></path>
							<path d="M28 22.58c1.321 0 2.508.454 3.44 1.346l2.582-2.582C32.462 19.892 30.426 19 28 19a8.997 8.997 0 00-8.043 4.958l3.007 2.332c.708-2.127 2.692-3.71 5.036-3.71z"
                                  fill="#EA4335"></path>
						</svg>
					</span>
                        </button>
                        <button className="social-icon-jsc-10">
					<span>
						<svg width="56" height="56" viewBox="0 0 56 56" fill="none">
							<rect width="56" height="56" rx="28" fill="#5181B8"></rect>
							<path d="M38.04 23.11c-.08.39-.392 1.028-.938 1.913a58.697 58.697 0 01-1.446 2.344c-.442.651-.677.99-.703 1.016-.156.234-.234.404-.234.508 0 .104.078.286.234.547l.234.273.626.625c.234.234.494.508.78.82.287.313.548.625.782.938.26.286.482.586.664.898.208.313.352.573.43.781.182.651-.078.977-.782.977h-2.304a1.26 1.26 0 01-.469-.078 1.66 1.66 0 01-.43-.274c-.156-.13-.3-.273-.43-.43-.13-.156-.325-.377-.585-.663-.26-.287-.521-.56-.782-.82-1.041-.99-1.81-1.485-2.304-1.485-.313 0-.495.091-.547.273-.052.183-.078.704-.078 1.563.026.417.039.755.039 1.016 0 .312-.104.546-.313.703-.208.13-.664.195-1.367.195-1.224 0-2.46-.365-3.71-1.094-1.25-.729-2.345-1.77-3.282-3.125a25.642 25.642 0 01-2.227-3.554c-.572-1.198-.95-2.11-1.132-2.735-.183-.625-.274-1.068-.274-1.328 0-.443.26-.664.781-.664h2.305c.287 0 .495.065.625.195.156.13.287.365.39.703.548 1.589 1.212 3.008 1.993 4.258.807 1.25 1.42 1.875 1.836 1.875.156 0 .26-.052.312-.156.078-.13.118-.365.118-.703v-3.399a3.134 3.134 0 00-.196-.937c-.104-.26-.208-.443-.312-.547l-.313-.39a.7.7 0 01-.117-.352c0-.104.026-.195.078-.274a.698.698 0 01.195-.195.693.693 0 01.313-.078h3.633c.416 0 .625.287.625.86v4.53c0 .443.117.665.351.665.26 0 .625-.235 1.094-.703.495-.547.977-1.211 1.445-1.993.47-.78.82-1.432 1.055-1.953l.352-.742c.182-.443.508-.664.976-.664h2.305c.625 0 .86.287.703.86z"
                                fill="#fff"></path>
						</svg>
					</span>
                        </button>
                    </div>
                    <div className="align-center-jsc-10">
                        <p className="without-margin-jsc-10">Нет аккаунта? <Link className="strong-link-jsc-10"
                                                                          to="/registration-type">Зарегистрироваться</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
