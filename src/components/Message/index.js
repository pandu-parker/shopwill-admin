import React from 'react';
import './style.scss'

const Message = ({ children, variant = 'danger' }) => {
  return <div className={variant}>{children}</div>;
};

export default Message;
