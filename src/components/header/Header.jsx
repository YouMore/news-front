import {React} from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Header = () => {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userLogin, setUserLogin] = useState('');
  const [id, setId] = useState(null);
  
  useEffect(() => {
      // Проверяем наличие токена
      const token = localStorage.getItem('auth_token');
      if (token) {
          const decoded = jwtDecode(token);
          setIsLoggedIn(true);
          setId(decoded.sub)
          setUserRole(decoded.a[0]);
          setUserLogin(decoded.e);
      }
  }, []); 

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.leftNav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/" className={styles.navLink}>Главная</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/admins-news" className={styles.navLink}>Новости от админов</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/moderator-panel" className={styles.navLink}>Панель модератора</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/admin-panel" className={styles.navLink}>Панель администратора</Link>
            </li>
            {isLoggedIn && (
              <li className={styles.navItem}>
                <Link to="/news-create" className={styles.navLink}>Создать новость</Link>
              </li>
            )}
          </ul>
        </div>
        {isLoggedIn && (
          <div className={styles.rightNav}>
            <span className={styles.nickname} onClick={handleToggleDropdown}>{userLogin}</span>
            {isDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                <li className={styles.dropdownMenuItem}>
                  <Link to={`/user-page/${id}`} className={styles.dropdownLink}>Личный кабинет</Link>
                </li>
                <li className={styles.dropdownMenuItem}>
                  <Link to="/login" onClick={handleLogout} className={styles.logoutButton}>Выйти</Link>
                </li>
              </ul>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;