import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
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
      <h1>Expenses & Todos Managing System</h1>
      {user? <button onClick={handleLogout} className={styles.logout}>Logout</button> : ""}
    </div>
  );
};

export default Header;