import React, { useEffect} from 'react';
import { Link } from "react-router-dom";
import Header from '../components/header/Header';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { setAuthToken } from '../utils/auth';
import axios from '../API/axiosConfig';

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
            // window.location.reload(); // Reload the page
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
      
      <main style={{ display: 'flex', minHeight: '80vh', alignItems: 'center' }}>
        <div className="container auth-form col-xl-4 col-lg-6 col-md-8 col-sm-11">
          <form className="m-4" name="f" method="post" onSubmit={onSubmit}>
            <h4 className="text-center mb-3">Войти в аккаунт</h4>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Адрес электронной почты</label>
              <input className="form-control" name="username" id="username" required value={login} onChange={(e) => 
                setLogin(e.target.value)} placeholder='Введите логин'/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Пароль</label>
              <input type="password" className="form-control" name="password" id="password" required value={password} onChange={(e) => 
            setPassword(e.target.value)} placeholder='Введите пароль'/>
            </div>
            <div className="col">
              <button type="submit" className="btn btn-primary">Войти</button>
              <Link to="/registration" style={{ fontSize: '14px', position: 'relative', top: '8px', left: '5px' }}>Еще нет аккаунта?</Link>
            </div>
          </form>
        </div>
      </main>

    </>
  );
}

export default LoginPage;