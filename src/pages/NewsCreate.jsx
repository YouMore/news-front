import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../API/axiosConfig';
import styles from '../styles/NewsCreate.module.css';

const NewsCreate = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [game, setGame] = useState('cs2');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newsData = {
      title,
      description,
      date,
      game,
    };

    try {
      const response = await axios.post('/users/news/create', newsData);
      console.log(response.data);
      navigate('/main'); // Перенаправление на главную страницу после успешного создания новости
    } catch (error) {
      console.error('Error creating news:', error);
    }
  };

  return (
    <div className={styles.newsCreateContainer}>
      <h2 className={styles.header}>Create News</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Заголовок</label>
          <input
            type="text"
            id="title"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Описание</label>
          <textarea
            id="description"
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="game" className={styles.label}>Игра</label>
          <select
            id="game"
            className={styles.select}
            value={game}
            onChange={(e) => setGame(e.target.value)}
          >
            <option value="cs2">CS2</option>
            <option value="dota2">Dota 2</option>
            <option value="another">Another</option>
          </select>
        </div>
        <button type="submit" className={styles.submitButton}>Создать</button>
      </form>
    </div>
  );
};

export default NewsCreate;
