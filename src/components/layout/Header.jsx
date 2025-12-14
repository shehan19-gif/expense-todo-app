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
      <h1>💰📝 Expense & Todo Manager</h1>
      <div className={styles.quickLinks}>
        {user? <Link to="/selector" className={styles.homeLink}>🏠︎ Home</Link> : ""}
        {user? <button onClick={handleLogout} className={styles.logout}>➜] Logout</button> : ""}
      </div>
    </div>
  );
};

export default Header;