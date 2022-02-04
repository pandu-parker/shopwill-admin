import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GoBack from '../components/GoBack';
import { getAllHSN } from '../actions/hsnActions';
import HSNAdd from '../components/AddHSN';
import HSN from '../components/HSN';

import '../styles/HSNScreen.scss';

const HSNScreen = () => {
  const dispatch = useDispatch();
  const hsnReducer = useSelector(state => state.hsnList);
  const { hsn } = hsnReducer;
  useEffect(() => {
    dispatch(getAllHSN());
  }, []);
  return (
    <div className='container'>
      <GoBack />
      <table className='hsn-list'>
        <thead>
          <th>Name</th>
          <th>Description</th>
          <th>Value</th>
          <th>SGST</th>
          <th>CGST</th>
          <th>IGST</th>
        </thead>
        {hsn &&
          hsn.map(item => {
            return <HSN item={item}/>;
          })}
      </table>
      <HSNAdd />
    </div>
  );
};

export default HSNScreen;
