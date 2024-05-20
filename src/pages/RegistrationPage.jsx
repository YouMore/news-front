import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import Header from '../components/header/Header';
import axios from '../API/axiosConfig';
import styles from "../styles/RegistrationPage.module.css";

function RegistrationPage() {

    const location = useLocation();

    useEffect(() => {
    document.title = "Регистрация";
    }, [location]);

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/auth/registration", { login, password });
            navigate('/login'); // Redirect to the homepage
            window.location.reload(); // Reload the page
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <>
        <main className={styles.container}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h4 className={styles.header}>Регистрация</h4>
                <div className={styles.formGroup}>
                    <label htmlFor="username" className={styles.label}>Адрес электронной почты</label>
                    <input type="text" className={styles.input} name="username" id="username" required value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Введите логин"/>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Пароль</label>
                    <input type="password" className={styles.input} name="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Введите пароль"/>
                </div>
                <button type="submit" className={styles.submitBtn}>Зарегистрироваться</button>
                <Link to="/login" className={styles.loginLink}>Вход в аккаунт</Link>
            </form>
        </main>
        </>
    );
}

export default RegistrationPage;