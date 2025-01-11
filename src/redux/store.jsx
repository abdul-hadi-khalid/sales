import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './slices/stockSlice';
import salesReducer from './slices/salesSlice';


const store=configureStore({
    reducer:{
        stock:stockReducer,
        sales:salesReducer,
    },
});

export default store;