import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as LoginSvg } from '../../assets/svgs/orangeCurve.svg';
import { ReactComponent as Goods } from '../../assets/svgs/goods.svg';
import { ReactComponent as Logo } from '../../assets/svgs/logo.svg';
import { login } from '../../actions/userActions';
import Message from '../../components/Message'
import './style.scss';

const LoginForm = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('admin');
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo, error } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.token) {
      history.push('/');
    }
  }, [history, userInfo]);

  const loginHandler = e => {
    e.preventDefault();
    dispatch(login(email, password, userType ));
  };
  return (
    <div className='form-container'>
      <div className='form-desc'>
        <div className='wave-svg'>
          <LoginSvg />
        </div>
        <div className='desc-text'>
          <h2>Login</h2>
          <p>Get access to our Orders, Wishlists and recommendations</p>
        </div>
        <div className='logo-svg'>
          <Logo />
        </div>
        <div className='goods-svg'>
          <Goods />
        </div>
      </div>
      <form className='login-form' onSubmit={loginHandler}>
        {error && <Message>{error}</Message>}
        <div className='user-type'>
          <span
            className={`${userType === 'admin' ? 'active' : ''}`}
            onClick={e => setUserType('admin')}
          >
            Admin
          </span>
          <span
            className={`${userType === 'retailers' ? 'active' : ''}`}
            onClick={e => setUserType('retailers')}
          >
            Retailer
          </span>
        </div>
        <div className='form-control'>
          <label htmlFor=''>Email / Phone Number</label>
          <input
            type='email'
            placeholder='Your Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label htmlFor=''>Password</label>
          <input
            type='password'
            placeholder='Your Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <span className='muted-text'>
            Don't have an account? <Link to='signup'>SignUp</Link>
          </span>
        </div>
        <div className='form-control'>
          <button className='btn-block submit-btn'>Login</button>
        </div>
      </form>
    </div>
  );
};

export default withRouter(LoginForm);
