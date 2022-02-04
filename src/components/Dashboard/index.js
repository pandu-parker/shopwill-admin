import React from 'react';

import './styles.scss';
import { AiOutlineUser, AiOutlineDropbox } from 'react-icons/ai';
import { FiPackage } from 'react-icons/fi';
import {FaRupeeSign} from 'react-icons/fa'
const Dashboard = () => {
  return (
    <div>
      <h2 className='dashboard-title'>Overview:</h2>
      <ul className='dashboard-list'>
        <li>
          <span>
            Total Products <AiOutlineDropbox />{' '}
          </span>
          <span>10</span>
        </li>
        <li>
          <span>
            Total Users <AiOutlineUser />{' '}
          </span>
          <span>10</span>
        </li>
        <li>
          <span>Total Orders <FiPackage /></span>
          <span>10</span>
        </li>
        <li>
          <span>Total Revenue <FaRupeeSign/></span>
          <span>10</span>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
