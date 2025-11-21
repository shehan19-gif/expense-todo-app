import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const [credentials, setCredentials] = useState({email: "", password: ""});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(credentials);

    if(result.success) {
      navigate("/selector");
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.loginSec}>
      
      <div className={styles.container}>
        <h2>Login</h2>
      
        <form onSubmit={handleSubmit}>
          {error && <div className='login__error'>{error}</div>}
          
          <div className="login__email">
            <label>Email</label>
            <input type="email" name="email" id="email" value={credentials.email} onChange={handleChange} required />
          </div>
          
          <div className="login__password">
            <label>Password</label>
            <input type="password" name="password" id="password" value={credentials.password} onChange={handleChange} required />
          </div>

          <div className="login__button">
            <button type="submit" className={styles.loginBtn} disabled={loading}>
              {loading? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <div className={styles.otherNavigations}>
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          <p>Forgot your password? <Link to="/forgot/password">Reset Password</Link></p>
        </div>
      </div>

    </div>
  );
};

export default Login;