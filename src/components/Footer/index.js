import React from 'react';

import {
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineTwitter,
} from 'react-icons/ai';
import './styles.scss';

const Footer = () => {
  return (
    <footer>
      <div className='container'>
        <p>Copyright &#169; Shopwill</p>
        <ul>
          <li>
            <a href='https://www.google.com' target='__blank'>
              <AiFillFacebook />
            </a>
          </li>
          <li>
            <a href='https://www.google.com' target='__blank'>
              <AiFillInstagram />
            </a>
          </li>
          <li>
            <a href='https://www.google.com' target='__blank'>
              <AiOutlineTwitter />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
