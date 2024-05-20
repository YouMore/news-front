import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./NewsItem.module.css";
import { formatDate } from "../../utils/dateConverter";

function NewsItem({ news }) {
  const router = useNavigate();

  return (
    <Card className={styles.newsCard}>
      <Card.Body className={styles.cardBody}>
        <div className={styles.header}>
          <div className={styles.title}>
            {news.title}
          </div>
          <div className={styles.userLogin} onClick={() => router(`/user/${news.user_id}`)}>
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
      </Card.Body>
    </Card>
  );
}

export default NewsItem;
