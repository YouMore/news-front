import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import Header from '../components/header/Header';
import axios from '../API/axiosConfig';

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
            <main style={{ display: 'flex', minHeight: '80vh', alignItems: 'center' }}>
                <div className="container auth-form col-xl-4 col-lg-6 col-md-8 col-sm-11">
                    <form className="m-4" onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Адрес электронной почты</label>
                            <input type="text" className="form-control" name="username" id="username" required value={login} onChange={(e) => 
                setLogin(e.target.value)} placeholder='Введите логин'/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Пароль</label>
                            <input type="password" className="form-control" name="password" id="password" required value={password} onChange={(e) => 
            setPassword(e.target.value)} placeholder='Введите пароль'/>
                        </div>
                        <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
                        <Link to="/login" style={{ fontSize: '14px', position: 'relative', top: '8px', left: '5px' }}>Вход в аккаунт</Link>
                    </form>
                </div>
            </main>
        </>
    );
}

export default RegistrationPage;