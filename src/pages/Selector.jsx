import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

import styles from './Selector.module.css';

function Selector() {
  const {user} = useAuth();
  
  return (
    <div className={styles.selector}>
      <div className={styles.container}>
        {/* <h2>Hello, <span className={styles.username}>{user.username}</span></h2> */}
        <h1 className={styles.greeting}>Hello, <span className={styles.username}>{user.username}</span> 👋</h1>
        <p className={styles.subtitle}>What would you like to manage today?</p>
        
        <div className={styles.actions}>
            {/* <Link to="/expenses" className={styles.expenses_btn}>Expenses</Link>
            <Link to="/todos" className={styles.todos_btn}>Todos</Link>
            <Link to="/profile" className={styles.profile_btn}>Profile</Link> */}

            <div className={styles.card}>
              <div className={styles.emoji}>💰</div>
              <h2 className={styles.cardTitle}>Expenses</h2>
              <p className={styles.cardDescription}>Track and manage your spending</p>
              <Link to="/expenses" className={styles.cardButton + " " + styles.expensesBtn}>
                View Expenses
              </Link>
            </div>
            
            <div className={styles.card}>
              <div className={styles.emoji}>✅</div>
              <h2 className={styles.cardTitle}>Todos</h2>
              <p className={styles.cardDescription}>Manage your daily tasks</p>
              <Link to="/todos" className={styles.cardButton + " " + styles.todosBtn}>
                View Todos
              </Link>
            </div>
            
            <div className={styles.card}>
              <div className={styles.emoji}>👤</div>
              <h2 className={styles.cardTitle}>Profile</h2>
              <p className={styles.cardDescription}>Manage your account settings</p>
              <Link to="/profile" className={styles.cardButton + " " + styles.profileBtn}>
                View Profile
              </Link>
            </div>

        </div>
      
      </div>
    </div>
  );
};

export default Selector;