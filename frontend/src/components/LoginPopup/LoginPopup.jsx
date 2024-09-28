import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState('Login');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false); // New loading state
  const [errorMessage, setErrorMessage] = useState(''); // New error state

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === 'Login') {
      newUrl += '/api/user/login';
    } else {
      newUrl += '/api/user/register';
    }

    setLoading(true); // Set loading to true

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setShowLogin(false);
      } else {
        setErrorMessage(response.data.message); // Set error message if unsuccessful
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.'); // Handle network errors
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='Close' />
        </div>
        <div className='login-popup-inputs'>
          {currState === 'Login' ? null : (
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type='text'
              placeholder='Your name'
              required
            />
          )}
          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type='email'
            placeholder='Your email'
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type='password'
            placeholder='Password'
            required
          />
        </div>
        <button type='submit' disabled={loading}>
          {loading ? 'Loading...' : currState === 'sign up' ? 'Create account' : 'Login'}
        </button>
        {errorMessage && <p className='error-message'>{errorMessage}</p>} {/* Display error message */}
        <div className='login-popup-condition'>
          <input type='checkbox' required />
          <p>
            By continuing, I agree to the terms of use & <br />
            privacy policy.
          </p>
        </div>
        {currState === 'Login' ? (
          <p>
            Create a new account?{' '}
            <span onClick={() => setCurrState('sign up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <span onClick={() => setCurrState('Login')}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

// PropTypes for validation
LoginPopup.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default LoginPopup;
