import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.home}>
        <div className={styles.credentials}>
          <Link to="/login" className={styles.login + " " + styles.link}>Login</Link>
          <Link to="/signup" className={styles.signup + " " + styles.link}>Sign Up</Link>
        </div>
    </div>
  );
}

export default Home;