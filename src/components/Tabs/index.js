import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import './style.scss';

const Tabs = ({ children }) => {
  const [active, setActive] = useState(children[0].props.title);
  //   useEffect(() => {});
  return (
    <div>
      <ul className='tab-header'>
        {children.map((child) => {
          return (
            <li
              onClick={(e) => setActive(child.props.title)}
              className={`header-item ${
                active === child.props.title ? 'active' : ''
              }`}
              key={uuid()}
            >
              {child.props.title}
            </li>
          );
        })}
      </ul>
      <div className='tab-content'>
        {children.map((child) => {
          return (
            <div
              className={`content ${
                active === child.props.title ? 'active' : ''
              }`}
              key={uuid()}
            >
              {child.props.children}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
