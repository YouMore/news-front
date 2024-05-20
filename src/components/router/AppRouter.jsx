import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import UsersNews from "../../pages/UsersNews.jsx";
import RegistrationPage from "../../pages/RegistrationPage.jsx";
import LoginPage from "../../pages/LoginPage.jsx";
import { AuthProvider } from "../../context/AuthContext";

const AppRouter = () =>{
    return (
        <AuthProvider>
            <Routes>
                <Route path="/main" element={<UsersNews />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} /> 
                <Route path="*" element={<Navigate to="/main" replace />} />
            </Routes>
        </AuthProvider>
    );
}

export default AppRouter;