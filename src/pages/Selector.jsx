import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

import styles from './Selector.module.css';

function Selector() {
  const {user} = useAuth();
  
  return (
    <div className={styles.selector}>
      <div className={styles.container}>
        <h2>Hello, <span className={styles.username}>{user.username}</span></h2>
        <div className={styles.actions}>
            <Link to="/expenses" className={styles.expenses_btn}>Expenses</Link>
            <Link to="/todos" className={styles.todos_btn}>Todos</Link>
            <Link to="/profile" className={styles.profile_btn}>Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default Selector;