import React, { useState, } from 'react';
import { useDispatch,  } from 'react-redux';

import { AddCategory, } from '../../../actions/categoryActions';

const AddCategoryForm = ({ type, parentCategory = null }) => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(AddCategory( name, type, parentCategory));
  };
  return (
    <form onSubmit={submitHandler} className='add-category'>
      <input
        type='text'
        placeholder='Add new'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

export default AddCategoryForm;
