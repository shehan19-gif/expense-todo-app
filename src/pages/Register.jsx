import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

function Register() {
  const [userData, setUserdata] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    address: "",
    telephone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const {register} = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    setError("");
    setSuccess("");

    const result = await register(userData);

    if(result.success) {
      setSuccess("Signup Successfully");

      // Clear the form
      setUserdata({
        firstName: "",
        lastName: "",
        birthDate: "",
        address: "",
        telephone: "",
        email: "",
        password: "",
      });
    } else {
      setError(result.error || "Registration failed");
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setUserdata({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.register}>
      <div className="container">
        
        <h2>User Register</h2>
      
        <form onSubmit={handleSubmit}>
          {error && <MessageButton type="error" message={error} func1={setSuccess} func2={setError}/>}
          {success && <MessageButton type="success" message={success} func1={setSuccess} func2={setError}/>}

          <div className="register__first-name">
            <label>First Name</label>
            <input type="text" name="firstName" id="firstName" value={userData.firstName} onChange={handleChange} required />
          </div>

          <div className="register__last-name">
            <label>Last Name</label>
            <input type="text" name="lastName" id="lastName" value={userData.lastName} onChange={handleChange} required />
          </div>

          <div className="register__birth-date">
            <label>Birth Date</label>
            <input type="date" name="birthDate" id="birthDate" value={userData.birthDate} onChange={handleChange} required />
          </div>

          <div className="register__address">
            <label>Address</label>
            <textarea name="address" id="address" value={userData.address} onChange={handleChange} placeholder='Enter your address here...' rows="5" required />
          </div>

          <div className="register__telephone">
            <label>Telephone</label>
            <input type="tel" name="telephone" id="telephone" value={userData.telephone} onChange={handleChange} required />
          </div>

          <div className="register__email">
            <label>Email</label>
            <input type="email" name="email" id="email" value={userData.email} onChange={handleChange} required />
          </div>

          <div className="register__password">
            <label>Password</label>
            <input type="password" name="password" id="password" value={userData.password} onChange={handleChange} required />
          </div>

          <div className="register__button">
            <button type="submit" className={styles.signupBtn} disabled={loading}>
              {loading? "Registering..." : "Sign Up"}
            </button>
          </div>
        </form>

        <p>Already have an account? <Link to="/login">Login</Link></p>

      </div>
    </div>
  );
}

export default Register;