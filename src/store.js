import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  addProductReducer,
  productDetailsReducer,
  ProductListReducer,
  deleteProductReducer,
  editProductReducer,
} from './reducers/productReducers';
import { bannersEditReducer, bannersReducer } from './reducers/homepageReducer';
import {
  addCategoriesReducer,
  categoriesReducer,
  deleteCategoryReducer,
} from './reducers/categoryReducers';
import { userLoginReducer, userSignUpReducer } from './reducers/userReducers';
import { editOrderReducer, ordersRedcuer } from './reducers/orderReducers';
import {
  dealsListReducer,
  addDealReducer,
  removeDealReducer,
} from './reducers/dealsReducers';

import { hsnListReducer } from './reducers/HSNReducers';

const reducer = combineReducers({
  addProduct: addProductReducer,
  addDeal: addDealReducer,
  categories: categoriesReducer,
  deleteProduct: deleteProductReducer,
  deleteCategory: deleteCategoryReducer,
  dealsList: dealsListReducer,
  editProduct: editProductReducer,
  hsnList: hsnListReducer,
  productList: ProductListReducer,
  productDetails: productDetailsReducer,
  bannersEdit: bannersEditReducer,
  banners: bannersReducer,
  addCategories: addCategoriesReducer,
  orders: ordersRedcuer,
  removeDeal: removeDealReducer,
  editOrder: editOrderReducer,
  userLogin: userLoginReducer,
  userSignUp: userSignUpReducer,
});

const middleware = [thunk];

const userInfoFromLocal = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromLocal } };

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
