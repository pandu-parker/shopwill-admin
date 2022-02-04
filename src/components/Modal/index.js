import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import './style.scss';

const Modal = ({ children, customClose }) => {
  const clickHandler = e => {
    e.preventDefault();
    if (customClose) {
      customClose();
    }
  };
  return (
    <div className='modal-container'>
      <div className='modal-content'>
        <button className='close-modal-btn' onClick={clickHandler}>
          {' '}
          <AiOutlineCloseCircle />
        </button>
        <div className='modal-inner'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
