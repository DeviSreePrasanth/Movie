import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
const Signup = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    setError(null);
  
    try {
      const response = await axios.post('http://localhost:4000/signup', {
        username: data.name,
        email: data.email,
        password: data.password,
      });
  
      if (response.status === 201) {
        navigate('/login');
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
      setError('email already exist.');
    }
  };
  
  

  return (
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Arial', sans-serif;
          background: linear-gradient(156deg, rgb(120, 118, 118) 50%, #782510 50%);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          border-radius:25px;
        }

        .signup-page {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .signup-container {
          background-color: white;
          padding: 40px 30px;
          border-radius: 15px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          text-align: center;
          width: 300px;
        }

        .signup-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #333;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .input-group input {
          width: 95%;
          padding: 15px;
          border: none;
          border-radius: 25px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .input-group input:focus {
          outline: none;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .signup-button {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 25px;
          background: #cf6845;
          background-image: linear-gradient(45deg, rgb(120, 118, 118), #782510);
          color: white;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s ease;
          margin-top: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .signup-button:hover {
          background-image: linear-gradient(45deg, #5f5e5e, #5c1a08);
        }

        .login-link {
          display: block;
          margin-top: 20px;
          color: #7a7a7a;
          font-size: 14px;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .login-link:hover {
          color: #333;
        }

        @media (max-width: 600px) {
          .signup-container {
            width: 90%;
            padding: 20px 15px;
          }

          .signup-title {
            font-size: 20px;
          }

          .input-group input {
            width: 90%;
            padding: 10px;
          }

          .signup-button {
            padding: 10px;
            font-size: 14px;
          }
        }

        .password-group {
          position: relative;
        }

        .password-group input {
          width: calc(100% - 40px);
          padding-right: 40px;
        }

        .password-toggle {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          font-size: 18px;
          color: #888;
        }

        .password-toggle:hover {
          color: #333;
        }
      `}</style>
      <div className="signup-page">
        <div className="signup-container">
          <h2 className="signup-title">Sign Up</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={data.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={data.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group password-group">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handleChange}
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="input-group password-group">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={data.confirmPassword}
                onChange={handleChange}
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="submit" className="signup-button">SIGN UP</button>
          </form>
          <p className="login-link">Already have an account? <Link to='/' style={{ textDecoration: 'none', color: 'grey' }}>Login</Link></p> 
        </div>
      </div>
    </>
  );
};

export default Signup;
