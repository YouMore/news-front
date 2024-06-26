import React, { useEffect, useState } from "react";
import NewsList from "../components/newsList/NewsList";
import axios from "../API/axiosConfig";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import styles from '../styles/ModeratorPanel.module.css';


function ModeratorPanel() {
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
                const unmoderatedNews = response.data.filter(newsItem => !newsItem.isModerated);
                if (isMounted) {
                    setNewslist(unmoderatedNews);
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
                    {userRole === 'ROLE_ADMIN' || userRole === 'ROLE_MODERATOR' ? (
                        <div>
                                <h1 style={{ textAlign: "center" }}>
                                    Moderate
                                </h1>
                                <NewsList newslist={newslist} />
                        </div>
                    ) : (
                        <div className={styles.notificationContainer}>
                            <div className={styles.notificationCard}>
                                <div className={styles.notificationTitle}>Уведомление</div>
                                <div className={styles.notificationText}>
                                Вы не являетесь ни администратором, ни модератором
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default ModeratorPanel;
