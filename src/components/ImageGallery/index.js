import { useState, useEffect } from 'react';
import axios from 'axios';
import uploadFile from '../../utils/uploadImage';

import './styles.scss';

const ImageGallery = ({images , setImages}) => {
  const [allImages, setAllImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState(images);
  useEffect(() => {
    const getImages = async () => {
      const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/images/`);
      setAllImages(result.data);
    };
    getImages();
  }, []);

  const handleImageClick = clickedImage => {
    const isSelected = selectedImages.find(image => {
      return image._id === clickedImage._id;
    });
    // console.log('is selected', isSelected)
    if (!isSelected) {
      setSelectedImages([...selectedImages, clickedImage]);
    } else {
      const newImages = selectedImages.filter(image => {
        return image._id !== clickedImage._id;
      });
      setSelectedImages([...newImages]);
    }
  };

  useEffect(() => {
    console.log(selectedImages);
    setImages([...selectedImages])
  }, [selectedImages]);
  const isActive = clickedImage => {
      console.log('clicked image', clickedImage)
    const isSelected = selectedImages.find(image => {
        return image._id === clickedImage;
    });
    console.log(selectedImages, isSelected)
    return isSelected;
  };

  const uploadFileHandler = async e => {
    // setUploading(true);
    try {
      await uploadFile(e);
      // setUploading(false);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(allImages)
  return (
    <div>
      Image gallery
      <div className='image-gallery'>
        {allImages.map(image => {
          return (
            <img
              className={isActive(image._id) ? 'active' : ''}
              onClick={e => handleImageClick(image)}
              src={`${process.env.REACT_APP_BASE_URL}${image.path}`}
              alt='data'
            />
          );
        })}
      </div>
      <div>
          upload
          <input type='file' onChange={uploadFileHandler} />
      </div>
    </div>
  );
};

export default ImageGallery;
