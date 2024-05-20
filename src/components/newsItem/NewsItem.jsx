import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./NewsItem.module.css";
import { formatDate } from "../../utils/dateConverter";
import { jwtDecode } from "jwt-decode";
import axios from "../../API/axiosConfig";

function NewsItem({ news }) {
  const router = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userLogin, setUserLogin] = useState('');
  const [id, setId] = useState(null);
  const [isModerated, setIsModerated] = useState(news.isModerated);

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

  const handleDelete = async () => {
    try {
      await axios.delete(`/news/${news.id}`);
    } catch (error) {
      console.error("Failed to delete the news:", error);
    }
  };

  const handlePublish = async () => {
    try {
      await axios.put(`/moderator/news/confirm/${news.id}`);
      setIsModerated(true);
    } catch (error) {
      console.error("Failed to publish the news:", error);
    }
  };

  const handleUnpublish = async () => {
    try {
      await axios.put(`/moderator/news/reject/${news.id}`);
      setIsModerated(false);
    } catch (error) {
      console.error("Failed to unpublish the news:", error);
    }
  };

  const canDelete = isLoggedIn && (userRole === 'ROLE_ADMIN' || userRole === 'ROLE_MODERATOR' || id === news.user_id);
  const canPublish = isLoggedIn && (userRole === 'ROLE_ADMIN' || userRole === 'ROLE_MODERATOR') && !isModerated;
  const canUnpublish = isLoggedIn && (userRole === 'ROLE_ADMIN' || userRole === 'ROLE_MODERATOR') && isModerated;

  return (
    <Card className={styles.newsCard}>
      <Card.Body className={styles.cardBody}>
        <div className={styles.header}>
          <div className={styles.title}>
            {news.title}
          </div>
          <div className={styles.userLogin} onClick={() => router(`/user-page/${news.user_id}`)}>
            {news.user_login}
          </div>
        </div>
        <div className={styles.description}>{news.description}</div>
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Game:</span> {news.game}
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Date:</span> {formatDate(news.date)}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          {canDelete && (
            <Button variant="danger" onClick={handleDelete} className={`${styles.actionButton} ${styles.actionButtonDanger}`}>
              Удалить
            </Button>
          )}
          {canPublish && (
            <Button variant="success" onClick={handlePublish} className={`${styles.actionButton} ${styles.actionButtonSuccess}`}>
              Опубликовать
            </Button>
          )}
          {canUnpublish && (
            <Button variant="warning" onClick={handleUnpublish} className={`${styles.actionButton} ${styles.actionButtonWarning}`}>
              Заблокировать
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default NewsItem;
