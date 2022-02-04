import React from 'react';
import { useDispatch,  } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';

import {
  deleteCategory,
} from '../../../actions/categoryActions';


const Category = ({
  category,
  active = '',
  type,
  clickHandler = () => {
    return;
  },
}) => {
  const dispatch = useDispatch();
  
  const deleteHandler = () => {
    console.log(category);
    dispatch(deleteCategory(category._id, type));
  };
  return (
    <li className='category-item'
      key={category._id}
      onClick={(e) => clickHandler(category)}
      className={active && active._id === category._id ? 'active' : ''}
    >
      {category.name}
      <button className='delete-button' onClick={deleteHandler}>
        <AiFillDelete />
      </button>
    </li>
  );
};

export default Category;
