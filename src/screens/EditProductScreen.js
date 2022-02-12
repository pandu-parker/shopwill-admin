import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { HiInformationCircle } from 'react-icons/hi';

import { getProductDetail, editProduct } from '../actions/productActions';
import HsnModalContent from '../components/HsnModalContent';
import Modal from '../components/Modal';
import {
  EDIT_PRODUCT_FAIL,
  EDIT_PRODUCT_RESET,
} from '../constants/productConstants';
import Message from '../components/Message';
import axios from 'axios';

import '../styles/EditProduct.scss';
import ShowOptions from '../components/ShowOptions';
import AddOptions from '../components/AddOptions';
import uploadFile from '../utils/uploadImage';
import ImageGallery from '../components/ImageGallery';

const EditProductScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [brand, setBrand] = useState();
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();
  const [salePrice, setSalePrice] = useState();
  const [categoryName, setCategoryName] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [MinorCategoryName, setMinorCategoryName] = useState('');
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [minorCategory, setMinorCategory] = useState();
  const [countInStock, setCountInStock] = useState(0);
  const [images, setImages] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);
  const [minorCategoriesOptions, setMinorCategoriesOptions] = useState([]);
  const [hsn, setHsn] = useState(null);
  const [sku, setSku] = useState(null);
  const [options, setOptions] = useState([]);
  const [skuResult, setSkuResult] = useState(null);
  const [show, setShow] = useState(false);
  const [addOptionsModal, setAddOptionsModal] = useState(false);
  const [productImageModal, setProductImageModal] = useState(false);
  const id = match.params.id;

  const productDetail = useSelector(state => state.productDetails);
  const { product } = productDetail;
  // Get all categories
  const categoryReducer = useSelector(state => state.categories);
  const { categories } = categoryReducer;
  useEffect(() => {
    if (product && (!product.name || product._id !== id)) {
      dispatch(getProductDetail(id));
    } else {
      dispatch(getProductDetail(id));
    }
  }, [id, dispatch]);

  // Get edit product reducer
  const editProductReducer = useSelector(state => state.editProduct);
  const { success, error } = editProductReducer;
  useEffect(() => {
    if (success) {
      dispatch({ type: EDIT_PRODUCT_RESET });
      history.push('/admin/products');
    }
  }, [success]);

  // put attr in page after product has been fetched
  useEffect(() => {
    if (product && product._id === id) {
      setName(product.name);
      setBrand(product.brand);
      setPrice(product.price);
      setSalePrice(product.salePrice);
      setSku(product.sku);
      setOptions(product.options);
      if (product.category) {
        categoriesOptions.map(item => {
          if (item.value === product.category) {
            setCategory(item);
          }
        });
      }
      setSubCategory(product.subCategory);
      setMinorCategory(product.minorCategory);
      setImages(product.images);
      // set product HSN
      if (product.hsn) {
        setHsn(product.hsn);
      } else {
        setHsn(null);
      }
      // Set existing category names
      if (categories) {
        categories.map(item => {
          if (item._id === product.category) {
            setCategoryName(item.name);
          }
          item.subCategories.map(item1 => {
            if (item1._id === product.subCategory) {
              setSubCategoryName(item1.name);
            }
            if (item1.minorCategory) {
              item1.minorCategory.map(item2 => {
                if (item2._id === product.minorCategory) {
                  setMinorCategoryName(item2.name);
                }
              });
            }
          });
        });
      }
    }
  }, [product, categoriesOptions, id]);

  //   Put All categories from reducer to select options
  useEffect(() => {
    if (!categories) return;
    const catArr = categories.map(category => {
      return { label: category.name, value: category._id };
    });
    setCategoriesOptions(catArr);
  }, [categories]);

  //   put corresponding sub categories
  useEffect(() => {
    if (!categories || !category) return;
    const activeCategory = categories.find(item => {
      return item._id === category.value;
    });
    if (activeCategory && activeCategory.subCategories) {
      const subCategories = activeCategory.subCategories.map(item => {
        return { label: item.name, value: item._id };
      });
      setSubCategory(null);
      setMinorCategory(null);
      setSubCategoriesOptions(subCategories);
      if (product.subCategory) {
        setSubCategory(product.subCategory);
      }
    }
  }, [category, categories]);

  // put minor categories
  useEffect(() => {
    if (!categories || !subCategory || !category) return;

    const activeCategory = categories.find(item => {
      return item._id === category.value;
    });
    if (activeCategory && activeCategory.subCategories) {
      const activeSubCategory = activeCategory.subCategories.find(subCat => {
        return subCat._id === subCategory.value;
      });
      if (activeSubCategory) {
        const minorCategories = activeSubCategory.minorCategory.map(item => {
          return { label: item.name, value: item._id };
        });
        setMinorCategory(null);
        setMinorCategoriesOptions(minorCategories);
      }
    }
  }, [subCategory]);

  // submit Handler
  const submitHandler = e => {
    e.preventDefault();
    if (!category) {
      dispatch({ type: EDIT_PRODUCT_FAIL, payload: 'Category is required' });
      return;
    }
    dispatch(
      editProduct({
        id: product._id,
        name,
        images,
        brand,
        description,
        category: category.value,
        subCategory: subCategory ? subCategory.value : null,
        minorCategory: minorCategory ? minorCategory.value : null,
        price,
        salePrice,
        countInStock,
        show,
        hsn: hsn ? hsn.id : null,
        sku: sku ? parseInt(sku) : null,
        options: options,
      })
    );
  };
  const uploadFileHandler = async e => {
    // setUploading(true);
    try {
      let data = await uploadFile(e);
      setImages([...images, data]);
      // setUploading(false);
    } catch (error) {
      console.error(error);
      dispatch({
        type: EDIT_PRODUCT_FAIL,
        payload: error.message ? error.message : error,
      });
    }
  };
  // HSN MODAL
  const [hsnModal, setHsnModal] = useState(false);
  const showHsnModal = e => {
    e.preventDefault();
    setHsnModal(true);
  };
  // check SKU
  useEffect(() => {
    if (!sku) return;
    const checkSkuActive = async () => {
      try {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/products/checksku?sku=${sku}`);
        setSkuResult(true);
      } catch (error) {
        if (product.sku === sku) {
          setSkuResult(null);
        } else {
          setSkuResult(false);
        }
      }
    };
    checkSkuActive();
  }, [product, sku]);

  // remove image from product
  const removeImage = (e, image) => {
    e.preventDefault()
    const newImages = images.filter(img => {
      return img !== image
    })
    setImages([...newImages])
  }

  return (
    <div className='container edit-product-contianer'>
      {error && <Message>{error}</Message>}
      <form action='' onSubmit={submitHandler} className='edit-product-form'>
        <div className='left'>
          <div className='form-control'>
            <label htmlFor=''>Product Image: </label>
            {images.map(image => {
              return <div><img src={`${process.env.REACT_APP_BASE_URL}${image.path}`} alt='' /><button onClick={e => removeImage(e,image)}>delete</button></div>;
            })}
          </div>
          <div className='form-control'>
            <span
              className='change-img'
              onClick={e => setProductImageModal(!productImageModal)}
            >
              Change image
            </span>
            <input type='file' onChange={uploadFileHandler} />
          </div>
        </div>
        <div className='right'>
          <div className='form-control'>
            <label htmlFor=''>Name</label>
            <input
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className='form-control'>
            <label htmlFor=''>Brand</label>
            <input
              type='text'
              value={brand}
              onChange={e => setBrand(e.target.value)}
            />
          </div>

          <div className='form-control'>
            <label htmlFor=''>Price</label>
            <input
              type='text'
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>

          <div className='form-control'>
            <label htmlFor=''>Sale Price</label>
            <input
              type='text'
              value={salePrice}
              onChange={e => setSalePrice(e.target.value)}
            />
          </div>
          <div className='form-control'>
            <label htmlFor=''>SKU</label>
            <input
              type='text'
              value={sku}
              onChange={e => setSku(e.target.value)}
            />
            {/* <button onCl>check sku</button> */}
            <span className='sku-available'>
              {skuResult ? (
                <span className='green-text'>sku available</span>
              ) : skuResult === null ? (
                ''
              ) : (
                <span className='red-text'>sku not available</span>
              )}
            </span>
          </div>
          <div className='form-control'>
            <label htmlFor=''>Category</label>
            <Select
              className='react-select'
              options={categoriesOptions}
              value={category}
              onChange={setCategory}
            />
          </div>
          <div className='form-control'>
            <label htmlFor=''>Current value</label>
            <p>{categoryName}</p>
          </div>
          <div className='form-control'>
            <label htmlFor=''>Sub Category</label>
            <Select
              options={subCategoriesOptions}
              value={subCategory}
              onChange={setSubCategory}
            ></Select>
          </div>
          <div className='form-control'>
            <label htmlFor=''>Current value</label>
            <p>{subCategoryName}</p>
          </div>
          <div className='form-control'>
            <label htmlFor=''>Minor Category</label>
            <Select
              options={minorCategoriesOptions}
              value={minorCategory}
              onChange={setMinorCategory}
            ></Select>
          </div>
          <div className='form-control'>
            <label htmlFor=''>Current value</label>
            <p>{MinorCategoryName}</p>
          </div>
          <div className='form-control'>
            <label>options</label>
            <button
              className='small'
              onClick={e => {
                e.preventDefault();
                setAddOptionsModal(true);
              }}
            >
              Add/Edit options
            </button>
            {options.map(option => {
              return <ShowOptions option={option} />;
            })}
          </div>
          <div className='form-control'>
            <label htmlFor=''>Count In stock</label>
            <input
              type='text'
              value={countInStock}
              onChange={e => setCountInStock(e.target.value)}
            />
          </div>
          <div className='form-control'>
            <label htmlFor=''>HSN</label>
            <div className='hsn-value'>
              {hsn ? (
                <>
                  <span>
                    <span className='muted'>category: </span> {hsn.category}{' '}
                    <br />
                    <span className='muted'>sub-category: </span>{' '}
                    {hsn.subCategory} <br />
                    <span className='muted'>value: </span> {hsn.value} <br />
                    <span className='muted'>SGST: </span> {hsn.sgst} <br />
                    <span className='muted'>CGST: </span> {hsn.cgst} <br />
                    <span className='muted'>IGST: </span> {hsn.igst} <br />
                  </span>
                  <button onClick={e => setHsn(null)}>Remove HSN</button>
                </>
              ) : (
                'None'
              )}
              <button onClick={showHsnModal}>Add/Edit HSN</button>
            </div>
          </div>
          <div className='form-control'>
            <label htmlFor=''>Show / Hide</label>
            <div className='checkbox-container'>
              <input type='checkbox' />
            </div>
          </div>
          <div className='form-control'>
            <label></label>
            <div>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </form>
      {hsnModal ? (
        <Modal customClose={e => setHsnModal(false)}>
          <HsnModalContent setHsn={setHsn} setHsnModal={setHsnModal} />
        </Modal>
      ) : null}
      {addOptionsModal && (
        <Modal customClose={e => setAddOptionsModal(false)}>
          <AddOptions options={options} setOptions={setOptions} />
        </Modal>
      )}
      {productImageModal && (
        <Modal customClose={e => setProductImageModal(false)}>
          <ImageGallery images={images} setImages={setImages} />
        </Modal>
      )}
    </div>
  );
};

export default EditProductScreen;
