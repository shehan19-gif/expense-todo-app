import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.home}>
        <div className={styles.credentials}>
          {/* <Link to="/login" className={styles.login + " " + styles.link}>Login</Link>
          <Link to="/signup" className={styles.signup + " " + styles.link}>Sign Up</Link> */}
          <div className={styles.card}>
            <div className={styles.emoji}>🔐</div>
            <h2 className={styles.cardTitle}>Login</h2>
            <p className={styles.cardDescription}>Access your existing account</p>
            <Link to="/login" className={styles.cardButton + " " + styles.loginButton}>
              Continue to Login
            </Link>
          </div>
          
          <div className={styles.card}>
            <div className={styles.emoji}>✨</div>
            <h2 className={styles.cardTitle}>Sign Up</h2>
            <p className={styles.cardDescription}>Create a new account</p>
            <Link to="/signup" className={styles.cardButton + " " + styles.signupButton}>
              Start for Free
            </Link>
          </div>
        </div>
    </div>
  );
}

export default Home;