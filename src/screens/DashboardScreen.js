import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

import '../styles/DashboardScreen.scss';

const DashboardScreen = () => {
  return (
    <div className='container'>
      <Dashboard />
      <h3 className='dashboard-title small'>Quick Access:</h3>
      <ul className='main-screens'>
        <li>
          <Link to='/admin/products'>Products</Link>
        </li>
        <li>
          <Link to='/admin/banner'>Banner</Link>
        </li>
        <li>
          <Link to='/admin/orders'>Orders</Link>
        </li>
        <li>
          <Link to='/admin/categories'>Categories</Link>
        </li>
        <li>
          <Link to='/admin/deals'>Deals</Link>
        </li>
        <li>
          <Link to='/admin/hsn'>HSN</Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardScreen;
