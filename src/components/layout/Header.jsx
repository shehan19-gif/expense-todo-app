import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  const {user, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  return (
    <div className={styles.header}>
      {/* <h1>💰📝 Expense & Todo Manager</h1>
      <p className={styles.subtitle}>Simplifying your daily tasks and expenses.</p>
      <div className={styles.quickLinks}>
        {user? <Link to="/selector" className={styles.homeLink}>🏠︎ Home</Link> : ""}
        {user? <button onClick={handleLogout} className={styles.logout}>➜] Logout</button> : ""}
      </div> */}

      <div className={`${styles.headerContent} ${user ? "" : `${styles.headerWithoutUser}`}`}>
        <div className={styles.brand}>
          <div className={styles.logo}>💰📝</div>
          <div>
            <h1 className={styles.title}>Expense & Todo Manager</h1>
            <p className={styles.subtitle}>Simplifying your daily tasks and expenses.</p>
          </div>
        </div>
        
        {user && (
          <div className={styles.userSection}>
            <div className={styles.userInfo}>
              <span className={styles.welcome}>Welcome back, </span>
              <span className={styles.username}>{user.username}</span>
            </div>
            <div className={styles.actions}>
              <Link to="/selector" className={styles.homeLink}>
                <span className={styles.icon}>🏠</span>
                <span>Home</span>
              </Link>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                <span className={styles.icon}>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Header;