import axios from "axios";

const uploadFile = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/upload`, formData, config);   
      return data;   
    } catch (error) {
      return error
    }
  };

export default uploadFile