import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoMdAdd } from 'react-icons/io';

import { addHSN } from '../../actions/hsnActions';
import './style.scss'

const HNSAdd = () => {
  const dispatch = useDispatch();
  
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [value, setValue] = useState('');
  const [sgst, setSgst] = useState('');
  const [cgst, setCgst] = useState('');
  const [igst, setIgst] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addHSN({ category, subCategory, value, sgst,cgst, igst }));
  };

  return (
    <div>
      <form action='' onSubmit={handleSubmit} className='hns-form'>
        <input
          type='text'
          placeholder='category'
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        <textarea
          placeholder='sub category'
          value={subCategory}
          onChange={e => setSubCategory(e.target.value)}
        />
        <input
          type='number'
          placeholder='value'
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <input
          type='number'
          placeholder='SGST'
          value={sgst}
          onChange={e => setSgst(e.target.value)}
        />
         <input
          type='number'
          placeholder='CGST'
          value={cgst}
          onChange={e => setCgst(e.target.value)}
        />
         <input
          type='number'
          placeholder='IGST'
          value={igst}
          onChange={e => setIgst(e.target.value)}
        />
        <button>Add <IoMdAdd /></button>
      </form>
    </div>
  );
};

export default HNSAdd;
