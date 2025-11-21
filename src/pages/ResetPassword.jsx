import React, { useState } from 'react';
import { userAPI } from '../utils/api';
import { Link } from 'react-router-dom';

import styles from './ResetPassword.module.css';

function ResetPassword() {
  const [passwordData, setPasswordData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setPasswordData({
        ...passwordData,
        [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(passwordData.newPassword !== passwordData.confirmPassword) {
        setError("Password doesn't match");
        setLoading(false);
        return;
    };

    const result = await userAPI.updatePasswordExternal(passwordData);

    console.log(result)

    if(result.success) {
        setStatus("Password successfully changed");
    } else {
        setError(result.error);
    }

    setLoading(false);

  };

  const handleStatusClose = () => {
    setStatus(null);
  };

  return (
    <div className={styles.resetPassword}>
      <div className={styles.container}>

        <form onSubmit={handleSubmit}>

            <h2>Reset Password</h2>
            {error && <div>{error}</div>}
            {status && <div>{status} <button onClick={handleStatusClose}>close</button></div>}

            <div className="resetPassword-email">
                <label>Email: </label>
                <input type="email" name="email" id="email" value={passwordData.email} onChange={handleChange} required />
            </div>

            <div className="resetPassword-prev-pwd">
                <label>New Password: </label>
                <input type="password" name="newPassword" id="newPassword" value={passwordData.newPassword} onChange={handleChange} required />
            </div>

             <div className="resetPassword-curr-pwd">
                <label>Confirm Password: </label>
                <input type="password" name="confirmPassword" id="confirmPassword" value={passwordData.confirmPassword} onChange={handleChange} required />
            </div>

            <div className="resetPassword-submit">
                <button type="submit" className={styles.pwdResetBtn}>
                    {loading? "Updating..." : "Reset Password"}
                </button>
            </div>
        </form>

        <p className={styles.signup}>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        <p className={styles.login}>Forgot your password? <Link to="/login">Login</Link></p>

      </div>
    </div>
  );
};

export default ResetPassword;