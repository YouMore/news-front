import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import UsersNews from "../../pages/UsersNews.jsx";
import RegistrationPage from "../../pages/RegistrationPage.jsx";
import LoginPage from "../../pages/LoginPage.jsx";
import { AuthProvider } from "../../context/AuthContext";
import NewsCreate from "../../pages/NewsCreate.jsx";
import ModeratorPanel from "../../pages/ModeratorPanel.jsx";
import AdminsNews from "../../pages/AdminsNews.jsx";
import UserPage from "../../pages/UserPage.jsx";
import AdminPanel from "../../pages/AdminPanel.jsx";

const AppRouter = () =>{
    return (
        <AuthProvider>
            <Routes>
                <Route path="/main" element={<UsersNews />} />
                <Route path="/admins-news" element={<AdminsNews/>} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} /> 
                <Route path="/moderator-panel" element={<ModeratorPanel />} /> 
                <Route path="/news-create" element={<NewsCreate />} /> 
                <Route path="/user-page/:id" element={<UserPage />} />
                <Route path="/admin-panel" element={<AdminPanel />} />
                <Route path="*" element={<Navigate to="/main" replace />} />
            </Routes>
        </AuthProvider>
    );
}

export default AppRouter;