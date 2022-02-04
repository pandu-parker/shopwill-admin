import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';

import Loader from '../Loader';
import { AiFillCaretDown, AiOutlineShoppingCart } from 'react-icons/ai';
import { getCategories } from '../../actions/categoryActions';
import { logout } from '../../actions/userActions';
import Category from './components/Category';
import './style.scss';
import { getDeals } from '../../actions/dealsActions';

const Header = ({ history }) => {
  const dispatch = useDispatch();
  const categoriesReducer = useSelector(state => state.categories);
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const { categories } = categoriesReducer;
  const dealsList = useSelector(state => state.dealsList);
  const { loading } = dealsList;
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getDeals());
  }, [dispatch, history]);

  useEffect(() => {
    if(!userInfo || Object.keys(userInfo).length === 0) {
      history.push('/login')
    }
  }, [userInfo, history])

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      {loading && <Loader />}
      <nav>
        <div className='container'>
          <h1>
            <Link to='/'>Shopwill</Link>
          </h1>
          <ul>
            <li>
              <Link to='/admin'>Admin</Link>
            </li>
            {userInfo && userInfo.token ? (
              <li className='dropdown'>
                <Link to='/profile'>
                  {userInfo.name} <AiFillCaretDown />
                </Link>
                <ul className='dropdown-menu'>
                  <li>
                    {' '}
                    <Link to='/profile'>Profile</Link>
                  </li>
                  <li onClick={handleLogout}>
                    <Link to='#'>Logout</Link>
                  </li>
                </ul>
              </li>
            ) : (
              <li>
                <Link to='/login'>Login</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      {/* <div className='categories'>
        <div className='container'>
          <ul className='menu'>
            <li>
              <Link to='/all-items'>All Items</Link>
            </li>
            {Array.isArray(categories) && categories.length > 0
              ? categories.map(category => (
                  <Category key={category._id} category={category} />
                ))
              : null}
          </ul>
        </div>
      </div> */}
    </>
  );
};

export default withRouter(Header);
