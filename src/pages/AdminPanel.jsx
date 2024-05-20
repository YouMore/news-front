import React, { useEffect, useState } from "react";
import UsersList from "../components/userList/UserList";
import axios from "../API/axiosConfig";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import styles from '../styles/AdminsPanel.module.css';

function AdminPanel() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Проверяем наличие токена
        const token = localStorage.getItem('auth_token');
        if (token) {
            const decoded = jwtDecode(token);
            setIsLoggedIn(true);
            setUserRole(decoded.a[0]);
        }

        let isMounted = true; // Флаг для отслеживания монтирования компонента

        const fetchUsers = async () => {
            try {
                const response = await axios.get(`/users`);
                if (isMounted) {
                    setUsers(response.data);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Ошибка при получении пользователей:', error);
                if (isMounted) {
                    setError('Не удалось получить пользователей.');
                    setLoading(false);
                }
            }
        };

        console.log("Загрузка...");
        fetchUsers();

        const intervalId = setInterval(fetchUsers, 5000); // Повторяет запрос каждые 5 секунд

        // Очистка интервала и установка флага размонтирования
        return () => {
            clearInterval(intervalId);
            isMounted = false;
        };
    }, []); 

    if (!isLoggedIn) {
        navigate('/login'); // Перенаправляем на страницу входа, если пользователь не авторизован
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
                    {userRole === 'ROLE_ADMIN' ? (
                        <div>
                            <h1 style={{ textAlign: "center" }}>Панель администратора</h1>
                            <UsersList users={users} />
                        </div>
                    ) : (
                        <div className={styles.notificationContainer}>
                            <div className={styles.notificationCard}>
                                <div className={styles.notificationTitle}>Уведомление</div>
                                <div className={styles.notificationText}>
                                    Вы не являетесь администратором
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default AdminPanel;
