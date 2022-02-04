import React from 'react';
import { Link } from 'react-router-dom';

import { IoIosArrowBack } from 'react-icons/io';
import './styles.scss';

const GoBack = () => {
  return (
    <div className='go-back'>
      <Link to='/'> <IoIosArrowBack /> Go Back to Dashboard</Link>
    </div>
  );
};

export default GoBack;
