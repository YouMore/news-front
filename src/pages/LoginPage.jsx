import React, { useEffect} from 'react';
import { Link } from "react-router-dom";
import Header from '../components/header/Header';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { setAuthToken } from '../utils/auth';
import axios from '../API/axiosConfig';
import styles from '../styles/LoginPage.module.css';

function LoginPage() {

    const location = useLocation();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/auth/login", { login, password });
            setAuthToken(response.data.accessToken); // Set the token in local storage
            console.log(response.data.accessToken);
            navigate('/main'); // Redirect to the homepage
            window.location.reload(); // Reload the page
        } catch (error) {
            console.error("Login failed:", error);
            setAuthToken(null); // Ensure token is cleared if login fails
        }
    };

  useEffect(() => {
    document.title = "Вход в аккаунт";
  }, [location]);


  return (
    <>
      
      <main className={styles.loginContainer}>
        <div className="container">
          <form className={styles.form} name="f" method="post" onSubmit={onSubmit}>
            <h4 className={styles.header}>Войти в аккаунт</h4>
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.label}>Адрес электронной почты</label>
              <input className={styles.input} name="username" id="username" required value={login} onChange={(e) => setLogin(e.target.value)} placeholder='Введите логин' />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>Пароль</label>
              <input type="password" className={styles.input} name="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Введите пароль' />
            </div>
            <button type="submit" className={styles.submitButton}>Войти</button>
            <Link to="/registration" className={styles.registrationLink}>Еще нет аккаунта?</Link>
          </form>
        </div>
      </main>

    </>
  );
}

export default LoginPage;