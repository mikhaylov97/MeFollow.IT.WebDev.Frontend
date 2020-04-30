import {Link} from "react-router-dom";
import React from "react";
import "./common.css";
import UnauthorizedHeader from "../../unauthorized-header";

const RecoveryPage = () => {
    return (
        <div className="main-container-jsc-10">
            <div className="container">
                <UnauthorizedHeader />
                <RecoveryPageBody />
            </div>
        </div>
    );
};

export default RecoveryPage;

const RecoveryPageBody = () => {
    return (
        <div className="unauthorized-main-wrapper-jsc-10 row d-flex justify-content-center align-items-center">
            <div className="form-wrapper-jsc-10">
                <div className="mb-4"><p className="title-jsc-10">Восстановление пароля</p></div>
                <div className="align-center-jsc-10 mb-4">
                    <p className="comment-jsc-10">Для восстановления пароля введите электронный адрес, указанный при
                        регистрации</p>
                </div>
                <form className="mb-4">
                    <div className="d-flex mb-3">
                        <input className="simple-input-jsc-10" type="email" name="email" placeholder="Эл. почта" />
                    </div>
                    <div className="mb-2">
                        <button className="submit-btn-jsc-10">
                            <span>Отправить</span>
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
};
