import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBanners } from '../../actions/homepageActions';

import EditBanner from './EditBanner';

import './banner.scss';

const AdminBanner = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(null);
  const bannersData = useSelector((state) => state.banners);
  const { banners } = bannersData;
  useEffect(() => {
    if (!banners) {
      dispatch(getBanners());
    }
  }, [banners, dispatch]);

  if(edit) {
      return <EditBanner banner={edit} setEdit={setEdit}/>
  }

  return (
    <div className='banner-container'>
      {banners &&
        banners.map((banner) => {
          return (
            <div key={banner._id} className='banner-image-container'>
              <p>
                <span>Name: {banner.name}</span>
                <span>Space: {banner.space}</span>
                <span>Url: {banner.image}</span>
                <button onClick={e =>setEdit(banner)}>Edit</button>
              </p>
              <img src={`${process.env.REACT_APP_BASE_URL}${banner.image}`} alt='' />
            </div>
          );
        })}
      <form action=''>Add new</form>
    </div>
  );
};

export default AdminBanner;
