import { useEffect, useState } from 'react';

import uploadFile from '../../utils/uploadImage';
import { v4 as uuidv4 } from 'uuid';

import './style.scss';

const AddOptions = ({ options, setOptions }) => {
  const [edit, setEdit] = useState(null);
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [sku, setSku] = useState(null);
  const [image, setImage] = useState(null);
  const [newOption, setNewOption] = useState('');
  const submitForm = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.target;
    const value = form.querySelector('.type');
    const price = form.querySelector('.price');
    const sku = form.querySelector('.sku');
    addOption(id, value.value, price.value, sku.value);
  };
  const addOption = (id, value, price, sku) => {
    options.map(option => {
      if (option._id === id) {
        option.types.push({ name: value, price, sku });
      }
    });
    setOptions([...options]);
  };
  const removeType = id => {
    options.forEach(option => {
      const types = option.types.filter(type => {
        return type._id !== id;
      });
      option.types = types;
    });
    setOptions([...options]);
  };
  const setEditOn = type => {
    setEdit(type._id);
    setName(type.name);
    setPrice(type.price);
    setSku(type.sku);
    setImage(type.image);
  };
  const saveOption = id => {
    options.map(option => {
      if (option._id === id) {
        option.types.forEach(type => {
          if (type._id === edit) {
            type.name = name;
            type.price = price;
            type.sku = sku;
            type.image = image;
          }
        });
      }
    });
    setOptions([...options]);
    setEdit(null);
  };
  const uploadFileHandler = async e => {
    // setUploading(true);
    try {
      let data = await uploadFile(e);
      setImage(data);
      // setUploading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const addNewOption = e => {
    e.preventDefault();
    const formattedOption = {
      name: newOption,
      types: [],
    };
    console.log([...options, formattedOption]);
    setOptions([...options, formattedOption]);
  };
  const removeOption = (id) => {
    const newOptions = options.filter(option => {
        return option._id !== id;
    });
    setOptions([...newOptions]);
  }
  useEffect(() => {
    console.log(options);
  }, [options]);
  return (
    <div className='add-options'>
      {options &&
        options.map(option => {
          return (
            <div className='my-2' key={uuidv4()}>
              Type: {option.name}
              <button onClick={e => removeOption(option._id)}>delete</button>
              <br />
              <table>
                <tr>
                  <th>Name</th>
                  <th>price</th>
                  <th>sku</th>
                  <th></th>
                </tr>
                {option.types &&
                  option.types.map(type => {
                    if (edit === type._id) {
                      return (
                        <tr className='my-2' key={type._id}>
                          <td>
                            <input
                              value={name}
                              onChange={e => setName(e.target.value)}
                            />
                          </td>{' '}
                          <td>
                            {' '}
                            <input
                              value={price}
                              onChange={e => setPrice(e.target.value)}
                            />{' '}
                          </td>
                          <td>
                            {' '}
                            <input
                              value={sku}
                              onChange={e => setSku(e.target.value)}
                            />
                          </td>
                          <td>
                            <img src={image} />
                            <input type='file' onChange={uploadFileHandler} />
                          </td>
                          <td>
                            <button
                              className='primary'
                              onClick={e => saveOption(option._id)}
                            >
                              Save
                            </button>
                          </td>
                        </tr>
                      );
                    }
                    return (
                      <tr className='my-2' key={type._id}>
                        <td>{type.name}</td> <td>{type.price} </td>
                        <td>{type.sku}</td>
                        <td>
                          {' '}
                          <img src={type.image} />{' '}
                        </td>
                        <td>
                          <button
                            className='primary'
                            onClick={e => setEditOn(type)}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className='delete'
                            onClick={e => removeType(type._id)}
                          >
                            -
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </table>
              <form
                className='add-option-form'
                onSubmit={e => {
                  submitForm(e, option._id);
                }}
              >
                <input placeholder='name' className='type' />
                <input placeholder='price' className='price' />
                <input placeholder='sku' className='sku' />
                <button className='primary'>+</button>
              </form>
            </div>
          );
        })}
      Add New Option:
      <div>
        Name :{' '}
        <input value={newOption} onChange={e => setNewOption(e.target.value)} />
        <button onClick={addNewOption}>Add +</button>
      </div>
    </div>
  );
};

export default AddOptions;
