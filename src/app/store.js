import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userReducer from '../features/user/userSlice';
import categoriesReducer from "../features/categories/categoriesSlice"
import productsReducer from "../features/products/productSlice"
import cartReducer from "../features/cart/cartSlice"
import orderReducer from "../features/order/orderSlice"
import { combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';



const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  users: userReducer,
  categories : categoriesReducer,
  products : productsReducer,
  cart : cartReducer,
  order : orderReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware : [thunk],
  devTools : false
});

export const persistor = persistStore(store);

export const resetReduxState = () => {
  persistor.purge();
}