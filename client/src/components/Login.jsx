import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Login successful');
        localStorage.setItem('userEmail', email);
        navigate('/home');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Invalid email or password'); 
    }
  };

  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background: linear-gradient(156deg, rgb(120, 118, 118) 50%, #782510 50%);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .login-page {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            border-radius: 55px;
          }

          .login-container {
            background-color: white;
            padding: 40px 30px;
            border-radius: 25px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            text-align: center;
            width: 300px;
          }

          .login-title {
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

          .login-button {
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

          .login-button:hover {
            background-image: linear-gradient(45deg, #5f5e5e, #5c1a08);
          }

          .signup-link {
            display: block;
            margin-top: 20px;
            color: #7a7a7a;
            font-size: 14px;
            text-decoration: none;
            transition: color 0.3s ease;
          }

          .signup-link:hover {
            color: #333;
          }

          @media (max-width: 600px) {
            .login-container {
              width: 90%;
              padding: 20px 15px;
            }

            .login-title {
              font-size: 20px;
            }

            .input-group input {
              width: 90%;
              padding: 10px;
            }

            .login-button {
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
        `}
      </style>
      <div className="login-page">
        <div className="login-container">
          <h2 className="login-title">Login</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group password-group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="submit" className="login-button">LOGIN</button>
            <Link to='/signup' style={{ textDecoration: 'none', color: 'grey' }}>Sign Up</Link>
          </form>
        </div>
      </div>
    </>
  );    
};

export default Login;
