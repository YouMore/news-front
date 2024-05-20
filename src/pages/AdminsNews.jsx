import React, { useEffect, useState } from "react";
import NewsList from "../components/newsList/NewsList";
import axios from "../API/axiosConfig";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function AdminsNews() {
    const router = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newslist, setNewslist] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            const decoded = jwtDecode(token);
            setIsLoggedIn(true);
            setUserRole(decoded.a[0]);
        }

        let isMounted = true;

        const fetchNews = async () => {
            try {
                const response = await axios.get(`/news`);
                const newsItems = response.data;

                // Получение роли для каждого новостного элемента
                const newsWithRoles = await Promise.all(newsItems.map(async (newsItem) => {
                    try {
                        const userResponse = await axios.get(`/users/${newsItem.user_id}`);
                        return { ...newsItem, userRole: userResponse.data.role };
                    } catch (error) {
                        console.error(`Failed to fetch user role for user ${newsItem.user_id}`, error);
                        return null;
                    }
                }));

                // Фильтрация новостей по роли создателя (ROLE_ADMIN)
                const filteredNews = newsWithRoles
                                    .filter(newsItem => newsItem.isModerated)
                                    .filter(newsItem => newsItem && newsItem.userRole === 'ROLE_ADMIN')
                                    .sort((a, b) => new Date(b.date) - new Date(a.date));

                if (isMounted) {
                    setNewslist(filteredNews);
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

        fetchNews();

        const intervalId = setInterval(fetchNews, 5000);

        return () => {
            clearInterval(intervalId);
            isMounted = false;
        };
    }, []);

    if (!isLoggedIn) {
        router('/login');
        return null;
    }

    return (
        <>
            {loading ? (
                <div>Загрузка...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <>
                    <h1 style={{ textAlign: "center" }}>
                        Admins News
                    </h1>
                    <NewsList newslist={newslist} />
                </>
            )}
        </>
    );
}

export default AdminsNews;
