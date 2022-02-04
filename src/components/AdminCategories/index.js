import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Category from './Category';
import AddCategory from './AddCategory';

import { getCategories } from '../../actions/categoryActions';

import './styles.scss';

const AdminCategories = () => {
  const dispatch = useDispatch();
  const categoriesReducer = useSelector((state) => state.categories);
  const { categories } = categoriesReducer;
  const [activeCategory, setActiveCategory] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [minorCategories, setMinorCategories] = useState(null);
  const AddCategoryReducer = useSelector((state) => state.addCategories);
  const { success } = AddCategoryReducer;
  useEffect(() => {
    dispatch(getCategories());
  }, [success, dispatch]);
  const deleteCategoryReducer = useSelector((state) => state.deleteCategory);
  const { success: successDelete } = deleteCategoryReducer;
  useEffect(() => {
    dispatch(getCategories());
  }, [success, successDelete, dispatch]);
  useEffect(() => {
    if (Array.isArray(categories)) {
      setActiveCategory(categories[0]);
    }
  }, [categories]);

  useEffect(() => {
    if (activeCategory && Array.isArray(activeCategory.subCategories)) {
      setSubCategories(activeCategory.subCategories);
      setActiveSubCategory(activeCategory.subCategories[0]);
    }
  }, [activeCategory]);

  useEffect(() => {
    if (
      subCategories &&
      subCategories.length > 0 &&
      activeSubCategory &&
      activeSubCategory.minorCategory
    ) {
      setMinorCategories(activeSubCategory.minorCategory);
    } else {
      setMinorCategories(null);
    }
  }, [subCategories, activeSubCategory]);

  return (
    <div>
      <div className='category-container'>
        <div className='category'>
          <h3>Major Category</h3>
          <AddCategory type='category' />
          <ul>
            {Array.isArray(categories) &&
              categories.map((category) => {
                return (
                  <Category
                    key={category._id}
                    type='category'
                    category={category}
                    active={activeCategory}
                    clickHandler={setActiveCategory}
                  />
                );
              })}
          </ul>
        </div>
        <div className='category'>
          <h3>Sub Category</h3>
          <AddCategory type='subCategory' parentCategory={ activeCategory ? activeCategory._id : null}/>
          <ul>
            {subCategories &&
              Array.isArray(subCategories) &&
              subCategories.map((subCategory) => {
                return (
                  <Category
                    key={subCategory._id}
                    type='subCategory'
                    category={subCategory}
                    active={activeSubCategory}
                    clickHandler={setActiveSubCategory}
                  />
                );
              })}
          </ul>
        </div>
        <div className='category'>
          <h3>Minor Category</h3>
          <AddCategory type='minorCategory' parentCategory={ activeSubCategory ? activeSubCategory._id : null}/>
          <ul>
            {minorCategories &&
              Array.isArray(minorCategories) &&
              minorCategories.map((minorCategory) => {
                return (
                  <Category type='minorCategory' key={minorCategory._id} category={minorCategory} />
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
