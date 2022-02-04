import React, { useEffect, useState } from 'react';

import { AiFillCaretDown } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import { Link, withRouter } from 'react-router-dom';
const Category = ({ category, history }) => {
  const [activeSubCat, setActiveSubCat] = useState(null);
  useEffect(() => {
    setActiveSubCat(category.subCategories[0]);
  }, []);
  if (category.subCategories.length > 0) {
    return (
      <li className='dropdown'>
        <Link to={`/search/?category=${category._id}`}>
          {category.name} <AiFillCaretDown />
        </Link>
        {/* <span onClick={e => history.push(`/search?category=${category._id}`)}> */}
        {/* </span> */}
        <div className='dropdown-menu'>
          <ul className='main-menu'>
            {category.subCategories.map(subCategory => {
              return (
                <li
                  onMouseEnter={e => setActiveSubCat(subCategory)}
                  className={
                    activeSubCat && activeSubCat._id === subCategory._id
                      ? 'active-subcat'
                      : ''
                  }
                  key={subCategory._id}
                >
                  <Link to={`/search?subCategory=${subCategory._id}`}>
                    {subCategory.name}
                    {activeSubCat && activeSubCat._id === subCategory._id ? (
                      <IoIosArrowForward />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
          {activeSubCat &&
          activeSubCat.minorCategory &&
          Array.isArray(activeSubCat.minorCategory) &&
          activeSubCat.minorCategory.length > 0 ? (
            <ul className='side-menu'>
              {activeSubCat.minorCategory.map(item => (
                <li key={item._id}>
                  <Link to={`/search?minorCategory=${item._id}`}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {/* </Link> */}
      </li>
    );
  }
  return <li>{category.name}</li>;
};

export default withRouter(Category);
