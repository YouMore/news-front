import React, { useEffect, useState } from "react";
import NewsList from "../components/newsList/NewsList";
import NewsService from "../API/NewsService";
import { useFetching } from "../hooks/useFetching";
import axios from "../API/axiosConfig";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function UsersNews() {
    const router = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newslist, setNewslist] = useState([]);

    useEffect(() => {
        // Проверяем наличие токена
        const token = localStorage.getItem('auth_token');
        if (token) {
            const decoded = jwtDecode(token);
            setIsLoggedIn(true);
            setUserRole(decoded.a[0]);
        }

        let isMounted = true; // Флаг для отслеживания монтирования компонента

        const fetchNews = async () => {
            try {
                const response = await axios.get(`/news`);
                const moderatedNews = response.data
                                    .filter(newsItem => newsItem.isModerated)
                                    .sort((a, b) => new Date(b.date) - new Date(a.date));
                if (isMounted) {
                    setNewslist(moderatedNews);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Ошибка при получении новостей:', error);
                if (isMounted) {
                    setError('Не удалось получить новости.');
                    setLoading(false);
                }
            }
        };

        console.log("Загрузка...");
        fetchNews();

        const intervalId = setInterval(fetchNews, 5000); // Повторяет запрос каждые 5 секунд

        // Очистка интервала и установка флага размонтирования
        return () => {
            clearInterval(intervalId);
            isMounted = false;
        };
    }, []); // Пустой массив зависимостей, чтобы запрос выполнялся только один раз при монтировании компонента

    if (!isLoggedIn) {
        router('/login'); // Перенаправляем на страницу входа, если пользователь не авторизован
        return null;
    }

    // Проверяем роль пользователя и отображаем компонент ModeratorPanel или блок с сообщением
    return (
        <>
            {loading ? (
                <div>Загрузка...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <>
                    <h1 style={{ textAlign: "center" }}>
                        News
                    </h1>
                    <NewsList newslist={newslist} />
                </>
            )}
        </>
    );
}


export default UsersNews;
