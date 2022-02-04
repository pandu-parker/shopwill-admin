import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { editBanner } from '../../../actions/homepageActions';

// import { BannerImageContainer } from '../banner.styled';
const EditBanner = ({ banner, setEdit }) => {
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState('');
  const [link, setLink] = useState(banner.link);
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(editBanner({ name: banner.name, image : image ? image : banner.image, space: banner.space, link }));
    console.log();
  };
  return (
    <div>
      {uploading && <p>uploading</p>}
      <div className='banner-image-container'>
        <p>
          <span>Name: {banner.name}</span>
          <span>Space: {banner.space}</span>
          <span>Url: {banner.image}</span>

          <div>
            <label htmlFor=''>Preview</label>
            <img src={image} alt='' />
          </div>
        </p>
        <img src={banner.image} alt='' />
      </div>
      <form action='' onSubmit={submitHandler}>
        <div>
          <label htmlFor=''>Edit</label>
          <input type='file' onChange={uploadFileHandler} />
        </div>
        <div>
            <input type="text" value={link} onChange={e => setLink(e.target.value)} />
        </div>
        <button onClick={(e) => setEdit(null)}>Cancel</button>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default EditBanner;
