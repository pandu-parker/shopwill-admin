import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { editHSN, deleteHSN } from '../../actions/hsnActions';

const HNS = ({ item }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  const [category, setCategory] = useState(item.category);
  const [subCategory, setSubCategory] = useState(item.subCategory);
  const [value, setValue] = useState(item.value);
  const [sgst, setSgst] = useState(item.sgst);
  const [cgst, setCgst] = useState(item.cgst);
  const [igst, setIgst] = useState(item.cgst);
  const handleSubmit = e => {
    dispatch(editHSN({ id: item._id, category,subCategory, value, sgst, cgst, igst }));
  };
  const deleteHandler = id => {
    dispatch(deleteHSN(id))
  }
  if (edit) {
    return (
      <tr>
        <td>
          <input value={category} onChange={e => setCategory(e.target.value)} />
        </td>
        <td>
          <input value={subCategory} onChange={e => setSubCategory(e.target.value)} />
        </td>
        <td>
          <input value={value} onChange={e => setValue(e.target.value)} />
        </td>
        <td>
          <input value={sgst} onChange={e => setSgst(e.target.value)} />
        </td>
        <td>
          <input value={cgst} onChange={e => setCgst(e.target.value)} />
        </td>
        <td>
          <input value={igst} onChange={e => setIgst(e.target.value)} />
        </td>
        <td>
          <button onClick={handleSubmit}>submit</button>
        </td>
        <td>
          {' '}
          <button onClick={e => setEdit(!edit)}>cancel</button>
        </td>
      </tr>
    );
  } else {
    return (
      <>
        <tr>
          <td>{item.category}</td>
          <td>{item.subCategory}</td>
          <td>{item.value}</td>
          <td>{item.sgst}</td>
          <td>{item.cgst}</td>
          <td>{item.igst}</td>
          <td>
            <button onClick={e => setEdit(!edit)}>edit</button>
          </td>
          <td>
            <button onClick={e => deleteHandler(item._id)}>delete</button>
          </td>
        </tr>
      </>
    );
  }
};

export default HNS;
