import React, { useState } from 'react';
import axios from '../../API/axiosConfig';
import styles from './UserItem.module.css';

const UserItem = ({ user }) => {
  const [role, setRole] = useState(user.role);

  const handleRoleChange = async (newRole) => {
    try {
      const response = await axios.put(`/admin/edit/user/${user.id}`, { role: newRole });
      setRole(response.data.role);
    } catch (error) {
      console.error('Error changing role:', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`/admin/delete/user/${user.id}`);
      // Handle successful deletion, e.g., remove user from UI or notify user
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className={styles.userCard}>
      <div className={styles.cardBody}>
        <div className={styles.leftSide}>
          <span className={styles.userLogin}>{user.login}</span>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Количество новостей:</span> {user.news.length}
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Роль:</span>
            <select
              className={styles.roleSelect}
              value={role}
              onChange={(e) => handleRoleChange(e.target.value)}
            >
              <option value="ROLE_ADMIN">ROLE_ADMIN</option>
              <option value="ROLE_GUEST">ROLE_GUEST</option>
              <option value="ROLE_MODERATOR">ROLE_MODERATOR</option>
            </select>
          </div>
        </div>
        <div className={styles.rightSide}>
          <button className={styles.actionButtonDanger} onClick={handleDeleteUser}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
