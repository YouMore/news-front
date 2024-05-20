import React, { useEffect, useState } from "react";
import NewsList from "../components/newsList/NewsList";
import axios from "../API/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function UserPage() {
    const router = useNavigate();
    const { id } = useParams();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [userLogin, setUserLogin] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newslist, setNewslist] = useState([]);
    const [newslistNotModerated, setNewslistNotModerated] = useState([]);

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
                const response = await axios.get(`/news/users/${id}`);
                const responseUser = await axios.get(`/users/${id}`);
                setUserLogin(responseUser.data.login);
                const moderatedNews = response.data
                                    .filter(newsItem => newsItem.isModerated)
                                    .sort((a, b) => new Date(b.date) - new Date(a.date));
                const notModeratedNews = response.data
                                    .filter(newsItem => !newsItem.isModerated)
                                    .sort((a, b) => new Date(b.date) - new Date(a.date));
                if (isMounted) {
                    setNewslist(moderatedNews);
                    setNewslistNotModerated(notModeratedNews);
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
    }, [id]); // Передаем зависимость id для повторного запроса при изменении id в адресной строке

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
                        User : {userLogin}
                    </h1>
                    <h1 style={{ textAlign: "center" }}>
                        Published news
                    </h1>
                    <NewsList newslist={newslist} />
                    <h1 style={{ textAlign: "center" }}>
                        Unpublished news
                    </h1>
                    <NewsList newslist={newslistNotModerated} />
                </>
            )}
        </>
    );
}

export default UserPage;
