import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineCheck } from 'react-icons/ai';
import { getAllHSN, searchHsn } from '../../actions/hsnActions';

import './style.scss';

const HnsModalContent = ({ setHsn, setHsnModal }) => {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllHSN());
  }, []);
  const HsnReducer = useSelector(state => state.hsnList);
  const { hsn } = HsnReducer;
  const handleHnsChange = hsn => {
    setHsn({
      id: hsn._id,
      category: hsn.category,
      subCategory: hsn.subCategory,
      value: hsn.value,
      cgst: hsn.cgst,
      sgst: hsn.sgst,
      igst: hsn.igst,
      tax: hsn.tax,
    });
    setHsnModal(false)
  };
  const searchHandler = e => {
    e.preventDefault()
    dispatch(searchHsn(search))
  }
  const clearSearch = (e) => {
    e.preventDefault()
    setSearch('')
    dispatch(getAllHSN())
  }
  return (
    <div className='hns-container'>
      <div className='hns-search-containrer'>
        {/* <label htmlFor="">find</label> */}
        <input type='text' placeholder='search' onChange={e => setSearch(e.target.value)} value={search} />
        <button className='hsn-modal-button' onClick={searchHandler}>search</button>
        <button className='hsn-modal-button' onClick={clearSearch}>clear</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>category</th>
            <th>subcategory</th>
            <th>value</th>
            <th>cgst</th>
            <th>sgst</th>
            <th>igst</th>
            <th>select</th>
          </tr>
        </thead>
        <tbody>
          {hsn &&
            hsn.map(hsnItem => {
              return (
                <tr key={hsnItem._id}>
                  <td>{hsnItem.category}</td>
                  <td>{hsnItem.subCategory}</td>
                  <td>{hsnItem.value}</td>
                  <td>{hsnItem.cgst}</td>
                  <td>{hsnItem.sgst}</td>
                  <td>{hsnItem.igst}</td>
                  <td onClick={e => handleHnsChange(hsnItem)}>
                    <AiOutlineCheck />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default HnsModalContent;
